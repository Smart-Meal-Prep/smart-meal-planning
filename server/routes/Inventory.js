const express = require('express');
const { getInventory, addIngredient, removeIngredient, updateAmount } = require('../controllers/Inventory.js');
const router = express.Router();

router.get('/:UserId', getInventory);
router.post('/', addIngredient);
router.post('/update/amount', updateAmount);
router.delete('/:ingredient/:UserId', removeIngredient);

module.exports = router;//export the REST to the index.js file