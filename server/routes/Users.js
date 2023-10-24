const express = require('express');
const router = express.Router();
const { userRegistration } = require('../controllers/Users');

router.post('/registration', userRegistration);

module.exports = router;//export the REST to the index.js file