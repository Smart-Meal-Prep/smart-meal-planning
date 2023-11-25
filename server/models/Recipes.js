module.exports = (sequelize, DataTypes) => {
    /* Define recipe table */
    const Recipes = sequelize.define("Recipes", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [] // Set a default empty array
        },
        measurements: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: []
        },
        instructions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Recipes;
}
