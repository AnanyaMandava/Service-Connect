const bcrypt = require("bcrypt");
const signUpInfo = require('../Models/userSchema');
const SALT_WORK_FACTOR = 10;

exports.signUpAPI = async (req,res) => {
    try {
        const { email, mobile, fullname, sex, role, password, address, city, state, zipcode } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);

        const newRecord = new signUpInfo({
            email,
            mobile,
            fullname,
            sex,
            role,
            password: hashedPassword, // Use the hashed password
            address,
            city,
            state,
            zipcode
        });

        await newRecord.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
}

// Login validation for the user who's email and password are passed as inputs
exports.logInApi = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if both email and password are provided
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email in the database
        const user = await signUpInfo.findOne({ email });

        // If user is not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the plaintext password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords match, login is successful
        if (isPasswordValid && user.role === role) {
            return res.status(200).json({ message: "Login successful", userType: user.role, userId: user._id });
        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


exports.userInfoAPI = async (req,res) => {
    try {
        // Extract user ID from request parameters
        const userId = req.body.id;

        console.log(req.body.id);

        // Find the user by ID in the database
        const user = await signUpInfo.findById(userId);

        console.log("User is:", user);

        // Check if user is found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user data in the response
        res.status(200).json({ user });
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error fetching user record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Modify your existing code to include a new endpoint for fetching user details
exports.getUserDetails = async (req, res) => {
    try {
        const email = req.params.email;

        const user = await signUpInfo.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



// Fetch all users
exports.getAllUsers = async (req, res) => {

    try {
        // Query all services from the Service table
        const users = await signUpInfo.find();

        // Send the retrieved services as a response
        res.status(200).json(users);
    } catch (error) {
        // Handle errors
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}