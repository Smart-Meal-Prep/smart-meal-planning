const { userLogin } = require("../controllers/Users");
const { Users } = require('../models');

//Mockers
jest.mock('../models');

const res = {
    /*Due to the return type, we have to return the status as a json object containing the HTTPS status and the response()*/
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

describe('On invaild user', () => {
    it('should return a status code of 400 if fields are empty', async () => {
        const req = {
            body: {
                username: "",
                password: "",
                email: "powers@gmail.com"
            }
        };

        await userLogin(res, req);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalledWith("Field(s) left empty");
    });

    it('should return a status code of 400 if user does not exist', async () => {
        const req = {
            body: {
                username: "Max",
                password: "well",
                email: "powers@gmail.com"
            }
        };

        Users.findOne().mockRejectedValue(null);//If a user is not found it will return null
        await userLogin(res, req);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalledWith("User not found");
    });
});

describe('On successful user', () => {
    it('should return a status code of 200 if user was found and signed in', async () => {
        const req = {
            body: {
                username: "Max",
                password: "well",
                email: "powers@gmail.com"
            }
        };

        Users.findOne().mockRejectedValue(true);//If a user is not found it will return null
        await userLogin(res, req);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalledWith("Login successful");
    });
});