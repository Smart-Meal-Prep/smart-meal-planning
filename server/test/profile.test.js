const { json } = require('sequelize');
const { getProfile, addAllergy, removeAllergy, addPreference, removePreference, addFavoriteMeal, removeFavoriteMeal } = require('../controllers/Profile');
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
            params: {}
        };

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Error empty userid'
        })
    })
    
    it('should return error and status code 400 when User.findOne or Profile.findOne throws exception', async () => {
        const req = {
            params: {
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
            params : {
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
describe('On invalid add allergy post', () => {
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

describe('On vaild add allergy post body', () => {
    it('should return a status code of 200 and add allergy to the users allergy list', async () => {
        const req = {
            body: {
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

/**removeAllergy */
describe('On invalid remove allergy post', () => {
    it('should return status code of 400 if input field is left empty', async () => {
        const req = {
            body: {
                ingredient: "",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        await removeAllergy(req, res);
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

        await removeAllergy(req, res);
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

        await removeAllergy(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "User profile not found" });
    })

    it('should return a status code of 400 if user tries to remove an allergy thats not in the allergies list', async () => {
        const req = {
            body: {
                ingredient: 'Apples',
                UserId: Number.MAX_SAFE_INTEGER
            }
        }

        const profile = {
            id: 1,
            allergies: ['Peanuts', 'Eggs'],
            preferences: ['Vegetarian'],
            UserId: Number.MAX_SAFE_INTEGER,
        }

        jest.spyOn(Profile, 'findOne').mockResolvedValue(profile);

        await removeAllergy(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Allergy not found" });
    })
})

describe('On vaild remove allergy post body', () => {
    it('should return a status code of 200 and remove allergy from the users allergy list', async () => {
        const req = {
            body: {
                ingredient: "Eggs",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        const profile = {
            id: 1,
            allergies: ['Peanuts', 'Eggs'],
            preferences: ['Vegetarian'],
            UserId: Number.MAX_SAFE_INTEGER,
            save: jest.fn().mockResolvedValue(true) // Mock the save method
        }

        jest.spyOn(Profile, 'findOne').mockResolvedValue(profile);

        await removeAllergy(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Successfully removed allergy" });

        expect(profile.allergies).not.toContain(req.body.ingredient);
        expect(profile.save).toHaveBeenCalled();
    });
});

/*addPreference*/
describe('On invalid add preference post', () => {
    it('should return status code of 400 if input field is left empty', async () => {
        const req = {
            body: {
                preference: "",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        await addPreference(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Field(s) left empty" });
    });

    it('should return status code of 400 if there is no userid', async () => {
        const req = {
            body: {
                preference: "Vegan",
                UserId: null
            }
        };

        await addPreference(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "No userid provided" });
    });

    it('should return status code of 400 is user profile is not found', async () => {
        const req = {
            body: {
                preference: "Vegan",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        jest.spyOn(Profile, 'findOne').mockResolvedValue(null);

        await addPreference(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "User profile not found" });
    })
})

describe('On vaild add preference post body', () => {
    it('should return a status code of 200 and add preference to the users preference list', async () => {
        const req = {
            body: {
                preference: "Vegan",
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

        await addPreference(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Successfully added allergy" });

        expect(profile.preferences).toContain(req.body.preference);
        expect(profile.save).toHaveBeenCalled();
    });
});

/**removePreference */
describe('On invalid remove preference post', () => {
    it('should return status code of 400 if input field is left empty', async () => {
        const req = {
            body: {
                preference: "",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        await removePreference(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Field(s) left empty" });
    });

    it('should return status code of 400 if there is no userid', async () => {
        const req = {
            body: {
                preference: "Vegan",
                UserId: null
            }
        };

        await removePreference(req, res);
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

        await removePreference(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "User profile not found" });
    })

    it('should return a status code of 400 if user tries to remove a preference thats not in the preferences list', async () => {
        const req = {
            body: {
                preference: 'Vegan',
                UserId: Number.MAX_SAFE_INTEGER
            }
        }

        const profile = {
            id: 1,
            allergies: ['Peanuts'],
            preferences: ['Vegetarian'],
            UserId: Number.MAX_SAFE_INTEGER,
        }

        jest.spyOn(Profile, 'findOne').mockResolvedValue(profile);

        await removePreference(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Preference not found" });
    })
})

describe('On vaild remove preference post body', () => {
    it('should return a status code of 200 and remove preference from the users preferences list', async () => {
        const req = {
            body: {
                preference: "Vegan",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        const profile = {
            id: 1,
            allergies: ['Peanuts'],
            preferences: ['Vegetarian', 'Vegan'],
            UserId: Number.MAX_SAFE_INTEGER,
            save: jest.fn().mockResolvedValue(true) // Mock the save method
        }

        jest.spyOn(Profile, 'findOne').mockResolvedValue(profile);

        await removePreference(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Successfully removed preference" });

        expect(profile.preferences).not.toContain(req.body.preference);
        expect(profile.save).toHaveBeenCalled();
    });
});

/*addFavoriteMeal*/
describe('On invalid add meal post', () => {
    it('should return status code of 400 if input field is left empty', async () => {
        const req = {
            body: {
                meal: "",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        await addFavoriteMeal(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Field(s) left empty" });
    });

    it('should return status code of 400 if there is no userid', async () => {
        const req = {
            body: {
                meal: "Chicken Alfredo",
                UserId: null
            }
        };

        await addFavoriteMeal(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "No userid provided" });
    });

    it('should return status code of 400 is user profile is not found', async () => {
        const req = {
            body: {
                meal: "Chicke Alfredo",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        jest.spyOn(Profile, 'findOne').mockResolvedValue(null);

        await addFavoriteMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "User profile not found" });
    })
})

describe('On vaild add meal post body', () => {
    it('should return a status code of 200 and add meal to the users favorite meal list', async () => {
        const req = {
            body: {
                meal: "Chicken Alfredo",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        const profile = {
            id: 1,
            allergies: ['Peanuts'],
            preferences: ['Vegetarian'],
            favoriteMeals: ['Sushi'],
            UserId: Number.MAX_SAFE_INTEGER,
            save: jest.fn().mockResolvedValue(true) // Mock the save method
        }

        jest.spyOn(Profile, 'findOne').mockResolvedValue(profile);

        await addFavoriteMeal(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Successfully added meal" });

        expect(profile.favoriteMeals).toContain(req.body.meal);
        expect(profile.save).toHaveBeenCalled();
    });
});

/**removeFavoriteMeal */
describe('On invalid remove meal post', () => {
    it('should return status code of 400 if input field is left empty', async () => {
        const req = {
            body: {
                meal: "",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        await removeFavoriteMeal(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Field(s) left empty" });
    });

    it('should return status code of 400 if there is no userid', async () => {
        const req = {
            body: {
                meal: "Chicken Alfredo",
                UserId: null
            }
        };

        await removeFavoriteMeal(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "No userid provided" });
    });

    it('should return status code of 400 is user profile is not found', async () => {
        const req = {
            body: {
                meal: "Chicken Alfredo",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        jest.spyOn(Profile, 'findOne').mockResolvedValue(null);

        await removeFavoriteMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "User profile not found" });
    })

    it('should return a status code of 400 if user tries to remove a meal thats not in the favorite meal list', async () => {
        const req = {
            body: {
                meal: 'Chicken Alfredo',
                UserId: Number.MAX_SAFE_INTEGER
            }
        }

        const profile = {
            id: 1,
            allergies: ['Peanuts'],
            preferences: ['Vegetarian'],
            favoriteMeals: ['Sushi'],
            UserId: Number.MAX_SAFE_INTEGER,
        }

        jest.spyOn(Profile, 'findOne').mockResolvedValue(profile);

        await removeFavoriteMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Meal not found" });
    })
})

describe('On vaild remove meal post body', () => {
    it('should return a status code of 200 and remove meal from the users favorite meal list', async () => {
        const req = {
            body: {
                meal: "Chicken Alfredo",
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        const profile = {
            id: 1,
            allergies: ['Peanuts'],
            preferences: ['Vegetarian'],
            favoriteMeals: ['Sushi', 'Chicken Alfredo'],
            UserId: Number.MAX_SAFE_INTEGER,
            save: jest.fn().mockResolvedValue(true) // Mock the save method
        }

        jest.spyOn(Profile, 'findOne').mockResolvedValue(profile);

        await removeFavoriteMeal(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Successfully removed meal" });

        expect(profile.favoriteMeals).not.toContain(req.body.meal);
        expect(profile.save).toHaveBeenCalled();
    });
});