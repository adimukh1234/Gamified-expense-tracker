const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "basic_avatar_url" },
    monthlyIncome: { type: Number, required: true },
    currency: { type: String, default: "INR" },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);