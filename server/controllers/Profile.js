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

const addAllergy = async (req, res) => {
    try {
        const {UserId, ingredient} = req.body;
        if (!ingredient) {
            res.status(400);
            return res.json({ error: "Field(s) left empty" });
        }

        if (!UserId) {
            res.status(400);
            return res.json({ error: "No userid provided" });
        }

        const profile = await Profile.findOne({
            where: {UserId : UserId},
            include: User
        })

        if(!profile){
            res.status(400);
            return res.json({ error: "User profile not found" });
        }
        
        profile.allergies = [...profile.allergies, ingredient];
        await profile.save();

        res.status(200);
        return res.json({ message: "Successfully added allergy" })

    }catch(error){
        console.log('Failed to add allergy, error:', error);
        res.status(400);
        return res.json({ error: 'Error adding allergy' })
    }
}

module.exports = {
    getProfile,
    addAllergy
};