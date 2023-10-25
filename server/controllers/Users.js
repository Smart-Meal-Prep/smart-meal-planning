const { Users } = require('../models');
const validator = require('validator');
const bcrypt = require('bcrypt');//package used to hash password

/*Controllers are used for function implementation*/

const userRegistration = async (req, res) => {
    const { username, password, email } = req.body;//gets the username, password, email from the json

    if (!username || !password || !email) {
        //return res.status(400).json('Field(s) left empty');//Checks if the fields are empty
        res.status(400);
        return res.json('Field(s) left empty');
    }

    if (username === password) {
        res.status(400);
        return res.json('Username and password cannot be the same');//Check if the username and password are the same
    }

    if (!(validator.isEmail(email))) {
        res.status(400);
        return res.json('Invaild email');//Checks the format of the email
    }

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            email: email
        }).then(() => {
            return res.status(200).json('User created successfully');
        }).catch((error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400)
                return res.json('Email is already in use')
            }
            console.log(error)
            res.status(500)
            return res.json('Server failed')
        })
    });
};

module.exports = { userRegistration }