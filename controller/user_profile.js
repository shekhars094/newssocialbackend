const User = require("../models/user");
// User data Extracting from database and attaching into the req object

const getUserById = async (req, res, next, userId) => {
    try {
        const profileData = await User.findOne({ _id: userId });
        req.profile = profileData;
        req.profile.password = undefined;
    } catch (err) {
        next();
    }
    next();
};

module.exports = { getUserById };
