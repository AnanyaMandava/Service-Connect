const ServiceType = require("../Models/serviceTypeSchema");
const servicesInfo = require("../Models/serviceSchema");


// API to Add a new service to Service Talble
exports.addServiceTypeAPI = async (req, res) => {
    try {
        // Extract data from the request body
        const { serviceType, serviceId, description, duration, image, servicePlace } = req.body;

        // Validate if required fields are not present
        if (!serviceType || !serviceId || !servicePlace) {
            return res.status(400).json({ message: 'serviceType, serviceId, and servicePlace are required fields' });
        }

        // Create a new instance of the ServiceType model
        const newServiceType = new ServiceType({
            serviceType,
            serviceId,
            description,
            duration,
            image,
            servicePlace
        });

        // Save the new record to the database
        await newServiceType.save();

        // Send a success response
        res.status(201).json({ message: 'Record added successfully', data: newServiceType });
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error adding record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch Service Type based on Service 
// exports.getServiceTypeByDuration = async (req, res) => {
//     try {
//         const { duration } = req.body; // Assuming duration is passed in the request body

//         // Query the ServiceType collection to find documents with the specified duration
//         const serviceTypes = await ServiceType.find({ duration: duration });

//         return res.status(200).json(serviceTypes);
//     } catch (error) {
//         console.error('Error fetching service types by duration:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

exports.getServiceTypeByServiceName = async (req, res) => {
    try {
        const { serviceName } = req.body; // Assuming serviceName is passed in the request body

        // Find the service document based on the serviceName
        const service = await servicesInfo.findOne({ serviceName: serviceName });
        console.log("Service(GST):", service);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Extract the serviceId from the service document
        const serviceId = service._id;
        console.log("ServiceId (GST):", serviceId);

        // Query the ServiceType collection to find documents associated with the serviceId
        const serviceTypes = await ServiceType.find({ service: serviceId });
        console.log("ServiceTypes (GST):", serviceTypes);


        return res.status(200).json(serviceTypes);
    } catch (error) {
        console.error('Error fetching service types by service name:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};