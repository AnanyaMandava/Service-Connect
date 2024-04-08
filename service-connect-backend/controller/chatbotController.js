// const dotenv = require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql');
// const cors = require("cors");
const axios = require('axios');
// const multer = require('multer');
const moment = require('moment-timezone');
// const path = require('path');
const servicesInfo = require("../Models/serviceSchema");
const serviceType = require("../Models/serviceTypeSchema");
const serviceProvider = require("../Models/serviceCatalogSchema");
const userName = require("../Models/userSchema");
const Booking = require("../Models/bookingSchema");

var intentHistory=[];
let selected_service="";
let selected_type="";
let selected_provider="";
let selected_timings="";
let b_service_id = "";
let b_service_type_id = "";
let b_service_provider_id = "";

const openAiSummary = async (msg, summaryData) => {
    if (conversationHistory.length === 0) {
        conversationHistory.push({
            role: "system",
            content: "The following is a summary of energy usage data: " + summaryData
        });
    }
    conversationHistory.push({
        role: "user",
        content: msg
    });

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            max_tokens: 150,
            temperature: 0.5,
            messages: conversationHistory,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });

        // Extract the AI message and add it to the conversation history
        const aiMessage = response.data.choices[0].message.content;
        conversationHistory.push({
            role: "assistant",
            content: aiMessage
        });
        return aiMessage;
    } catch (error) {
        if (error.response) {
            console.error('OpenAI API responded with:', error.response.status, error.response.data);
        }
        throw error;
    }
};

const detectIntent = async (msg) => {
    let intent = [];
    intent.push({
        role: "system",
        content: "You are here to detect intent of the user, If the user wants to book an appointment you reply with 'NEW_BOOKING' only, If the user wants to select a particular option you must respond with 'OPTION' only, If the user is providing you with the date and time you must respond with DATETIMESELECTION only, If the user wants to view his bookings can you respond back with SHOW, else reply with 'UNRELATED' only"
    });
    intent.push({
        role: "user",
        content: msg // I want to book massage service tomorrow --> response
    });
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            max_tokens: 150,
            temperature: 0.5,
            messages: intent,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        const aiMessage = response.data.choices[0].message.content;
        return aiMessage;
    } catch (error) {
        if (error.response) {
            console.error('OpenAI API responded with:', error.response.status, error.response.data);
        }
        throw error;
    }
}

const detectOptionSelection = async (msg,list) => {
    let intent = [];
    intent.push({
        role: "system",
        content: "You are here to detect option selection of the user, The user can select the option based on its related number or its name, from the provided list you must respond back with its name only, else respond with OOPS only. Following is the provided list: "+list
    });
    intent.push({
        role: "user",
        content: msg
    });
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            max_tokens: 150,
            temperature: 0.5,
            messages: intent,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        const aiMessage = response.data.choices[0].message.content;
        return aiMessage;
    } catch (error) {
        if (error.response) {
            console.error('OpenAI API responded with:', error.response.status, error.response.data);
        }
        throw error;
    }
}

const detectDateAndTime = async (msg) => {
    let intent = [];
    intent.push({
        role: "system",
        content: "You are here to detect date and time properly from the user, you must respond back three items the first item is the detected date in the following format YYYY-MM-DD, second item is the detected time in the following format only HH:MM:SS, third item is the detected time added with 1 hour time in this format only HH:MM:SS. In essence you must respond back the required items in this format only: YYYY-MM-DD HH:MM:SS HH:MM:SS"
    });
    intent.push({
        role: "user",
        content: msg
    });
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            max_tokens: 150,
            temperature: 0.5,
            messages: intent,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        const aiMessage = response.data.choices[0].message.content;
        return aiMessage;
    } catch (error) {
        if (error.response) {
            console.error('OpenAI API responded with:', error.response.status, error.response.data);
        }
        throw error;
    }
}

const getService = async () => {
    try {
        // Fetch all services from the serviceSchema
        const allServices = await servicesInfo.find();

        allServices.sort((a, b) => a.serviceName.localeCompare(b.serviceName));

        // If services are found, send them as a response
        let sList = allServices.map((service, index) => `${index + 1}. ${service.serviceName}`).join('\n');
        console.log("sList:", sList);

        return sList;
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'An error occurred while fetching services' });
    }
};

const getServiceType = async (selected_service) => {
    try {
        // Find the service document based on the serviceName
        console.log("Sel Serv:", selected_service);
        const service = await servicesInfo.findOne({ serviceName: selected_service });
        console.log("Service(GST):", service);

        // Extract the serviceId from the service document
        const serviceId = service._id;
        console.log("ServiceId (GST):", serviceId);

        // Query the ServiceType collection to find documents associated with the serviceId
        const serviceTypes = await serviceType.find({ service: serviceId });
        let serviceTypeList = serviceTypes.map((servicetype, index) => `${index + 1}. ${servicetype.serviceType}`).join('\n');

        console.log("ServiceTypes (GST):", serviceTypes);

        return serviceTypeList;
    } catch (error) {
        console.error('Error fetching service types by service name:', error);
    }
};


const getServiceProviders = async (selected_type) => {
    try {
        // Find the service document based on the selected service name
        const servicetype = await serviceType.findOne({ serviceType: selected_type });

        if (!servicetype) {
            throw new Error('Service not found');
        }

        // Find all service types associated with the service
        const serviceproviders = await serviceProvider.find({ serviceType: servicetype._id });

        const serviceProviderIds = serviceproviders.map(provider => provider.serviceProvider);

        const providerNames = await userName.find({ _id: { $in: serviceProviderIds } });

        // Convert the results to a format suitable for sending
        let providerList = providerNames.map((provider, index) => `${index + 1}. ${provider.fullname}`).join('\n');

        return providerList;
    } catch (error) {
        // Handle errors
        console.error('Error fetching service types:', error);
        throw error;
    }
};


exports.chatHandler = async (req, res) => {
    const userMessage = req.body.message;
    const email = req.body.email;
    console.log(userMessage)
    const detectedIntent = await detectIntent(userMessage);
    intentHistory.push(detectedIntent);
    console.log(detectedIntent)

    if (intentHistory[intentHistory.length - 1] === 'NEW_BOOKING') {
        try {
            const services = await servicesInfo.find().distinct('serviceName');
            // const services = await getService();
            let serviceList = services.map((service, index) => `${index + 1}. ${service}`).join('\n');
            let responseMessage = `Available services:\n${serviceList}`;
            console.log("User ID:", req.body.userId);
            res.json({ message: responseMessage });
        } catch (error) {
            console.error('Error fetching services:', error);
            res.status(500).send("An error has occurred");
        }
    }
    else if(intentHistory[intentHistory.length-1] === 'OPTION' && intentHistory[intentHistory.length-2] === 'NEW_BOOKING') {
        // Fetch the list of services
        const serviceList = await getService();

        // Use detectOptionSelection to determine the user's choice
        const openAiResponse = await detectOptionSelection(userMessage, serviceList);

        if (openAiResponse) {
            // const 
            selected_service = openAiResponse; // Assuming openAiResponse contains the selected service type name
            console.log("selected service:", selected_service);
            const serviceTypes = await getServiceType(selected_service);
            console.log("servicetype1:", serviceTypes);
             servicesInfo.findOne({ serviceName: selected_service })
                .then(service => {
                    console.log("Service ID:", service._id);
                    b_service_id = service._id;
                    if (!service) {
                        res.json({ message: `Service ${selected_service} not found` });
                    } else {
                        console.log("Service ID:", service._id);
                        serviceType.find({ service: service._id })
                            .populate('service') // Populate the referenced service
                            .exec()
                            .then(serviceTypes => {
                                console.log("Service doc det:", service.serviceName);
                                console.log("Service Types:", serviceTypes);
                                    let serviceTypesList = serviceTypes.map((serviceType, index) => `${index + 1}. ${serviceType.serviceType}`).join('\n');
                                    let responseMessage = `You have selected: ${selected_service}\nAvailable service types:\n${serviceTypesList}`;
                                    res.json({ message: responseMessage });
                            })
                            .catch(error => {
                                console.error('Error fetching service types:', error);
                                res.status(500).send("An error has occurred");
                            });
                    }
                })
                .catch(error => {
                    console.error('Error fetching service:', error);
                    res.status(500).send("An error has occurred");
                });
        } else {
            res.json({ message: "I couldn't understand your selection. Please try again." });
        }
    }   
    else if(intentHistory[intentHistory.length-1] === 'OPTION' && intentHistory[intentHistory.length-2] === 'OPTION' && intentHistory[intentHistory.length-3] === 'NEW_BOOKING'){
        console.log("Selected Service:", selected_service);
        const serviceTypeList = await getServiceType(selected_service);
    
        const openAiResponse = await detectOptionSelection(userMessage, serviceTypeList);
        console.log("OpenAI Response2:", userMessage);
    
        if (openAiResponse) {
            selected_type = openAiResponse;
            const providerList = await getServiceProviders(selected_type);
            console.log("Providers List:", providerList);
            serviceType.findOne({ serviceType: selected_type })
            .then(servicetype => {
                console.log("Service Type Id:", servicetype._id);
                b_service_type_id = servicetype._id;
                if (!servicetype) {
                    res.json({ message: `Service ${selected_type} not found` });
                } else {
                    console.log("Service ID:", servicetype._id);
                                let responseMessage = `You have selected: ${selected_type}\nAvailable service providers:\n${providerList}`;
                                res.json({ message: responseMessage });
                }
            })
            .catch(error => {
                console.error('Error fetching service:', error);
                res.status(500).send("An error has occurred");
            });
    } else {
        res.json({ message: "I couldn't understand your selection. Please try again." });
    }
    }
    else if(intentHistory[intentHistory.length-1] === 'OPTION' && intentHistory[intentHistory.length-2] === 'OPTION' && intentHistory[intentHistory.length-3] === 'OPTION'){
        const providerList = await getServiceProviders(selected_type);
    
        const openAiResponse = await detectOptionSelection(userMessage, providerList);
        console.log("OpenAI Response:", openAiResponse);
    
        if (openAiResponse) {
            selected_provider = openAiResponse;
            const selectedProviderRecord = await userName.findOne({ fullname: selected_provider });
            b_service_provider_id = selectedProviderRecord._id;
            // const providerList = await getServiceProviders(selected_service);
            let responseMessage = `Selected service provider:\n${selected_provider}, Please provide a date and time for your appointment`;
            res.json({ message: responseMessage });
        } else {
            res.json({ message: "I couldn't understand your selection. Please try again." });
        }
    }
    else if(intentHistory[intentHistory.length-1]=="DATETIMESELECTION" && intentHistory[intentHistory.length-2] === 'OPTION' && intentHistory[intentHistory.length-3] === 'OPTION'){    
        const openAiResponse = await detectDateAndTime(userMessage);
        console.log("OpenAI Response for time selection:", openAiResponse);
        if (openAiResponse) {
            selected_timings = openAiResponse;//selected timings has the following value = 2022-12-12 11:00:00 11:00:00 12:00:00
            let responseMessage = `you have selected the following time slot:\n${selected_timings}`;
            const [bookedDate, startTime, endTime] = selected_timings.split(" ");
            console.log("Response Message", responseMessage);
            console.log("Split time details:", selected_timings.split(" "));
            console.log("Service ID, Service Type ID, User ID, Service Provider ID", b_service_id, b_service_type_id, req.body.userId, b_service_provider_id);
            console.log("Start Time", new Date(`${bookedDate}T${startTime}`));
            console.log("End Time", new Date(`${bookedDate}T${endTime}`));
            const newBooking = new Booking({
                user: req.body.userId, // Assuming userId is available in req.body
                serviceProvider: b_service_provider_id, // Assuming selected_provider is available
                service: b_service_id, // Assuming selected_service is available
                serviceType: b_service_type_id, // Assuming selected_type is available
                bookingDate: new Date(bookedDate),
                startTime: new Date(`${bookedDate}T${startTime}`),
                endTime: new Date(`${bookedDate}T${endTime}`),
                totalAmount: 0, // You may adjust this as needed
                paymentStatus: "Pending" // You may adjust this as needed
            });
    
            try {
                await newBooking.save();
                res.json({ message: "Booking successful!" });
            } catch (error) {
                console.error('Error saving booking:', error);
                res.status(500).json({ error: 'An error occurred while saving booking' });
            }
        } else {
            res.json({ message: "I couldn't understand your selection. Please try again." });
        }
    }
    else if (intentHistory[intentHistory.length - 1] === "SHOW") {
        const userId = req.body.userId; // Assuming userId is available in req.body
    
        Booking.find({ user: userId })
            .populate('service')
            .populate('serviceProvider')
            .populate('serviceType')
            .then(bookings => {
                if (bookings.length > 0) {
                    let bookingsList = `You currently have ${bookings.length} booking(s): \n`;
                    bookings.forEach((booking, index) => {
                        const formattedDate = moment(booking.bookingDate).format('MMM Do');
                        const formattedStartTime = moment(booking.startTime).format('ha');
                        const formattedEndTime = moment(booking.endTime).format('ha');
                        bookingsList += `${index + 1}) Service: ${booking.service.serviceName} \n`;
                        bookingsList += `   Type: ${booking.serviceType.serviceType}\n`;
                        bookingsList += `   Date: ${formattedDate}\n`;
                        bookingsList += `   Time: ${formattedStartTime} to ${formattedEndTime}\n\n`;
                    });
                    res.json({ message: bookingsList.trim(), bookings: "showbookings" });
                } else {
                    res.json({ message: 'You have no bookings.' });
                }
            })
            .catch(error => {
                console.error('Error fetching user bookings:', error);
                res.status(500).send('Error fetching bookings');
            });
    }
    
    

    // const intent = await detectIntent(userMessage);
    // if (intent === 'ROUTE') {
    //     return res.json({ message: 'ROUTE' });
    // } else if (intent === 'DATA') {
    //     try {
    //         const summaryData = await getDataSummary(email);
    //         const openAiResponse = await openAiSummary(userMessage, summaryData);
    //         res.json({ message: openAiResponse });
    //     } catch (error) {
    //         console.error('Error processing data summary:', error);
    //         res.status(500).send('Error processing data summary');
    //     }
    // } else if (intent.toLowerCase().includes('download')) {
    //     const { start, end } = extractDates(intent);
    //     if (start && end) {
    //         const downloadLink = `/download-data?startDate=${start}&endDate=${end}&email=${email}`;
    //         return res.json({ message: 'DOWNLOAD', startDate:start, endDate:end, email:email });
    //     } else {
    //         return res.json({ message: "I couldn't find the dates you mentioned. Could you please provide the start and end dates for the download?" });
    //     }
    // } else {
    //     res.json({ message: "I'm not sure what you're asking for. Can you please clarify if you want to navigate the website, need information on data, or wish to download something?" });
    // }
}

// app.get('/api/loginUser', (req,res) => {
//     const email = req.query.email;
//     const password = req.query.password;
//     const query= "select count(*) as cnt from Users where email='"+email+"' and password='"+password+"';"
//     db.query(query,(error,result)=>{
//         if(error==null){
//             if(result[0].cnt===1){
//                 res.send("ok")
//             }
//             else{
//                 res.send("no")
//             }
//         }
//         else{
//             res.send("An error has occured");
//             console.log(error)
//         }
//     });
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })