module.exports = (sequelize, DataTypes) => {
    /*Define users table*/
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    Users.associate = (models) => {
        Users.hasOne(models.Inventory, {
            onDelete: 'cascade'
        });
        Users.hasOne(models.Profile, {
            onDelete: 'cascade'
        })
    };

    return Users
}