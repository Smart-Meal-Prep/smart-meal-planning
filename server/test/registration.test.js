const { userRegistration } = require("../controllers/Users");
const { Users } = require('../models');
const validator = require('validator');//Import to mock isEmail
const bcrypt = require('bcrypt');//Import to mock hash

//mockers - used to mock implementation, returns, etc of a function 
jest.mock('validator')
jest.mock('bcrypt');
jest.mock('../models');

const res = {
    /*Due to the return type, we have to return the status as a json object containing the HTTPS status and the response()*/
    status: jest.fn((x) => ({
        json: jest.fn((data) => ({ status: x, data }))
    }))
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
        //Having trouble figuring out why res.status.json isnt giving the text value 'Field(s) left empty' when called and is returning undefined
    });

    it('should return status of 400 if username and password are the same', async () => {
        const req = {
            body: {
                username: "password",
                password: "password",
                email: ""
            }
        }
        await userRegistration(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        //have check for expecting the string
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
        //have check for expecting the string
    });

    it('should return status of 400 if the email is already in use', async () => {
        const req = {
            body: {
                username: "Max",
                password: "well",
                email: "powers@"
            }
        }
        validator.isEmail.mockReturnValue(true);
        bcrypt.hash.mockResolvedValue('hashedPassword');//mocks the behavior of the hash function
        Users.create.mockRejectedValue({ name: 'SequelizeUniqueConstraintError' });//mocks the behavior of the hash function

        await userRegistration(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        //have check for expecting the string
    });

});

describe('On succesful user creation', () => {
    //This one is just not working either not sure why :/
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

        await userRegistration(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
})