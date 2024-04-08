// bookingSchema.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    serviceProvider: {  // ( serviceprovider id ) - > (user id with role sp)
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    serviceCatalog: {   
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ServiceCatalog', 
        required: true 
    },
    bookingDate: { 
        type: Date, 
        default: Date.now 
    },
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: true 
    },
    totalAmount: { 
        type: Number, 
        required: true 
    },
    paymentStatus: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
