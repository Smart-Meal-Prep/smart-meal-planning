const { Profile, User } = require('../models');

const getProfile = async (req, res) => {
    try {
        const {UserId} = req.body;

        if (!UserId) {
            res.status(400);
            return res.json({ error: 'Error empty userid' })
        }

        const profile = await Profile.findOne({
            where: { UserId },
        });

        res.status(200);
        return res.json(profile)

    }catch(error){
        console.log("Failed to get user profile")
        res.status(400);
        return res.json({ error: 'Error retrieving user profile' })
    }
}

module.exports = {getProfile};