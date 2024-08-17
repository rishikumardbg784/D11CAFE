const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cafeDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'cafe-secret', resave: false, saveUninitialized: true }));
app.use(express.static('public'));

// Routes
app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/customer'));

// Serving frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/menu.html'));
});

// Start Server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
