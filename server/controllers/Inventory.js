const { Inventory } = require('../models');

const getInventory = async (req, res) => {
    try {
        const { UserId } = req.body;

        if(!UserId){
            res.status(400);
            return res.json({ error: 'Error empty userid' })
        }

        const inventoryItems = await Inventory.findAll({
            where: { UserId },
        });

        res.status(200);
        return res.json(inventoryItems);
    }
    catch (error) {
        console.log("Failed to get inventory:", error)
        res.status(400);
        return res.json({ error: 'Error retrieving inventory' })
    }
};

const addIngredient = async (req, res) => {
    try {
        const { ingredient, quantity, UserId } = req.body;

        if (!ingredient || !quantity) {
            res.status(400);
            return res.json({ error: "Field(s) left empty" });
        }

        if (!UserId) {
            res.status(400);
            return res.json({ error: "No userid provided" });
        }

        await Inventory.create({
            ingredient,
            quantity,
            UserId
        });

        res.status(200);
        return res.json({ message: "Successfully added to inventory" })
    }
    catch (error) {
        console.log('Failed to add ingredient, error:', error);
        res.status(400);
        return res.json({ error: 'Error adding ingredient' })
    }
};

const removeIngredient = async (req, res) => {
};

module.exports = {
    getInventory,
    addIngredient,
    removeIngredient
};