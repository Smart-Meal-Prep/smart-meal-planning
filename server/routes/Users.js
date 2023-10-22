const express = require('express');
const router = express.Router();
const { Users } = require('../models');
//const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');//package used to hash password


router.post('/registration', async (req, res) => {
    const { username, password, email } = req.body;//gets the username, password, email from the json

    if (!username || !password || !email) {
        return res.status(400).json('field(s) left empty');//Checks if the fields are empty
    }

//    if(!(validator.isEmail(email))){
//        return res.status(400).json('invaild email format');//Checks the format of the email
//    }

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            email: email
        }).then(() => {
            res.json('User created successfully');
        }).catch((error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json('email already in use')
            }
            console.log(error)
            return res.status(500).json('server failed')
        })

    });
});

module.exports = router;//export the REST to the index.js file