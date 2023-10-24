const { Users } = require('../models');
const validator = require('validator');
const bcrypt = require('bcrypt');//package used to hash password

/*Controllers are used for function implementation*/

const userRegistration = async (req, res) => {
    const { username, password, email } = req.body;//gets the username, password, email from the json

    if (!username || !password || !email) {
        return res.status(400).json('Field(s) left empty');//Checks if the fields are empty
    }

    if (username === password) {
        return res.status(400).json('Username and password cannot be the same');//Check if the username and password are the same
    }

    if (!(validator.isEmail(email))) {
        return res.status(400).json('Invaild email');//Checks the format of the email
    }

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            email: email
        }).then(() => {
            res.json('User created successfully');
        }).catch((error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json('Email is already in use')
            }
            console.log(error)
            return res.status(500).json('Server failed')
        })

    });
};

module.exports = { userRegistration }