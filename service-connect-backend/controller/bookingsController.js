const bookingsData = require("../Models/bookingSchema");
const moment = require('moment-timezone');

exports.fetchBookingsAPI = async (req, res) => {
    try {
        const serviceProviderId = req.params.serviceProviderId;

        // Query bookings for the specified serviceProvider and populate related fields
        const bookings = await bookingsData.find({ serviceProvider: serviceProviderId })
                .populate('user', 'fullname mobile address city state zipcode')
                .populate('service', 'serviceName')
                .populate('serviceType', 'serviceType duration')
                .populate('serviceProvider', 'fullname mobile address city state zipcode');

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

// Fetch Service Provider Bookings 
exports.fetchAllSPBookings = async (req, res) => {
    try {
        const serviceProviderId = req.params.serviceProviderId; // Get userId from the request parameters

        // Query bookings for the specified user and populate related fields
        const bookings = await bookingsData.find({ serviceProvider: serviceProviderId }) // Filter by userId
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

exports.getNextBooking = async (req, res) => {
    try {
        const userId = req.params.userId;
        const now = new Date();
        const nextBooking = await bookingsData.findOne({ user: userId, bookingDate: { $gt: now } })
            .populate('service', 'serviceName')
            .populate('serviceType', 'serviceType')
            .populate('serviceProvider', 'fullname mobile address city state zipcode')
            .sort({ bookingDate: 1 })
            .exec();

        if (nextBooking) {
            res.status(200).json(nextBooking);
        } else {
            res.status(404).send('No upcoming bookings found');
        }
    } catch (error) {
        console.error('Error fetching the next booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch SP upcoming booking details

exports.getSPNextBooking = async (req, res) => {
    try {
        const serviceProviderId = req.params.serviceProviderId;
        const now = new Date();
        const nextBooking = await bookingsData.findOne({ serviceProvider: serviceProviderId, bookingDate: { $gt: now } })
            .populate('service', 'serviceName')
            .populate('serviceType', 'serviceType')
            .populate('user', 'fullname mobile address city state zipcode')
            .sort({ bookingDate: 1 })
            .exec();

        if (nextBooking) {
            res.status(200).json(nextBooking);
        } else {
            res.status(404).send('No upcoming bookings found');
        }
    } catch (error) {
        console.error('Error fetching the next booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getActiveBookings = async (req, res) => {
    const { serviceProviderId } = req.params;

    try {
        const bookings = await bookingsData.find({
            serviceProvider: serviceProviderId,
            status: { $in: ["Upcoming", "Ongoing"] } // Directly querying only "Ongoing" status
        })
        .populate('user', 'fullname mobile address city state zipcode')
        .populate('service', 'serviceName')
        .populate('serviceType', 'serviceType')
        .populate('serviceProvider', 'fullname mobile address city state zipcode');

        if (bookings.length > 0) {
            res.status(200).json(bookings);
        } else {
            res.status(404).send('No ongoing bookings found');
        }
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get Completed/Cancelled Bookings
exports.getCompletedBookings = async (req, res) => {
    const { serviceProviderId } = req.params;

    try {
        const bookings = await bookingsData.find({
            serviceProvider: serviceProviderId,
            status: { $in: ["Completed", "Cancelled"] } // Directly querying only "Ongoing" status
        })
        .populate('user', 'fullname mobile address city state zipcode')
        .populate('service', 'serviceName')
        .populate('serviceType', 'serviceType')
        .populate('serviceProvider', 'fullname mobile address city state zipcode');

        if (bookings.length > 0) {
            res.status(200).json(bookings);
        } else {
            res.status(404).send('No ongoing bookings found');
        }
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update Booking Status

exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedBooking = await bookingsData.findByIdAndUpdate(
            id,
            { $set: { status: status } },
            { new: true } // Return the modified document
        );

        if (!updatedBooking) {
            return res.status(404).send('Booking not found');
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
