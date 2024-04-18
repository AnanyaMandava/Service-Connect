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
const Session = require('../Models/sessionSchema'); // Import the session schema


var intentHistory=[];
let selected_service="";
let selected_type="";
let selected_provider="";
let selected_timings="";
let b_service_id = "";
let b_service_type_id = "";
let b_service_provider_id = "";

const serviceMap = {
    "HMS": "Home Maintenance and Repair Services",
    "COS": "Cleaning and Organizational Services",
    "HWS": "Health and Wellness Services",
    "BPG": "Beauty and Personal Grooming Services",
    "PS": "Pet Services",
    "FBS": "Food and Beverage Services",
    "EES": "Educational and Entertainment Services",
    "GLS": "Gardening and Landscaping Services"
};

const serviceTypeMap = {
    "PS": "Plumbing Services",
    "ES": "Electrical Services",
    "HS": "HVAC Services",
    "AR": "Appliance Repair",
    "HC": "House Cleaning",
    "CC": "Carpet Cleaning",
    "WW": "Window Washing",
    "CHO": "Closet and Home Organization",
    "INC": "In-home Nursing Care",
    "PT": "Physical Therapy",
    "PET": "Personal Training",
    "MT": "Massage Therapy",
    "MHBS": "Mobile Hairdressing and Barber Services",
    "MA": "Makeup Artists",
    "MEPE": "Manicure and Pedicure",
    "MPG": "Mobile Pet Grooming",
    "PETS": "Pet Sitting",
    "DW": "Dog Walking",
    "PCS": "Personal Chef Services",
    "CSG": "Catering for Small Gatherings",
    "WT": "Wine Tasting",
    "TM": "Tutoring",
    "ML": "Music Lessons",
    "ME": "Magicians or Entertainers",
    "LDC": "Landscape Design Consultation",
    "GME": "Garden Maintenance",
    "TRS": "Tree Services"
};

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
            model: 'gpt-4',
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
        content: "You are here to detect intent of the user, if the user has provided more than one information(service(Home Maintenance and Repair Services (Shortcut - HMS), Cleaning and Organizational Services(Shortcut - COS), Health and Wellness Services(Shortcut - HWS), Beauty and Personal Grooming Services(Shortcut - BPG), Pet Services(Shortcut - PS), Food and Beverage Services(Shortcut - FBS), Educational and Entertainment Services(Shortcut - EES), Gardening and Landscaping Services(Shortcut - GLS)), servicetype(based on service - Plumbing Services(shortcut -PS) Electrical Services (shortcut -ES) HVAC Services (shortcut -HS) Appliance Repair (shortcut -AR) House Cleaning (shortcut -HC) Carpet Cleaning (shortcut -CC) Window Washing (shortcut -WW) Closet and Home Organization (shortcut -CHO) In-home Nursing Care (shortcut -INC) Physical Therapy (shortcut -PT) Personal Training (shortcut - PET) Massage Therapy (shortcut -MT) Mobile Hairdressing (shortcut -MH) and Barber Services (shortcut -BS) Makeup Artists (shortcut -MA) Manicure (shortcut -ME) and Pedicure (shortcut -PE) Mobile Pet Grooming (shortcut -MPG) Pet Sitting (shortcut -PETS) Dog Walking (shortcut -DW) Personal Chef Services (shortcut -PCS) Catering for Small Gatherings (shortcut - CSG) Wine Tasting (shortcut -WT) Tutoring Music Lessons (shortcut -TM) Magicians or Entertainers (shortcut - ME) Landscape Design Consultation (shortcut -LDC) Garden Maintenance (shortcut -GME) Tree Services (shortcut - TRS), date or/and time in a sentence) reply accordingly with the information or question, once you have all the information generate a code concatenating shortcuts with underscore(service_servicetyp_date_time) in your final response and display details. detect the related service and service type from the message and assign to a particular shortcut. If a user has given date and time as well concatenate date and time to the above generated shortcut using underscores using this (YYYY-MM-DD HH:MM:SS) format, Keep asking questions on the missing information in the concatenated string and return the concatenated string with all four information shortcuts in order. If the user message just contains a message that he wants to book a new service/appointment request with no other additional information then return 'NEWBOOKING'. If the user wants to view his bookings can you respond back with SHOW, else reply with 'UNRELATED' only."
     });
    intent.push({
        role: "user",
        content: msg // I want to book massage service tomorrow --> response
    });
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
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
        ontent: "You are here to detect option selection of the user, The user can select the option based on its related number or its name, from the provided list you must respond back with its name only, else respond with OOPS only. Following is the provided list: "+list
    });
    intent.push({
        role: "user",
        content: msg
    });
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
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
        content: "You are here to detect date and time properly from the user, you must respond back three items the first item is the detected date in the following format YYYY-MM-DD, second item is the detected time in the following format only HH:MM:SS, third item is the detected time added with 1 hour time in this format only HH:MM:SS. In essence you must respond back the required items in this format only: YYYY-MM-DD HH:MM:SS HH:MM:SS and note that user can also respond with names of the days, please respond and return accordingly. the time here should be in PST."
    });
    intent.push({
        role: "user",
        content: msg
    });
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
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

const detectMulti = async (msg) => {
    let intent = [];
    intent.push({
        role: "system",
        content: "You are here to detect the information correctly. please note that we are looking for 4 details - service(shortcut serv )(fetch services from getService() function), service type(short cut st) (based on service fetch theservicetypes using getservicetypes() function), service provider(shortcut sp) and date(shortcut d) and time(shortcut t), if a user has given more than one information in a single sententence you append the detected shortcuts with an underscore and return - for example if a user says i want to book a cleaning service on apr 23rd you reply with serv_d and so on"
    });
    intent.push({
        role: "user",
        content: msg
    });
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
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
    const userId = req.body.userId;
    const email = req.body.email;


    console.log("user Message:", userMessage)
    const detectedIntent = await detectIntent(userMessage);
    intentHistory.push(detectedIntent);
    console.log("AI Response:",detectedIntent)
    res.json({message : detectedIntent});
    
        if (!req.body.message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const openAiResponse = await detectIntent(userMessage);
        console.log("C:", openAiResponse);
        // res.json({ message: openAiResponse });
    
};