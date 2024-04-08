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