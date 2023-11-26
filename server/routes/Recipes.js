const express = require('express');
const { fillRecipes } = require('../controllers/Recipes');
const router = express.Router();

router.post('/fill', fillRecipes);


module.exports = router;