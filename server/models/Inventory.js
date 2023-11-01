module.exports = (sequelize, DataTypes) => {
    /*Define Inventory table*/
    const Inventory = sequelize.define("Inventory", {
        ingredient: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Inventory
}