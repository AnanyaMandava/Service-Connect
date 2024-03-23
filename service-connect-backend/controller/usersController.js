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
