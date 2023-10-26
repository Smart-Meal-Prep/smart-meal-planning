const express = require('express');
const router = express.Router();
const { userRegistration, userLogin } = require('../controllers/Users');

router.post('/registration', userRegistration);
router.post('/login', userLogin);

module.exports = router;//export the REST to the index.js file