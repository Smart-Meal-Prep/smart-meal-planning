module.exports = (sequelize, DataTypes) => {
    /*Define user profile table*/
    const Profile = sequelize.define("Profile", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alergies: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
        //may add more once we figure out our APIs
    });

    return Profile;
}