const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    role: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const ConversationStateSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    messages: [MessageSchema]
});

const ConversationState = mongoose.model('ConversationState', ConversationStateSchema);

module.exports = ConversationState;
