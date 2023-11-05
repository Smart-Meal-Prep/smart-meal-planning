const { getProfile } = require('../controllers/Profile');
const { Profile, User } = require('../models');

jest.mock('../models', () => {
    const mockProfile = {
        findOne: jest.fn(),
    };
    const mockUser = {
        findOne: jest.fn(),
    };
    return {
      Profile: mockProfile,
      User: mockUser,
    };    
});

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

describe('getProfile', () => {
    it("should return user profile on valid userid", async () => {
        const req = {
            body : {
                UserId: 1
            }
        }

        const user = {
            id: 1,
            username: "John",
            password: "1234",
            email: "john@test.com"
        }
        const profile = {
            id: 1,
            allergies: ["Peanuts"],
            preferences: ["Vegetarian"],
            UserId: 1 //same id as user from above
        }

        User.findOne.mockResolvedValue(user);
        Profile.findOne.mockResolvedValue(profile);

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(profile);

    })
})