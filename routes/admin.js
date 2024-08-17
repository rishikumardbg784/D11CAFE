const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const FoodItem = require('../models/foodItem');
const bcrypt = require('bcrypt');

// Admin login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    Admin.findOne({ username }, (err, admin) => {
        if (err || !admin) return res.status(401).send('Invalid credentials');
        admin.comparePassword(password, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).send('Invalid credentials');
            req.session.admin = admin; // Save admin session
            res.send('Login successful');
        });
    });
});

// Middleware to protect admin routes
function requireAdminAuth(req, res, next) {
    if (!req.session.admin) return res.status(403).send('Access denied');
    next();
}

// Admin Dashboard Route (Protected)
router.get('/dashboard', requireAdminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/admin-dashboard.html'));
});

// Add food item (Protected)
router.post('/add-item', requireAdminAuth, (req, res) => {
    const { name, category, available } = req.body;
    const newItem = new FoodItem({ name, category, available });
    newItem.save()
        .then(() => res.json({ message: 'Item added successfully' }))
        .catch(err => res.status(500).json({ error: 'Failed to add item' }));
});

// Admin logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout successful');
});

module.exports = router;
