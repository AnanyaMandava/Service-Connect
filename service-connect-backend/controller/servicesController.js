const servicesInfo = require("../Models/serviceSchema");

// API to Add a new service to Service Talble
exports.addServiceAPI = async (req,res) => {

    try {
        // console.log(req.body);
        // Extract data from the request body
        const { serviceName, description } = req.body;

        // Validate if required fields are not present
        if (!serviceName || !description) {
            return res.status(400).json({ message: 'serviceName and description are required fields' });
        }

        // Create a new instance of the Service model
        const newService = new servicesInfo({
            serviceName,
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

// API to Update an existing service in Service Talble

exports.updateServiceAPI = async (req, res) => {
    try {
        // Extract data from the request body
        const { id, serviceName, description } = req.body;

        // Check if id is provided
        if (!id) {
            return res.status(400).json({ message: 'id is required for updating the service' });
        }

        // Find the service by id and update it
        const service = await servicesInfo.findByIdAndUpdate(id, { serviceName, description }, { new: true });

        // Check if service exists
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Service updated successfully', data: service });
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Fetch all services

exports.fetchServiceAPI = async (req, res) => {

    try {
        // Query all services from the Service table
        const services = await servicesInfo.find();

        // Send the retrieved services as a response
        res.status(200).json(services);
    } catch (error) {
        // Handle errors
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}