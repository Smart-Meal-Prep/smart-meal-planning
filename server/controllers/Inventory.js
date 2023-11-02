const { Inventory, User } = require('../models');

const getInventory = async (req, res) => {
    /*Think it is working its just that I dont have anything in my inventory*/
    try {
        const { email } = req.session.user.email//gets the user email from the session cookie

        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            res.status(404)
            return res.json({ message: 'User not found' });
        }

        const userId = user.id

        const inventoryItems = await Inventory.findAll({
            where: { userId },
        });

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
        const { ingredient, amount } = req.body;
        const userEmail = req.session.user.email; 
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