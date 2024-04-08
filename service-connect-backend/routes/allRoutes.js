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
router.get("/all/userdetails/:email", usersController.getUserDetails);

// Fetch the user record from User table based on UserID
router.get("/all/userinfo/:id", usersController.userInfoAPI);

// Fetch all user records from Users Schema
router.get("/all/users", usersController.getAllUsers);

// Add a new service into Services table
router.post("/all/addservice", servicesController.addServiceAPI);

// Update an existing service in Services table
router.put("/all/updateservice/:id", servicesController.updateServiceAPI);

//Fetch all services
router.get('/all/services', servicesController.fetchServiceAPI);

// Add a new service Type for the service ID selected
router.post("/all/addservicetype", serviceTypeController.addServiceTypeAPI);

// Fetch Service Type records based on Service Name
router.get("/all/getservicetype", serviceTypeController.getServiceTypeByServiceName);

//Calling Chatbot API
router.post('/all/chat', chatbotController.chatHandler);

// Adding a new Service Catalog (Service Provider attached to Service Type and Service)
router.post('/all/addserviceprovider', serviceProviderController.addServiceProviderAPI);

// Get all bookings for an user
router.get("/all/getcustbookings/:userId", bookingsController.fetchBookingsAPI);

// Get all bookings for all users
router.get("/all/getallcustbookings/", bookingsController.fetchAllBookingsAPI);

module.exports = router;