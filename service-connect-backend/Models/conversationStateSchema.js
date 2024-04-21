const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    role: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ConversationStateSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    service: { type: String, default: "" },  // Store the detected or selected service
    serviceType: { type: String, default: "" },  // Store the detected or selected service type
    dateAndTime: { type: String, default: "" },  // Store the selected date and time for service
    messages: [MessageSchema]  // Conversation history
});

const ConversationState = mongoose.model('ConversationState', ConversationStateSchema);

module.exports = ConversationState;
