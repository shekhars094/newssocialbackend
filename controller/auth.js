const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// SignUp Controller

const signUp = (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.json({ err: `Some Error is In your Data` });
    }

    var user = new User(req.body);

    user.save()
        .then((user) => {
            const { first_name, last_name, email, user_name } = user;
            res.json({
                first_name,
                last_name,
                email,
                user_name,
            });
        })
        .catch((err) => {
            res.json({ err: `Something Is wrong ${err}` });
        });
};

// Login Controller

const logIn = (req, res) => {
    const { email, password } = req.body;
    User.find({ email })

        .then(async (user) => {
            if (user[0].comparePassword(password)) {
                const userName = user[0].user_name;
                const userEmail = user[0].email;

                const token = await jwt.sign({ email }, "Shhh");
                res.cookie("authToken", token);
                res.json({
                    userName: userName,
                    userEmail: userEmail,
                    token: token,
                });
            } else {
                res.json({
                    err: `Something is wrong in login Process`,
                }).status(400);
            }
        })
        .catch((err) => {
            res.json({ err: `Something is wrong in Login Process` }).status(
                400
            );
        });
};

// Signout Controller

const signOut = (req, res) => {
    res.clearCookie("authToken");
    res.json({
        Status: "Sign Out Successful"
    })
};

module.exports = { signUp, logIn, signOut };
