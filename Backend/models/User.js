const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        lowercase: true 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        select: false
    },
    monthlyIncome: { 
        type: Number, 
        
    },
    currency: { 
        type: String, 
        default: "INR" 
    },
    budget: { 
        type: Number, 
        default: 0 
    },
    currentBalance: { 
        type: Number, 
        default: 0 
    }
}, {
    timestamps: true
});


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;