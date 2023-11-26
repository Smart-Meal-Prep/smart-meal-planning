const { fillRecipes } = require('../controllers/Recipes');
const { Recipes } = require('../models');

jest.mock('../models')

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

global.fetch = jest.fn();

/*test fillRecipes*/
describe('On failure to fill recipes', () => {
    it('should handle error when failing to fetch', async () => {
        global.fetch = jest.fn(() => Promise.reject('Fetch error'));

        const req = {};

        await fillRecipes(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error adding recipes' });
    });
})

describe('On successful fill recipes', () => {
    it('should fill recipes', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ meals: [{ strMeal: 'Test Meal' }] }),
            })
        );

        const req = {};
        const fakeMeal = {
            name: 'Test Meal',
            ingredients: [],
            measurements: [],
            instructions: "Instructions",
            thumbnail: 'Thumbnail',
            category: 'Category',
            area: 'Area'
        }

        jest.spyOn(Recipes, 'findOne').mockResolvedValue(null); // Mock not finding a duplicate meal
        jest.spyOn(Recipes, 'create').mockResolvedValue(fakeMeal); // Mock creating meal

        await fillRecipes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Successfully filled table');
    });

    it('should avoid creating duplicate recipes', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ meals: [{ strMeal: 'Test Meal' }] }),
            })
        );

        const req = {};
        const fakeMeal = {
            name: 'Test Meal',
            ingredients: [],
            measurements: [],
            instructions: "Instructions",
            thumbnail: 'Thumbnail',
            category: 'Category',
            area: 'Area'
        }

        jest.spyOn(Recipes, 'findOne').mockResolvedValue(fakeMeal); // Mock finding a duplicate meal

        await fillRecipes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Successfully filled table');
    });
})