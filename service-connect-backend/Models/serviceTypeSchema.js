const mongoose = require('mongoose');

// Define the schema for the service types
const serviceTypeSchema = new mongoose.Schema({
    serviceType: { type: String, required: true, unique: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    description: { type: String },
    duration: { type: Number },
    image: { type: Buffer }, // Assuming you want to store images as Buffer data
    servicePlace: { type: String, required: true }
}, { timestamps: true });

// Create a model from the schema
const ServiceType = mongoose.model('ServiceType', serviceTypeSchema);

// Export the model
module.exports = ServiceType;
