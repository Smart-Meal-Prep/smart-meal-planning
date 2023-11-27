const express = require('express');
const { fillRecipes, getRecipeSuggestions } = require('../controllers/Recipes');
const router = express.Router();

router.get('/getRecipes/:UserId', getRecipeSuggestions);
router.post('/fill', fillRecipes);


module.exports = router;