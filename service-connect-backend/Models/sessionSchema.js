// sessionSchema.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    history: [{ role: String, content: String }],
    context: {
        selectedService: String,
        selectedServiceType: String,
        selectedProvider: String,
        selectedDate: String,
        selectedTime: String
    }
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
