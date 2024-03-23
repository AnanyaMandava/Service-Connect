// const dotenv = require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql');
// const cors = require("cors");
const axios = require('axios');
// const multer = require('multer');
const moment = require('moment-timezone');
// const path = require('path');
const servicesInfo = require("../Models/serviceSchema");

var intentHistory=[];
var selected_service="";
var selected_provider="";
var selected_timings="";

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

const getServices = async () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT service_name FROM Services;';
        db.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            // Convert the results to a format suitable for sending to OpenAI
            let serviceList = results.map((service, index) => `${index + 1}. ${service.service_name}`).join('\n');
            resolve(serviceList);
        });
    });
};

const getServiceProviders = async (selectedService) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT service_provider FROM Services WHERE service_name = ?;';
        db.query(query, [selectedService], (error, results) => {
            if (error) {
                return reject(error);
            }
            // Convert the results to a format suitable for sending to OpenAI
            let providerList = results.map((provider, index) => `${index + 1}. ${provider.service_provider}`).join('\n');
            resolve(providerList);
        });
    });
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
            const services = await Service.find().distinct('serviceName');
            let serviceList = services.map((service, index) => `${index + 1}. ${service}`).join('\n');
            let responseMessage = `Available services:\n${serviceList}`;
            res.json({ message: responseMessage });
        } catch (error) {
            console.error('Error fetching services:', error);
            res.status(500).send("An error has occurred");
        }
    }
    else if(intentHistory[intentHistory.length-1] === 'OPTION' && intentHistory[intentHistory.length-2] === 'NEW_BOOKING') {
        // Fetch the list of services
        const services = await Service.find({});

        // Use detectOptionSelection to determine the user's choice
        const openAiResponse = await detectOptionSelection(userMessage, services);
        console.log("OpenAI Response:", openAiResponse);

        if (openAiResponse) {
            selected_service=openAiResponse
            // res.json({ message: `` });
            const query= "select distinct service_provider from Services where service_name='"+selected_service+"';";
            db.query(query,(error,result)=>{
                if(error==null){
                    // console.log(result)
                    let serviceList = result.map((service, index) => `${index + 1}. ${service.service_provider}`).join('\n');
                    let responseMessage = `You have selected: ${selected_service}\nAvailable service providers:\n${serviceList}`;
                    res.json({ message: responseMessage });
                }
                else{
                    res.send("An error has occured");
                    console.log(error)
                }
            });
        } else {
            res.json({ message: "I couldn't understand your selection. Please try again." });
        }
    }
    else if(intentHistory[intentHistory.length-1] === 'OPTION' && intentHistory[intentHistory.length-2] === 'OPTION'){
        const servicesList = await getServiceProviders(selected_service);
    
        const openAiResponse = await detectOptionSelection(userMessage, servicesList);
        console.log("OpenAI Response:", openAiResponse);
    
        if (openAiResponse) {
            selected_provider = openAiResponse;
            const providerList = await getServiceProviders(selected_service);
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
            const [bookedDate, startTime, dummy, endTime] = selected_timings.split(" ");

            const query = `
                INSERT INTO Bookings (user_name, service_name, service_provider, booked_slot_date, booked_slot_start_time, booked_slot_end_time)
                VALUES (?, ?, ?, ?, ?, ?);
            `;

            db.query(query, ['ana@gmail.com', selected_service, selected_provider, bookedDate, startTime, endTime], (error, results) => {
                if(error) {
                    // Handle error
                    console.log("Error inserting into Bookings:", error);
                    res.send("An error occurred while booking the slot.");
                } else {
                    // Handle success
                    console.log("Booking successful:", results);
                    res.json({ message: "Booking successful!" });
                }
            });
            // res.json({ message: responseMessage });
        } else {
            res.json({ message: "I couldn't understand your selection. Please try again." });
        }
    }
    else if(intentHistory[intentHistory.length-1]=="SHOW"){
        const query = `
        SELECT 
          service_name, 
          service_provider, 
          location, 
          booked_slot_date, 
          booked_slot_start_time, 
          booked_slot_end_time 
        FROM Bookings 
        WHERE user_name='ana@gmail.com'`;
        db.query(query, [email], (error, results) => {
            if (error) {
              console.error('Error fetching user bookings:', error);
              return res.status(500).send('Error fetching bookings');
            }
            if (results.length > 0) {
              // Format the results in a user-friendly way
              let bookingsList = `You currently have ${results.length} booking(s): \n`;
                  results.forEach((booking, index) => {
                      const formattedDate = moment(booking.booked_slot_date).format('MMM Do');
                      const formattedStartTime = moment(booking.booked_slot_start_time, 'HH:mm:ss').format('ha');
                      bookingsList += `${index + 1}) Service: ${booking.service_name} \n`;
                      bookingsList += `   Provider: ${booking.service_provider}\n`;
                      bookingsList += `   Date and Time: ${formattedDate}, ${formattedStartTime}\n\n`;
                    });
                    res.json({ message: bookingsList.trim(), bookings : "showbookings" });
                  } else {
                    res.json({ message: 'You have no bookings.' });
                  }
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