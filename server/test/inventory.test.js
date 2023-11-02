const { getInventory, removeIngredient, addIngredient } = require("../controllers/inventory");
const { Inventory } = require('../models');

// Mocks
jest.mock('../models');

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

describe('On invaild user enters inventory', () => {
    it('should return a status code of 401', async () => {
        //mock invaild user
    })
});

describe('On user enter inventory', () => {
    it('should return all of the ingredient in the users inventory', async () => {
        //mock searching fo
    })
});