// Mongoose schemas
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: String, default: 0},
    isAccountVerified: { type: Boolean, default: false},
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 }
})

const User =  mongoose.model.User || mongoose.model('User', userSchema);

module.exports = User;