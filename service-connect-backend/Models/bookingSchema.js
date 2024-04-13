// bookingSchema.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    serviceProvider: {  // ( serviceprovider id ) - > (user id with role sp)
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    service: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service',
        required: true 
    },
    serviceType: {   
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ServiceType', 
        required: true 
    },
    bookingDate: { 
        type: Date, 
        default: Date.now,
        required: true 
    },
    totalAmount: { 
        type: Number, 
        required: true 
    },
    paymentStatus: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
