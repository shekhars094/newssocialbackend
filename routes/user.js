const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const { requireSignIn, hasAuthorization } = require("../controller/auth");
const User = require("../models/user");
const {
    createUser,
    deleteSingleUser,
    getAllUsers,
    getSingleUser,
    getUserById,
    updateSingleUser,
    userPhoto,
    addFollower,
    addFollowing,
    removeFollower,
    removeFollowing,
} = require("../controller/user");

// Loading a User

router.param("userId", getUserById);

// Signup route

router.post(
    "/users",
    [check("email").isEmail(), check("password").isLength({ min: 8 })],
    createUser
);

// list all users

router.get("/users", getAllUsers);

// Read Single User

router.get("/users/:userId", requireSignIn, getSingleUser);

// Delete Single User

router.delete(
    "/users/:userId",
    requireSignIn,
    hasAuthorization,
    deleteSingleUser
);

// Update Single User

router.put("/users/:userId", requireSignIn, hasAuthorization, updateSingleUser);

// get user Photo

router.get("/users/photo/:userId", userPhoto);

// update following

router.put("/users/follow", requireSignIn, addFollowing, addFollower);

// update unfollowing

router.put("/users/unfollow", requireSignIn, removeFollowing, removeFollower);

module.exports = router;
