const express = require('express');
const { getProfile, addAllergy, removeAllergy } = require('../controllers/Profile');
const router = express.Router();

router.get('/', getProfile);
router.post('/addAllergy', addAllergy);
router.post('/removeAllergy', removeAllergy)

module.exports = router;