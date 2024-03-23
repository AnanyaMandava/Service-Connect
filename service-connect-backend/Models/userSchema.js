const mongoose = require('mongoose');

// Regular expression for email validation
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// Regular expression for US mobile number validation (e.g., (123) 456-7890)
const mobileRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
// Regular expression for zip code validation (5 digits)
const zipCodeRegex = /^\d{5}$/;

// Enum for all U.S. states (abbreviated for brevity; extend as needed)
const statesEnum = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const signUpSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: emailRegex
    },
    mobile: { 
        type: String, 
        default: "(000) 000-0000", // Default format; consider UI logic for entering the actual number
        match: mobileRegex
    },
    fullname: { type: String, required: true }, // Assuming full name is required
    sex: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], 
        required: true // Assuming sex is required
    },
    role: { 
        type: String, 
        required: true, 
        enum: ['CUST', 'SP'] 
    },
    password: { type: String, required: true },
    address: { type: String, required: true }, // Consider more complex validation or API verification for real-world scenarios
    city: { type: String, required: true },
    state: { 
        type: String, 
        required: true, 
        enum: statesEnum 
    },
    zipcode: { 
        type: String, 
        required: true,
        match: zipCodeRegex
    }
}, { timestamps: true });

const user = mongoose.model('user', signUpSchema);

module.exports = user;
