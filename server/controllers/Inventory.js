const { Inventory, User } = require('../models');

const getInventory = async (req, res) => {
    try {
        const { UserId } = req.body;

        if (!UserId) {
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
    try {
        const { id, UserId } = req.body;

        if (!id || !UserId) {
            res.status(400);
            return res.json({ error: "Field(s) left empty" })
        }

        const ingredient = await Inventory.findOne({
            where: { id: id },
            include: User//retrieves the User model to check if the user whose trying to delete the item is the same as the user who owns the item.
            //include is used to specify which associated models should be retrieved along with the main model you are querying
        });

        if (!ingredient) {
            res.status(400);
            return res.json({ error: "Error ingredient does not exist" });
        }

        if (ingredient.UserId != UserId) {
            res.status(401);
            return res.json({ error: "Error unauthorized user" });
        }

        await ingredient.destroy();
        res.status(200);
        return res.json({ success: "Ingredient deleted" })
    }
    catch (error) {
        console.log(error);
        res.status(500);
        return res.json({ error: "Error while deleting ingredient" })
    }
};

module.exports = {
    getInventory,
    addIngredient,
    removeIngredient
};