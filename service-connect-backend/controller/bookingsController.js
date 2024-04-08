const bookingsData = require("../Models/bookingSchema");

exports.fetchBookingsAPI = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Query bookings for the specified user and populate related fields
        const bookings = await bookingsData.find({ user: userId })
            .populate('user', 'fullname') // Populate the 'user' field and select 'username' only
            .populate('service', 'serviceName') // Populate the 'service' field and select 'serviceName' only
            .populate('serviceType', 'serviceType') // Populate the 'serviceType' field and select 'serviceType' only
            .populate('serviceProvider', 'fullname'); // Populate the 'serviceProvider' field and select 'fullname' only

        // Send the retrieved bookings as a response
        res.status(200).json(bookings);
    } catch (error) {
        // Handle errors
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.fetchAllBookingsAPI = async (req, res) => {
    try {
         // Query bookings for the specified user and populate related fields
        const bookings = await bookingsData.find()
            .populate('user', 'fullname') // Populate the 'user' field and select 'username' only
            .populate('service', 'serviceName') // Populate the 'service' field and select 'serviceName' only
            .populate('serviceType', 'serviceType') // Populate the 'serviceType' field and select 'serviceType' only
            .populate('serviceProvider', 'fullname'); // Populate the 'serviceProvider' field and select 'fullname' only

        // Send the retrieved bookings as a response
        res.status(200).json(bookings);
    } catch (error) {
        // Handle errors
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};