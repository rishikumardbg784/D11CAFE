// models/admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password before saving
adminSchema.pre('save', function (next) {
    const admin = this;
    if (!admin.isModified('password')) return next();
    bcrypt.hash(admin.password, 10, (err, hash) => {
        if (err) return next(err);
        admin.password = hash;
        next();
    });
});

// Method to check password
adminSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, callback);
};

module.exports = mongoose.model('Admin', adminSchema);
