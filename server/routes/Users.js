const express = require('express');
const router = express.Router();
const { userRegistration, userLogin, Logout, userHasLogin } = require('../controllers/Users');

router.post('/registration', userRegistration);
router.post('/login', userLogin);
router.get('/login', userHasLogin);
router.get('/logout', Logout);

module.exports = router;//export the REST to the index.js file