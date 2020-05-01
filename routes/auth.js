const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/user");
const { signUp, logIn, signOut } = require("../controller/auth");
const isSignedIn = require("../middleware/auth");

// Signup route

router.post("/signup", [
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
    signUp,
]);

// Login Route

router.post("/login", logIn);

// SignOut Route

router.get("/signout", signOut);

module.exports = router;
