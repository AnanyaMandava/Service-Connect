// const dotenv = require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql');
// const cors = require("cors");
const moment = require('moment');
const axios = require('axios');
const ConversationState = require('../Models/conversationStateSchema');
const ServiceType = require('../Models/serviceTypeSchema');
const serviceProvider = require('../Models/serviceCatalogSchema');
const userName = require('../Models/userSchema');

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

const detectService = (input) => {
    const detectedServiceKey = Object.keys(serviceMap).find(key => input.toLowerCase().includes(key.toLowerCase()));
    return detectedServiceKey ? serviceMap[detectedServiceKey] : null;
};

const detectServiceType = (input) => {
    const detectedServiceTypeKey = Object.keys(serviceTypeMap).find(key => input.toLowerCase().includes(key.toLowerCase()));
    return detectedServiceTypeKey ? serviceTypeMap[detectedServiceTypeKey] : null;
};
  
  // Function to extract date and time from input using regex and moment.js
  const detectDateTime = (input) => {
    // Regex to match dates in the format of "April 25th 4 PM" or "2021-04-25 16:00"
    const dateRegex = /(\b\d{1,2}\D{0,3})?\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*\d{1,2}(?:st|nd|rd|th)?,?\s*\d{4}(?: \d{1,2}:\d{2}:\d{2})?|(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/i;
    const matches = input.match(dateRegex);
  
    // If a match is found, try to parse it with moment.js to confirm it's a valid date
    if (matches) {
      // Try parsing with moment.js
      const date = moment(matches[0], ['MMMM Do YYYY', 'YYYY-MM-DD HH:mm:ss']);
      if (date.isValid()) {
        return date.format('YYYY-MM-DD HH:mm:ss'); // Standardize the date format
      }
    }
    return null;
};


const detectIntent = async (msg, conversationState) => {

    const filteredMessages = conversationState.messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));
    
    let systemMessages  = [
    {
        role: "system",
        content: "You are an intelligent assistant capable of booking a range of services for users. When users provide details, you should remember them and not ask for those details again. Your goal is to collect information: service category, service type, and date/time of the service. Here are the services and their corresponding service types: - Home Maintenance and Repair Services (Plumbing Services, Electrical Services, HVAC Services, Appliance Repair) - Cleaning and Organizational Services (House Cleaning, Carpet Cleaning, Window Washing, Closet and Home Organization) - Health and Wellness Services (In-Home Nursing Care, Physical Therapy, Personal Training, Massage Therapy) - Beauty and Personal Grooming Services (Mobile Hairdressing and Barber Services, Makeup Artists, Manicure and Pedicure) - Pet Services (Mobile Pet Grooming, Pet Sitting, Dog Walking) - Food and Beverage Services (Personal Chef Services, Catering for Small Gatherings, Wine Tasting) - Educational and Entertainment Services (Tutoring, Music Lessons, Magicians or Entertainers) - Gardening and Landscaping Services (Landscape Design Consultation, Garden Maintenance, Tree Services). And then list out all the service providers related to the servicetype and ask user for which service provider they want to choose. When a user provides complete information in one message, use it to fill in the booking form without asking for those details again. If a user specifies a service that implies a service type, like 'Mobile Pet Grooming', confirm the service category related to it, which in this case is 'Pet Services (PS)', and then ask for the date and time. Once you have all necessary information, confirm the booking with a code in the format 'service_servicetype_serviceprovider_date_time'. "
     },
    {
        role: "user",
        content: msg // I want to book massage service tomorrow --> response
    }
];

systemMessages = systemMessages.concat(filteredMessages);

const detectedServiceType = detectServiceType(msg);
    if (detectedServiceType) {
        const serviceProviderList = getServiceProviders(detectedServiceType);
        if (serviceProviderList.length > 0) {
            // Append the list of service providers to the response message
            systemMessages.push({
                role: "assistant",
                content: `Here are some service providers for ${detectedServiceType}: ${serviceProviderList}`
            });
        } else {
            // If no service providers are found, inform the user
            systemMessages.push({
                role: "assistant",
                content: `Sorry, no service providers found for ${detectedServiceType}`
            });
        }
    }

      // If there's existing conversation state, add it to the messages array
    if (conversationState.lastMessage) {
        systemMessages.push({ role: "assistant", content: conversationState.lastMessage });
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
        const aiMessage = response.data.choices[0].message.content;
        return aiMessage;
    } catch (error) {
        if (error.response) {
            console.error('OpenAI API responded with:', error.response.status, error.response.data);
        }
        throw error;
    }
}

const getServiceProviders = async (selected_type) => {
    try {
        // Find the service document based on the selected service name
        const servicetype = await ServiceType.findOne({ serviceType: selected_type });

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

const processUserMessage = async (message, userId) => {
    // Retrieve or create the current conversation state
    let conversationState = await findOrCreateConversationState(userId);
    conversationState.messages.push({ role: 'user', content: message});

    // Check for provided service, service type, and date/time in the user message
    const service = detectService(message) || conversationState.service;
    const serviceType = detectServiceType(message) || conversationState.serviceType;
    const dateTime = detectDateTime(message) || conversationState.dateAndTime;

    // Update the conversation state with the detected information
    const updates = { service, serviceType, dateTime, messages: [...conversationState.messages, { role: 'user', content: message }] };
    await updateConversationState(userId, updates);
    // Prepare context for AI response
    const context = prepareContext(message, conversationState);

    // Call GPT-4 to process the message and get a response
    const responseMessage = await detectIntent(message, context);

    // Append this response to the conversation history
    conversationState.messages.push({ role: 'assistant', content: responseMessage });

    // Save the updated conversation state with the new message history
    await updateConversationState(userId, { 
        service, 
        serviceType, 
        dateTime, 
        messages: conversationState.messages 
    });

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