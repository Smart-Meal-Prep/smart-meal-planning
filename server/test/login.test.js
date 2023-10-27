const { userLogin } = require("../controllers/Users");
const { Users } = require('../models');
const bcrypt = require('bcrypt');

// Mocks
jest.mock('../models');
jest.mock('bcrypt');

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

describe('On invalid user', () => {
    it('should return a status code of 400 if fields are empty', async () => {
        const req = {
            body: {
                email: "",
                password: ""
            }
        };

        await userLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("Field(s) left empty");
    });

    it('should return a status code of 400 if user does not exist', async () => {
        const req = {
            body: {
                email: "powers@gmail.com",
                password: "well"
            }
        };

        // Mock the Users.findOne function to return null, indicating user not found
        jest.spyOn(Users, 'findOne').mockResolvedValue(null);

        await userLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "User doesnt exist" });
    });
});

describe('On successful user', () => {
    it('should return a status code of 200 if user was found and signed in', async () => {
        const req = {
            body: {
                email: "powers@gmail.com",
                password: "well"
            }
        };

        // Mock the Users.findOne function to return a user object
        jest.spyOn(Users, 'findOne').mockResolvedValue({ email: "powers@gmail.com", password: "hashedPassword" });

        // Mock the bcrypt.compare function to return true, indicating correct password
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

        await userLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Login successful");
    });
});

//Have a password to see if the password matchs up for the user