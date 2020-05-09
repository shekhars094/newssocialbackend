const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");

const User = require("../models/user");

// SignUp Controller

const createUser = (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.json({ err: `Some Error is In your Data` });
    }

    var user = new User(req.body);

    user.save()
        .then((user) => {
            const { first_name, last_name, email, user_name } = user;
            res.status(200).json({
                first_name,
                last_name,
                email,
                user_name,
            });
        })
        .catch((err) => {
            res.status(400).json({ err: `Something Is wrong ${err}` });
        });
};

// User By Id

const getUserById = async (req, res, next, Id) => {
    try {
        const user = await User.findById(Id);
        if (!user) {
            return res.status(400).json({
                error: "User Not Found",
            });
        }
        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could Not retrieve User",
        });
    }
};

// Get All Users

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select("name email");
        res.json(allUsers);
    } catch (err) {
        res.status(400).json({
            error: `Something is not good ${err}`,
        });
    }
};

// get Single User

const getSingleUser = async (req, res) => {
    req.profile.password = undefined;
    return res.json(req.profile);
};

// Update Single User

const updateSingleUser = async (req, res) => {
    try {
        let user = req.profile;
        user = lodash.extend(user, req.body);
        user.updatedAt = Date.now();
        await user.save();
        user.password = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).json({
            error: "Not Able to Update User",
        });
    }
};

// Delete Single User

const deleteSingleUser = async (req, res) => {
    try {
        let user = req.profile;
        let deleteUser = await user.remove();
        deleteUser.password = undefined;
        res.json(user);
    } catch (error) {
        return res.status(400).json({
            err: "Not Able to Delete User",
        });
    }
};

module.exports = {
    createUser,
    deleteSingleUser,
    updateSingleUser,
    getSingleUser,
    getUserById,
    getAllUsers,
};
