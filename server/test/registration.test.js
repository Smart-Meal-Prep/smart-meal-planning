const { userRegistration } = require("../controllers/Users");
const { Users, Profile } = require('../models');
const validator = require('validator');//Import to mock isEmail
const bcrypt = require('bcrypt');//Import to mock hash

//mockers - used to mock implementation, returns, etc of a function 
jest.mock('validator')
jest.mock('bcrypt');
jest.mock('../models');

const res = {
    /*Due to the return type, we have to return the status as a json object containing the HTTPS status and the response()*/
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

describe('On user registration with invaild operands', () => {
    it('should return status of 400 if fields are empty', async () => {
        const req = {
            body: {
                username: "",
                password: "",
                email: ""
            }
        }
        await userRegistration(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith('Field(s) left empty')
    });

    it('should return status of 400 if username and password are the same', async () => {
        const req = {
            body: {
                username: "password",
                password: "password",
                email: "asd"
            }
        }
        await userRegistration(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith('Username and password cannot be the same')
    });

    it('should return status of 400 if the email is invaild format', async () => {
        const req = {
            body: {
                username: "Max",
                password: "well",
                email: "powers@"
            }
        }

        validator.isEmail.mockReturnValue(false);

        await userRegistration(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith('Invaild email')
    });

    it('should return status of 400 if the email is already in use', async () => {
        const req = {
            body: {
                username: "Max",
                password: "well",
                email: "powers@gmail.com"
            }
        }
        validator.isEmail.mockReturnValue(true);
        bcrypt.hash.mockResolvedValue('hashedPassword');//mocks the behavior of the hash function
        Users.create.mockRejectedValue({ name: 'SequelizeUniqueConstraintError' });//mocks the behavior of the hash function

        await userRegistration(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith('Email is already in use')
    });

});

describe('On succesful user creation', () => {
    it('should return status of 200 if user was created successfully', async () => {
        const req = {
            body: {
                username: "Max",
                password: "well",
                email: "powers@gmail.com"
            }
        }
        validator.isEmail.mockReturnValue(true);
        bcrypt.hash.mockResolvedValue('hashedPassword');//mocks the behavior of the hash function
        Users.create.mockResolvedValue();

        const user = await userRegistration(req, res);
        await Profile.create.mockResolvedValue({ UserId: user.id, allergies: [], preferences: [] });
        await userRegistration(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});