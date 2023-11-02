const { Inventory, User } = require('../models');

const getInventory = async (req, res) => {
    /*Think it is working its just that I dont have anything in my inventory*/
    try {
        const { userId } = req.session.user.id//gets the user email from the session cookie

        if (!req.session.user.authorized) {
            res.status(401)
            return res.json({ message: 'User is unauthorized' });
        }

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
        const { ingredient, quantity } = req.body;
        //console.log("Entered addIngreident with following user", req.session.user)
        if (!ingredient || !quantity) {
            res.status(400);
            return res.json({ message: "Field(s) left empty" });
        }
        console.log(req.session.user)
        if (!req.session.user.authorized) {
            /*Authorized will be set to true on succesful cookie creation on login*/
            res.status(401);
            return res.json({ message: "User is unauthorized" });
        }

        const userId = req.session.user.id;

        await Inventory.create({
            ingredient,
            quantity,
            userId
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