module.exports = (sequelize, DataTypes) => {
    /* Define user profile table */
    const Profile = sequelize.define("Profile", {
        allergies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [] // Set a default empty array
        },
        preferences: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [] // Set a default empty array
        }
    });

    Profile.associate = (models) => {
        // Define a one-to-one association between Users and Profile
        Profile.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'cascade'
        });
    };

    return Profile;
}
