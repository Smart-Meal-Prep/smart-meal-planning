const { getInventory, removeIngredient, addIngredient } = require("../controllers/inventory");
const { Inventory } = require('../models');

// Mocks
jest.mock('../models');

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

describe('On user get there inventory with a empty userid', () => {
    it('should return a status code of 400', async () => {
        const req = {
            body: {
                UserId: null
            }
        };

        await getInventory(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error empty userid' });
    });
});

describe('On user get there inventory sucessfuly', () => {
    it('should return a status code of 200 and display inventory contents', async () => {
        const req = {
            body: {
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        jest.spyOn(Inventory, 'findAll').mockResolvedValue([
            {
                "id": 2,
                "ingredient": "apple",
                "quantity": 5,
                "createdAt": "2023-11-03T04:14:01.775Z",
                "updatedAt": "2023-11-03T04:14:01.775Z",
                "UserId": Number.MAX_SAFE_INTEGER
            },
            {
                "id": 3,
                "ingredient": "pears",
                "quantity": 2,
                "createdAt": "2023-11-03T04:14:52.493Z",
                "updatedAt": "2023-11-03T04:14:52.493Z",
                "UserId": Number.MAX_SAFE_INTEGER
            }
        ]);

        await getInventory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                "id": 2,
                "ingredient": "apple",
                "quantity": 5,
                "createdAt": "2023-11-03T04:14:01.775Z",
                "updatedAt": "2023-11-03T04:14:01.775Z",
                "UserId": Number.MAX_SAFE_INTEGER
            },
            {
                "id": 3,
                "ingredient": "pears",
                "quantity": 2,
                "createdAt": "2023-11-03T04:14:52.493Z",
                "updatedAt": "2023-11-03T04:14:52.493Z",
                "UserId": Number.MAX_SAFE_INTEGER
            }
        ]);
    });
});


describe('On invaild inventory post body', () => {
    it('should return status code of 400 if input fields are left empty', async () => {
        const req = {
            body: {
                ingredient: "",
                quantity: null,
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        await addIngredient(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Field(s) left empty" });
    });

    it('should return status code of 400 if there is no userid', async () => {
        const req = {
            body: {
                ingredient: "apples",
                quantity: 45,
                UserId: null
            }
        };

        await addIngredient(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "No userid provided" });
    });

});

describe('On vaild inventory post body', () => {
    it('should return a status code of 200 and add ingredient to the users inventory', async () => {
        const req = {
            body: {
                ingredient: "eggs",
                quantity: 5,
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        jest.spyOn(Inventory, 'create').mockResolvedValue({
            "id": 2,
            "ingredient": "apple",
            "quantity": 5,
            "createdAt": "2023",
            "updatedAt": "2023",
            "UserId": Number.MAX_SAFE_INTEGER
        });

        await addIngredient(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Successfully added to inventory" });
    });
});
