const express = require("express");
const router = express.Router();

const usersController = require("../controller/usersController");
const servicesController = require("../controller/servicesController");
const chatbotController = require("../controller/chatbotController");
const serviceTypeController = require("../controller/serviceTypeController");
const serviceProviderController = require("../controller/serviceCatalogController");
const bookingsController = require("../controller/bookingsController");

router.get("/", function(req,res){
    return res.status(200).json("Successfully Loaded");
});

//Login Authentication API

// Signup a new user into users table
router.post("/all/signup", usersController.signUpAPI);

// Login validation email and password
router.post("/all/login", usersController.logInApi);

// Fetch the user record from user table based on Email
router.get("/all/userdetails/:userId", usersController.getUserDetails);

// Fetch the user record from User table based on UserID
router.get("/all/userinfo/:id", usersController.userInfoAPI);

// Fetch all user records from Users Schema
router.get("/all/users", usersController.getAllUsers);

// Edit Profile for user
router.put('/all/updateuser/:id', usersController.updateUser);

// Add a new service into Services table
router.post("/all/addservice", servicesController.addServiceAPI);

// Update an existing service in Services table
router.put("/all/updateservice/:id", servicesController.updateServiceAPI);

//Fetch all services
router.get('/all/services', servicesController.fetchServiceAPI);

// Add a new service Type for the service ID selected
router.post("/all/addservicetype", serviceTypeController.addServiceTypeAPI);

// Fetch Service Type records based on Service Name
router.get("/all/getservicetype/:serviceName", serviceTypeController.getServiceTypeByServiceName);

// Fetch serviceType ID from serviceType
router.get("/all/getservicetypeid", serviceTypeController.getServiceTypeID);

// Fetch service types from service Id
router.get('/all/getservicetypes/:serviceId', serviceTypeController.fetchServiceTypes);

//Calling Chatbot API
router.post('/all/chat', chatbotController.chatHandler);

// Adding a new Service Catalog (Service Provider attached to Service Type and Service)
router.post('/all/addserviceprovider', serviceProviderController.addServiceProviderAPI);

// Fetch Records based on ServiceType ID and Price range
router.get('/all/getspsearchrecords', serviceProviderController.getRecords);

// Fetch records based on Service PRovider ID
router.get('/all/getserviceproviders/:serviceProviderId', serviceProviderController.getServiceProviderRecords);

// Update Service Provider Record 
router.put('/all/updateserviceprovider/:id', serviceProviderController.updateServiceProvider);

// Remove Service Provider Record
router.delete('/all/deleteserviceprovider/:id', serviceProviderController.deleteServiceProvider);

// Get all bookings for an user
router.get("/all/getcustbookings/:serviceProviderId", bookingsController.fetchBookingsAPI);

// Get all bookings for all users
router.get("/all/getallcustbookings/:userId", bookingsController.fetchAllBookingsAPI);

// Get all SP bookings
router.get("/all/getallspbookings/:serviceProviderId", bookingsController.fetchAllSPBookings);

// Get NExt booking Date
router.get("/all/getnextbooking/:userId", bookingsController.getNextBooking);

// Get SP Next booking Details
router.get("/all/getspnextbooking/:serviceProviderId", bookingsController.getSPNextBooking);

// Book a service 
router.post("/all/bookService", bookingsController.bookService);

// Fetch Active Bookings
router.get("/all/getActiveSPBookings/:serviceProviderId", bookingsController.getActiveBookings);

// Fetch Completed Bookings
router.get("/all/getCompletedBookings/:serviceProviderId", bookingsController.getCompletedBookings);

// Update Booking Status
router.patch('/all/updateBookingStatus/:id', bookingsController.updateBookingStatus);

module.exports = router;