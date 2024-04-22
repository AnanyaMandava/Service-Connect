// const dotenv = require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql');
// const cors = require("cors");
const moment = require('moment');
const axios = require('axios');
const ConversationState = require('../Models/conversationStateSchema');
const ServiceType = require('../Models/serviceTypeSchema');
const serviceProviderInfo = require('../Models/serviceCatalogSchema');
const ServiceInfo = require('../Models/serviceSchema');
const userName = require('../Models/userSchema');
const Booking = require("../Models/bookingSchema");

let service= null;
    let serviceType = null;
    let dateTime = null;
    let providersList = null;
    let userId

// Function to get or create conversation state
const findOrCreateConversationState = async (userId) => {
    let conversationState = await ConversationState.findOne({ userId });
    if (!conversationState) {
        // If conversation state doesn't exist, create a new one with an empty messages array
        conversationState = new ConversationState({ userId, state: 'INITIAL', messages: [] });
        await conversationState.save();
    } else if (!conversationState.messages) {
        // If conversation state exists but doesn't have a messages array, initialize it
        conversationState.messages = [];
        await conversationState.save();
    }
    return conversationState;
};


// Function to update the conversation state
const updateConversationState = async (userId, updates) => {
    const options = { new: true, upsert: true };
    return ConversationState.findOneAndUpdate({ userId }, updates, options);  
};

const detectBookingCode = (message) => {
    const codeRegex = /([a-zA-Z]+)_([a-zA-Z]+)_([a-zA-Z0-9]+)_([0-9]{4}-[0-9]{2}-[0-9]{2})_([0-9]{2}AM|[0-9]{2}PM)/;
    const match = message.content.match(codeRegex);
    console.log("entered detect code block")
    if (match) {
        return {
            service: match[1],
            serviceType: match[2],
            serviceProvider: match[3],
            date: match[4],
            time: match[5]
        };

    }
    return null;
};

const hasBookingCode = (message) => {
    const bookingCodeRegex = /_(\d{2}\/\d{2})_(\d{2}:\d{2}:\d{2})/;
    const bookingMatch = message.match(bookingCodeRegex);
    console.log("Entered has booking code", bookingMatch);

    if (bookingMatch) {
    return true;
    }
    return false;
}


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
    "PBS": "Plumbing Services",
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

const detectService = (input) => {
    // Using a case-insensitive regex to search for full service names
    const detectedService = Object.entries(serviceMap).find(([key, value]) => 
        new RegExp(value, "i").test(input)
    );
    return detectedService ? detectedService[1] : null; // Return the key if found
};

const detectServiceType = (input) => {
    const lowerInput = input.toLowerCase(); // Convert input to lower case once for efficiency
    // Find the full name by checking each value in the serviceTypeMap
    const detectedServiceTypeFullName = Object.values(serviceTypeMap).find(value => {
        const regex = new RegExp(`\\b${value.toLowerCase()}\\b`); // Create a regex that looks for the whole phrase as a whole word
        return regex.test(lowerInput);
    });
    return detectedServiceTypeFullName || null;
};

function extractServiceProvider(providersList, responseMessage) {
    // Split the providers list into individual providers
    const providers = providersList.split('\n');
    let providerMatch = "";
    let providerName = "";
    
    // Create a regular expression to match each provider based on their numbering in the list
    for (let provider of providers) {
        providerMatch = provider.match(/^\d+\.\s*(.*)$/); // Matches '1. ABC Plumb' and captures 'ABC Plumb'
        if (providerMatch) {
            providerName = providerMatch[1];
            const regex = new RegExp("\\b" + providerName + "\\b", "i"); // Create a regex to match the full name
            if (regex.test(responseMessage)) {
                return providerName; // Return the provider name if found in the response
            }
        }
    }
    console.log("providerMatch and Name:", providerMatch, providerName);

    return null; // Return null if no provider was matched
}

  
  // Function to extract date and time from input using regex and moment.js
  const detectDateTime = (input) => {
          // First, try to extract the part that looks like a booking code with underscores
    const bookingCodeRegex = /_(\d{2}\/\d{2})_(\d{2}:\d{2}:\d{2})/;
    const bookingMatch = input.match(bookingCodeRegex);
    console.log("Entered DT", bookingMatch);

    if (bookingMatch) {
        // Split the booking code part to extract date and time
        const parts = bookingMatch[0].split('_');
        const datePart = parts[parts.length - 2];  // Second last part for date
        const timePart = parts[parts.length - 1];  // Last part for time

        // Format the date and time into a proper string for parsing
        const dateTimeStr = datePart.replace(/\//g, '-') + ' ' + timePart;
        const date = moment(dateTimeStr, 'MM-DD HH:mm:ss', true);
        if (date.isValid()) {
            console.log(date.format('YYYY-MM-DD HH:mm:ss'));
            return date.format('YYYY-MM-DD HH:mm:ss'); // Standardize the date format
        }
    }


    // If no booking code format found, fallback to parsing natural language date
    const naturalDateRegex = /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?,?\s+at\s+\d{1,2}:\d{2}\s+(AM|PM)/i;
    const naturalMatch = input.match(naturalDateRegex);
    if (naturalMatch) {
        const date = moment(naturalMatch[0], 'MMMM D, YYYY at h:mm A', true);
        if (date.isValid()) {
            return date.format('YYYY-MM-DD HH:mm:ss');
        }
    }

    return null; // Return null if no date-time could be parsed
};

const detectIntent = async (msg, conversationState) => {
    let systemMessages = [
        {
            role: "system",
            content: "You are an intelligent assistant capable of booking a range of services for users. When users provide details, you should remember them and not ask for those details again. Your goal is to collect information: service category,service type category, service provider and date/time of the service. Here are the services and their corresponding service types: - Home Maintenance and Repair Services (Plumbing Services, Electrical Services, HVAC Services, Appliance Repair) - Cleaning and Organizational Services (House Cleaning, Carpet Cleaning, Window Washing, Closet and Home Organization) - Health and Wellness Services (In-Home Nursing Care, Physical Therapy, Personal Training, Massage Therapy) - Beauty and Personal Grooming Services (Mobile Hairdressing and Barber Services, Makeup Artists, Manicure and Pedicure) - Pet Services (Mobile Pet Grooming, Pet Sitting, Dog Walking) - Food and Beverage Services (Personal Chef Services, Catering for Small Gatherings, Wine Tasting) - Educational and Entertainment Services (Tutoring, Music Lessons, Magicians or Entertainers) - Gardening and Landscaping Services (Landscape Design Consultation, Garden Maintenance, Tree Services).it is your responsibility to list out all the near by service providers in San Jose related to the servicetype and then ask user which service provider they want to choose from that list. When a user provides complete information in one message, use it to fill in the booking form without asking for those details again. when a user provides a service type, intelligently assign it under a service category and vise vera and confirm with the user. If a user specifies a service that implies a service type, like 'Mobile Pet Grooming', confirm both service category and service type category related to it, which in this case is 'Pet Services (PS)' under 'Mobile Pet Grooming’ category, and then ask for the date and time. Once you have all necessary information, confirm the booking with a code in the format ‘service_servicetype_serviceprovider_date_time'(remember that you have to provide date and time in the format 'MM DD HH:mm:ss' eg '_04/15_04:00:00'). if you do not understand the users message list out all the services and ask them what would they like to choose and end the chat once the user confirms the booking. whenever you mention a service or service type or provider mention in single quotes ' '"       },
        ...conversationState.messages.map(msg => ({
            role: msg.role,
            content: msg.content
        })),
        {
            role: "user",
            content: msg
        }
    ];

    // Here, we'll check for booking codes in system responses
    let bookingDetails = null;
    systemMessages.forEach(message => {
        if (message.role === "assistant") {
            console.log("message here:",message )
            const details = detectBookingCode(message);
            if (details) bookingDetails = details;
        }
    });

    if (bookingDetails) {
        console.log("Detected booking details:", bookingDetails);
        // You can now use bookingDetails for further processing
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            max_tokens: 150,
            temperature: 0.5,
            messages: systemMessages,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API responded with:', error.response ? error.response.data : error.message);
        throw error;
    }
};



const getServiceProviders = async (serviceType) => {
    try {
        console.log("service Type received:", serviceType);
        // Find the service document based on the selected service name
        const servicetype = await ServiceType.findOne({ serviceType: serviceType });
        console.log("service type 2:", servicetype);


        if (!servicetype) {
            throw new Error('Service not found');
        }

        // Find all service types associated with the service
        const serviceproviders = await serviceProviderInfo.find({ serviceType: servicetype._id });

        const serviceProviderIds = serviceproviders.map(provider => provider.serviceProvider);

        const providerNames = await userName.find({ _id: { $in: serviceProviderIds } });

        // Convert the results to a format suitable for sending
        let providerList = providerNames.map((provider, index) => `${index + 1}. ${provider.fullname}`).join('\n');
        console.log("service providers list:", providerList);

        return providerList;
    } catch (error) {
        // Handle errors
        console.error('Error fetching service types:', error);
        throw error;
    }
};


const processUserMessage = async (message, userId) => {
    // Retrieve or create the current conversation state
    let conversationState = await findOrCreateConversationState(userId);

    // Append the user message to the conversation history
    conversationState.messages.push({ role: 'user', content: message });
    
    // Prepare context for AI response
    const context = prepareContext(message, conversationState);

    // Call GPT-4 to process the message and get a response
    let responseMessage = await detectIntent(message, context);
    console.log("Resp mesg1:", responseMessage);
    conversationState.service = service;

    conversationState.serviceType = serviceType;
    if(service==null)
    {
        service = detectService(responseMessage);
    conversationState.service = service;
    }
    if(serviceType==null)
    {
        serviceType = detectServiceType(responseMessage);
        conversationState.serviceType = serviceType;
        const test = serviceType
        console.log("service Type passed:", serviceType);
        if (test!=null)
        {
            console.log("enetered sPs:");

        providersList = await getServiceProviders(serviceType);
        console.log("providers",providersList);
        const listPattern = /(\d+\.\s*[^1-9\n]+(?:\n|$))+/g;
        responseMessage = responseMessage.replace(listPattern, providersList);
        }

    }
    if(dateTime==null)
    {
        dateTime = detectDateTime(responseMessage);
        conversationState.dateAndTime = dateTime;
    }



    // const service = detectService(responseMessage);
    // const serviceType = detectServiceType(responseMessage);
    // const dateTime = detectDateTime(responseMessage);
    // console.log("Serv Type:", serviceType);
    // // Update conversation state
    // if (service) {
    //     conversationState.service = service;
    // }
    // if (serviceType) {
    //     conversationState.serviceType = serviceType;
    //     // Fetch service providers based on service type
    //     console.log("service Type passed:", serviceType);
    //     const providersList = await getServiceProviders(serviceType);
    //     const listPattern = /(\d+\.\s*[^1-9\n]+(?:\n|$))+/g;
    //     responseMessage = responseMessage.replace(listPattern, providersList);
    // }
    // if (dateTime) {
    //     conversationState.dateAndTime = dateTime;
    // }
    conversationState.messages.push({ role: 'user', content: message });

    console.log("service value:", service);
    console.log("service Type value:", serviceType);
    console.log("service value:", conversationState.service);
    console.log("service Type value:", conversationState.serviceType);

    // Update the conversation state with the detected information
    await updateConversationState(userId, conversationState);

    // Append this response to the conversation history
    conversationState.messages.push({ role: 'assistant', content: responseMessage });

    // Save the updated conversation state with the new message history
    await updateConversationState(userId, conversationState);


    console.log("Resp mesg2:", responseMessage);
    const hasbookingcode = hasBookingCode(responseMessage);
    console.log("it has or  not",hasbookingcode);

    if (hasbookingcode) {
    let serviceProvider = extractServiceProvider(providersList, responseMessage);
    console.log("Inside with values");
    console.log("Service Provider:", serviceProvider);
    console.log("Service:", service);
    console.log("Service Type: ", serviceType);
    console.log("Date and Time:", dateTime);
    let userDoc = await userName.findOne({ fullname: serviceProvider });
if (!userDoc) {
    console.error("No user found with fullname:", serviceProvider);
}
    let serviceProviderDoc = await serviceProviderInfo.findOne({ serviceProvider: userDoc._id });
        let serviceDoc = await ServiceInfo.findOne({ serviceName: service });
        let serviceTypeDoc = await ServiceType.findOne({ serviceType: serviceType });
       // console.log("ids",serviceProviderDoc._id,serviceDoc._id,serviceTypeDoc._id)
       console.log("Service Provider Document:", serviceProviderDoc);
console.log("Service Document:", serviceDoc);
console.log("Service Type Document:", serviceTypeDoc);

        if (serviceProviderDoc && serviceDoc && serviceTypeDoc) {
            const newBooking = new Booking({
                user: userId,
                serviceProvider: userDoc._id,
                service: serviceDoc._id,
                serviceType: serviceTypeDoc._id,
                bookingDate: new Date(dateTime.toLocaleString()), // Ensure dateTime is converted to Date object
                totalAmount: serviceProviderDoc.price,
                paymentStatus: "Pending",
                status: "Upcoming"
            });

            // Save the new booking
            try {
                await newBooking.save();
                responseMessage += " Your booking has been successfully created.";
            } catch (error) {
                console.error('Error saving booking:', error);
               responseMessage += " There was an error creating your booking.";
            }


            }
            service= null;
    serviceType = null;
    dateTime = null;
    serviceProvider=null;
            }
                return responseMessage;
};

  const prepareContext = (message, conversationState) => {
    let contextMessages = conversationState.messages || [];
    contextMessages.push({ role: 'user', content: message });

    // Only include the last few exchanges to maintain a relevant context
    contextMessages = contextMessages.slice(-5);

    return { messages: contextMessages };
};

exports.chatHandler = async (req, res) => {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
  
    try {
      const responseMessage = await processUserMessage(message, userId);
  
      // Send back the appropriate response
      res.json({ message: responseMessage });
    } catch (error) {
      console.error('Error in chatHandler:', error);
      res.status(500).send('Internal Server Error');
    }
};