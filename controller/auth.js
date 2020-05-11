const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

// SignIn Auth Controller Logic

const signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })

        .then(async (user) => {
            if (user.comparePassword(password)) {
                const token = await jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET
                );
                res.cookie("authToken", token);
                return res.json({
                    token,
                    _id: user._id,
                    user: {
                        name: user.name,
                        email: user.email,
                    },
                });
            } else {
                res.status(401).json({
                    err: `Something is wrong in login Process`,
                });
            }
        })
        .catch((err) => {
            res.json({ err: `Something is wrong in Login Process` }).status(
                400
            );
        });
};

// Signout Controller Logic

const signout = (req, res) => {
    res.clearCookie("authToken");
    return res.status(200).json({
        message: "Signout Succesfully",
    });
};

// required Sign in controler logic

const requireSignIn = expressJWT({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
});

// hasAuthorization Controller Logic

const hasAuthorization = (req, res, next) => {
    const authorized =
        req.profile && req.auth && req.profile._id == req.auth._id;

    if (!authorized) {
        return res.status(403).json({
            err: "User is Not Authorized",
        });
    }
    next();
};

module.exports = { signin, signout, requireSignIn, hasAuthorization };
