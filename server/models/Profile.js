module.exports = (sequelize, DataTypes) => {
    /* Define user profile table */
    const Profile = sequelize.define("Profile", {
        allergies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: []
        },
        preferences: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [] 
        },
        favoriteMeals: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [] 
        }
    });

    Profile.associate = (models) => {
        Profile.belongsTo(models.Users, {
            foreignKey: 'UserId',
            onDelete: 'cascade'
        });
    };

    return Profile;
}
