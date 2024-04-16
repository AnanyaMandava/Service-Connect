const serviceCatalog = require("../Models/serviceCatalogSchema");

// API to Add a new service to Service Talble
exports.addServiceProviderAPI = async (req,res) => {

    try {
        // console.log(req.body);
        // Extract data from the request body
        const { service, serviceType, serviceProvider, price, description } = req.body;

        // Create a new instance of the Service model
        const newService = new serviceCatalog({
            service,
            serviceType,
            serviceProvider,
            price,
            description
        });

        // Save the new record to the database
        await newService.save();

        // Send a success response
        res.status(201).json({ message: 'Record added successfully', data: newService });
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error adding record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// In your routes file
exports.getRecords = async (req, res) => {
    try {
        const { serviceTypeId, maxPrice } = req.query;
        const serviceProviders = await serviceCatalog.find({
            serviceType: serviceTypeId,
            price: { $lte: maxPrice }
        })
        .populate('service')
        .populate('serviceType')
        .populate({
            path: 'serviceProvider',
            select: 'fullname email mobile address city state zipcode' // Select the fields you need
        });

        res.json(serviceProviders);
    } catch (error) {
        console.error("Error fetching service providers:", error);
        res.status(500).send('Server error');
    }
};


// Fetch records based on Id

exports.getServiceProviderRecords = async (req, res) => {
    try {
        const { serviceProviderId } = req.params;
        const serviceProviders = await serviceCatalog.find({
            serviceProvider: serviceProviderId
        })
        .populate('service')
        .populate('serviceType')
        .populate({
            path: 'serviceProvider',
            select: 'fullname email mobile address city state zipcode' // Select the fields you need
        });

        res.json(serviceProviders);
    } catch (error) {
        console.error("Error fetching service providers:", error);
        res.status(500).send('Server error');
    }
};


// Update the Service Provider Record  (Price and Desc)

exports.updateServiceProvider = async (req, res) => {

    const { id } = req.params;
    const { price, description } = req.body;
    
    try {
        const updatedEntry = await serviceCatalog.findByIdAndUpdate(id, {
            price, description
        }, { new: true }).populate('service').populate('serviceType').populate('serviceProvider');
        
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Service catalog entry not found' });
        }
        res.status(200).json(updatedEntry);
    } catch (error) {
        console.error('Failed to update service catalog entry:', error);
        res.status(500).json({ message: 'Error updating service catalog entry' });
    }
};

// Delete the service Provider record

exports.deleteServiceProvider = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedEntry = await serviceCatalog.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Service catalog entry not found' });
        }
        res.status(200).json({ message: 'Service catalog entry deleted successfully' });
    } catch (error) {
        console.error('Failed to delete service catalog entry:', error);
        res.status(500).json({ message: 'Error deleting service catalog entry' });
    }
};