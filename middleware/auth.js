const expressjwt = require("express-jwt");

// Signin Logic for That User is Logged In right Now or Not

const isSingnedIn = expressjwt({
    secret: "Shhh",
    userProperty: "auth",
});

// To Check That User Is Authorized or not To Perform Some Action.

const isAuthenticated = (req, res, next) => {
    let checker =
        req.profile && req.auth && req.profile.email === req.auth.email;

    if (!checker) {
        return res.status(403).json({ err: `Access Denied` });
    }
    next();
};

module.exports = { isSingnedIn, isAuthenticated };
