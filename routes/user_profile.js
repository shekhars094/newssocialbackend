const router = require("express").Router();

const { isSingnedIn } = require("../middleware/auth");
const { getUserById } = require("../controller/user_profile");
const User = require("../models/user");

// User Param Extraction and Attaching to req Object to Later use

router.param("userId", getUserById);

// User Data Sending.

router.get("/user/:userId", isSingnedIn, (req, res) => {
    res.send(req.profile);
});

module.exports = router;
