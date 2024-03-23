const express = require("express");
const router = express.Router();

const usersController = require("../controller/usersController");
const servicesController = require("../controller/servicesController");
const chatbotController = require("../controller/chatbotController");

router.get("/", function(req,res){
    return res.status(200).json("Successfully Loaded");
});

//Login Authentication API

// Signup a new user into users table
router.post("/all/signup", usersController.signUpAPI);

// Add a new service into Services table
router.post("/all/addservice", servicesController.addServiceAPI);

// Update an existing service in Services table
router.put("/all/updateservice/:id", servicesController.updateServiceAPI);

// Fetch the user record from User table based on UserID
router.get("/all/userinfo/:id", usersController.userInfoAPI);

//Fetch all services
router.get('/all/services', servicesController.fetchServiceAPI);

//Calling Chatbot API
router.post('/chat', chatbotController.chatHandler);

module.exports = router;