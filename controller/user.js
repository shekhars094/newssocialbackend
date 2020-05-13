const { validationResult } = require("express-validator");
const formidable = require("formidable");
const fs = require("fs");
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
        const user = await User.findById(Id)
            .populate("followings", "_id name")
            .populated("followers", "_id name")
            .exec();
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
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded",
            });
        }
        let user = req.profile;
        user = lodash.extend(user, fields);
        user.updatedAt = Date.now();

        if (files.photo) {
            user.photo = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
            console.log(user);
        }
        try {
            await user.save();
            user.password = undefined;
            res.json(user);
        } catch (err) {
            return res.status(400).json({
                error: "Not Able to Update User",
            });
        }
    });
};

// Delete Single User

const deleteSingleUser = async (req, res) => {
    try {
        let user = req.profile;
        let deleteUser = await user.remove();
        deleteUser.password = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).json({
            err: "Not Able to Delete User",
        });
    }
};

// userPhoto

const userPhoto = async (req, res) => {
    if (req.profile.photo) {
        res.set("Content-Type", req.profile.photo.contentType);
        return res.send(req.profile.photo);
    } else {
        res.send("Photo is Not present");
    }
};

// add Following

const addFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { followings: req.body.followId },
        });
        next();
    } catch (error) {
        return res.status(400).json({
            err: "Something wrong is following",
        });
    }
};

// add follower

const addFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.body.userId } },
            { new: true }
        )
            .populate("followings", "_id name")
            .populate("followers", "_id name")
            .exec();
        result.password = undefined;
        res.json(result);
    } catch (error) {
        return res.status(400).json({
            err: "Something has gone in follwer",
        });
    }
};

// removeFollowing

const removeFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, {
            $pull: { followings: req.body.unfollowId },
        });
        next();
    } catch (error) {
        return res.status(400).json({
            err: "Something has gone Wrong",
        });
    }
};

// removeFollower

const removeFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(
            req.body.unfollowId,
            { $pull: { followers: req.body.userId } },
            { new: true }
        )
            .populate("followings", "_id name")
            .populate("followers", "_id name")
            .exec();
        result.password = undefined;
        res.json(result);
    } catch (error) {
        return res.status(400).json({
            err: `Something is wrong ${error}`,
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
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
};
