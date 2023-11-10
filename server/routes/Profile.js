const express = require('express');
const { getProfile, addAllergy } = require('../controllers/Profile');
const router = express.Router();

router.get('/', getProfile);
router.post('/addAllergy', addAllergy);

module.exports = router;