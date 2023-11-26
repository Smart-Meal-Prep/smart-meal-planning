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
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [0, 6000]
            }
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        area: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Recipes;
}
