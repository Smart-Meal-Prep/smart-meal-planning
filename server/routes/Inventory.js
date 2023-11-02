const express = require('express');
const { getInventory, addIngredient, removeIngredient } = require('../controllers/inventory');
const router = express.Router();

router.get('/:UserId', getInventory);
router.post('/', addIngredient);
router.delete('/', removeIngredient);

module.exports = router;//export the REST to the index.js file