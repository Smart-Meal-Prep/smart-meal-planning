const { getInventory, removeIngredient, addIngredient, updateAmount } = require("../controllers/Inventory");
const { Inventory } = require('../models');

// Mocks
jest.mock('../models');

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

/*getInventory*/
describe('On user get there inventory with a empty userid', () => {
    it('should return a status code of 400', async () => {
        const req = {
            params: {
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
            params: {
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

/*addIngredient*/
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

/*removeIngredient*/
describe('On invaild inventory delete request', () => {
    it('should return a status code fo 400 if fields are left empty', async () => {
        const req = {
            params: {
                id: null,
                UserId: null
            }
        };

        await removeIngredient(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Field(s) left empty" });
    });

    it('should return a status code of 400 if ingredient was not found', async () => {
        const req = {
            params: {
                id: Number.MAX_SAFE_INTEGER,
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        jest.spyOn(Inventory, 'findOne').mockResolvedValue(null);

        await removeIngredient(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Error ingredient does not exist" });
    });

    it('should return a status code of 400 if associated user is not the same', async () => {
        const req = {
            params: {
                id: Number.MAX_SAFE_INTEGER,
                UserId: Number.MAX_SAFE_INTEGER
            }
        };

        jest.spyOn(Inventory, 'findOne').mockResolvedValue({
            id: Number.MAX_SAFE_INTEGER,
            UserId: 1
        });

        await removeIngredient(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Error unauthorized user" });
    });

});

describe('On vaild inventory delete request', () => {
    it('should return a status code of 200 and delete item from user inventory', async () => {
        const req = {
            params: {
                id: Number.MAX_SAFE_INTEGER,
                UserId: Number.MAX_SAFE_INTEGER
            }
        };
        /*Include a ingredient to be mocked and destoryed*/
        const ingredientMock = {
            destroy: jest.fn().mockResolvedValue(null),
            id: Number.MAX_SAFE_INTEGER,
            UserId: Number.MAX_SAFE_INTEGER
        };

        jest.spyOn(Inventory, 'findOne').mockResolvedValue(ingredientMock);

        await removeIngredient(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: "Ingredient deleted" });
    });
});

/*updateAmount*/
describe('On invaild inventory update amount request', () => {
    it('should return a status code fo 400 if fields are left empty', async () => {
        const req = {
            body: {
                id: null,
                UserId: null,
                quantity: 100
            }
        };

        await updateAmount(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Field(s) left empty" });
    });

    it('should return a status code of 400 if ingredient was not found', async () => {
        const req = {
            body: {
                id: Number.MAX_SAFE_INTEGER,
                UserId: Number.MAX_SAFE_INTEGER,
                quantity: 100
            }
        };

        jest.spyOn(Inventory, 'findOne').mockResolvedValue(null);

        await updateAmount(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Error ingredient does not exist" });
    });

    it('should return a status code of 400 if associated user is not the same', async () => {
        const req = {
            body: {
                id: Number.MAX_SAFE_INTEGER,
                UserId: Number.MAX_SAFE_INTEGER,
                quantity: 100
            }
        };

        jest.spyOn(Inventory, 'findOne').mockResolvedValue({
            id: Number.MAX_SAFE_INTEGER,
            UserId: 1
        });

        await updateAmount(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Error unauthorized user" });
    });

});

describe('On vaild inventory update request', () => {
    it('should return a status code of 200 and update ingredient amount', async () => {
        const req = {
            body: {
                id: Number.MAX_SAFE_INTEGER,
                UserId: Number.MAX_SAFE_INTEGER,
                quantity: 100
            }
        };

        const ingredientMock = {
            id: Number.MAX_SAFE_INTEGER,
            UserId: Number.MAX_SAFE_INTEGER,
            quantity: 10
        };

        jest.spyOn(Inventory, 'findOne').mockResolvedValue(ingredientMock);

        await updateAmount(req, res);
        expect(ingredientMock.quantity).toEqual(100);//Quantity updated based on input
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: "Ingredient deleted" });
    });
});