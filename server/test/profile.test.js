const { json } = require('sequelize');
const { getProfile, addAllergy } = require('../controllers/Profile');
const { Profile, User } = require('../models');

jest.mock('../models')

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

/*getProfile*/
describe('On invalid get profile', () => {
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

        jest.spyOn(Profile, 'findOne').mockRejectedValue();
        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: 'Error retrieving user profile'})
    })
})

describe('On valid get profile', () => {
    it('should return status code of 200 if user profile was succesfully retrieved', async () => {
        const req = {
            body : {
                UserId: 1
            }
        }

        const user = [{
            id: 1,
            username: 'John',
            password: '1234',
            email: 'john@test.com'
        }]
        const profile = [{
            allergies: ['Peanuts'],
            preferences: ['Vegetarian'],
            UserId: 1 //same id as user from above
        }]

        jest.spyOn(Profile, 'findOne').mockResolvedValue(profile);

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(profile);

    })
})

/*addAllergy*/
describe('On invalid allergy post', () => {
    it('should return status code of 400 if input field is left empty', async () => {
        const req = {
            body: {
                ingredient: "",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        await addAllergy(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Field(s) left empty" });
    });

    it('should return status code of 400 if there is no userid', async () => {
        const req = {
            body: {
                ingredient: "peanut",
                UserId: null
            }
        };

        await addAllergy(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "No userid provided" });
    });

    it('should return status code of 400 is user profile is not found', async () => {
        const req = {
            body: {
                ingredient: "peanut",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        jest.spyOn(Profile, 'findOne').mockResolvedValue(null);

        await addAllergy(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "User profile not found" });
    })
})

describe('On vaild allergy post body', () => {
    it('should return a status code of 200 and add allergy to the users allergy list', async () => {
        const req = {
            body: {
                id: 1,
                ingredient: "Eggs",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        const profile = {
            id: 1,
            allergies: ['Peanuts'],
            preferences: ['Vegetarian'],
            UserId: Number.MAX_SAFE_INTEGER,
            save: jest.fn().mockResolvedValue(true) // Mock the save method
        }

        jest.spyOn(Profile, 'findOne').mockResolvedValue(profile);

        await addAllergy(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Successfully added allergy" });

        expect(profile.allergies).toContain(req.body.ingredient);
        expect(profile.save).toHaveBeenCalled();
    });
});