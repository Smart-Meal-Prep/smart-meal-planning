const express = require('express');
const { getProfile, addAllergy, removeAllergy, addPreference, removePreference, addFavoriteMeal, removeFavoriteMeal } = require('../controllers/Profile');
const router = express.Router();

router.get('/:UserId', getProfile);
router.post('/addAllergy', addAllergy);
router.post('/removeAllergy', removeAllergy)
router.post('/addPreference', addPreference);
router.post('/removePreference', removePreference);
router.post('/addFavoriteMeal', addFavoriteMeal);
router.post('/removeFavoriteMeal', removeFavoriteMeal);


module.exports = router;