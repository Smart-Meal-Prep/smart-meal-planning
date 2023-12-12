const { Users, Profile } = require('../models');
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
        const user = await Users.create({ username: username, password: hashedPassword, email: email });
        await Profile.create({ allergies: [], preferences: [], UserId: user.id });
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
        return res.json("Field(s) left empty");
    }

    const userExists = await Users.findOne({
        where: {
            email: email
        }
    });

    if (!userExists) {
        res.status(400);
        return res.json({ error: "User doesnt exist" });
    }

    const correctPassword = await bcrypt.compare(password, userExists.password);

    if (!correctPassword) {
        res.status(400);
        return res.json({ error: "Incorrect password" });
    }

    //Add authentication
    req.session.user = userExists;//adds the user information to the session cookie
    req.session.authorized = true;//sets the user as authorized

    res.status(200);
    res.json({
        status: "Login successful",
        username: userExists.username,
        email: userExists.email,
        id: userExists.id
    });
};

const Logout = async (req, res) => {
    /*When called, destroys the user session*/
    try {
        await req.session.destroy();
        res.status(200);
        return res.json({ message: "Logout successful" });
    }
    catch (error) {
        console.log('Failed to destroy session with error:', error);
        res.status(400);
        return res.json({ error: "Failed to log out" });
    }
};

const userHasLogin = async (req, res) => {
    if (req.session.authorized) {
        res.status(200);
        return res.json({
            username: req.session.user.username,
            email: req.session.user.email,
            id: req.session.user.id
        });
    }
    else {
        res.status(400);
        return res.json({ unauthorized: "User has not logged in" })
    }
}

module.exports = { userRegistration, userLogin, Logout, userHasLogin };