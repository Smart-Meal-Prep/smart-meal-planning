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

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await Users.create({ username: username, password: hashedPassword, email: email });
        res.status(200);
        return res.json('User created successfully');
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400);
            return res.json('Email is already in use');
        }
        res.status(500);
        return res.json('Server failed');
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        return res.json("Field(s) left empty")
    }

    const userExists = await Users.findOne({
        where: {
            email: email
        }
    })

    if (!userExists) {
        res.status(400);
        return res.json({ error: "User doesnt exist" })
    }

    const correctPassword = await bcrypt.compare(password, userExists.password);

    if (!correctPassword) {
        res.status(400);
        return res.json({ error: "Incorrect password" })
    }

    res.status(200);
    return res.json("Login successful");

};

module.exports = { userRegistration, userLogin };

//test email: deondraetest@
//password: dog