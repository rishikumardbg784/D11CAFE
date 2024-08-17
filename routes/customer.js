const express = require('express');
const router = express.Router();
const FoodItem = require('/models/foodItem');

router.get('/menu', (req, res) => {
    const category = req.query.category;
    FoodItem.find({ category }, (err, items) => {
        if (err) return res.status(500).send('Error');
        res.json(items);
    });
});

module.exports = router;
