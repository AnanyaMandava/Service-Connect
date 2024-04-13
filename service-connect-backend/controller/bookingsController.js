const bookingsData = require("../Models/bookingSchema");
const moment = require('moment-timezone');


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
        const userId = req.params.userId; // Get userId from the request parameters

        // Query bookings for the specified user and populate related fields
        const bookings = await bookingsData.find({ user: userId }) // Filter by userId
            .populate('user', 'fullname') // Populate the 'user' field and select 'fullname' only
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


exports.bookService = async (req, res) => {
    const { userId, serviceProviderId, serviceId, serviceTypeId, bookedDateTime, totalAmount } = req.body;

    const newBooking = new bookingsData({
        user: userId,
        serviceProvider: serviceProviderId,
        service: serviceId,
        serviceType: serviceTypeId,
        bookingDate: bookedDateTime, // converts moment back to JS Date object for MongoDB
        totalAmount: totalAmount,
        paymentStatus: "Pending",
        status: "Upcoming"
    });

    try {
        // Save the booking
        const savedBooking = await newBooking.save();

        // Fetch the booking with necessary fields populated
        const populatedBooking = await bookingsData.findById(savedBooking._id)
            .populate('user')  // Example fields to populate from the user
            .populate('serviceProvider')  // Example fields from serviceProvider
            .populate('service')  // Example fields from service
            .populate('serviceType');  // Example fields from serviceType

        if (!populatedBooking) {
            return res.status(404).json({ message: 'Booking not found after save' });
        }

        // Send the populated booking as a response
        res.status(201).json({ message: "Booking successful!", booking: populatedBooking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ error: 'An error occurred while saving booking', details: error });
    }
};