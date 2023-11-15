const express = require('express');
const { getProfile, addAllergy, removeAllergy, addPreference, removePreference } = require('../controllers/Profile');
const router = express.Router();

router.get('/:UserId', getProfile);
router.post('/addAllergy', addAllergy);
router.post('/removeAllergy', removeAllergy)
router.post('/addPreference', addPreference);
router.post('/removePreference', removePreference)


module.exports = router;