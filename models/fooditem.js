const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: String,
    category: String,
    available: Boolean
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
