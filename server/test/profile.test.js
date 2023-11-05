const { json } = require('sequelize');
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

describe('On valid get profile', () => {
    it('should return status code of 200 if user profile was succesfully retrieved', async () => {
        const req = {
            body : {
                UserId: 1
            }
        }

        const user = {
            id: 1,
            username: 'John',
            password: '1234',
            email: 'john@test.com'
        }
        const profile = {
            id: 1,
            allergies: ['Peanuts'],
            preferences: ['Vegetarian'],
            UserId: 1 //same id as user from above
        }

        User.findOne.mockResolvedValue(user);
        Profile.findOne.mockResolvedValue(profile);

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(profile);

    })
    
    it('should return status code of 400 when UserId if missing', async () => {
        const req = {
            body: {}
        };

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Error empty userid'
        })
    })
    
    it('should return error and status code 400 when User.findOne or Profile.findOne throws exception', async () => {
        const req = {
            body: {
                UserId: 1
            }
        }

        Profile.findOne.mockRejectedValue(new Error('Database Error'));
        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: 'Error retrieving user profile'})
    })

})