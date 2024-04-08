// serviceCatalog.js

const mongoose = require('mongoose');

const serviceCatalogSchema = new mongoose.Schema({
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
    serviceProvider: {   // ( serviceprovider id ) - > (user id with role sp)
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String 
    }
}, { timestamps: true });

const ServiceCatalog = mongoose.model('ServiceCatalog', serviceCatalogSchema);

module.exports = ServiceCatalog;
