const express = require('express');
const { getProfile } = require('../controllers/Profile');
const router = express.Router();

router.get('/', getProfile);

module.exports = router;