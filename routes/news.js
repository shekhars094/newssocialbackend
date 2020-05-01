const router = require("express").Router();

const { isAuthenticated, isSingnedIn } = require("../middleware/auth");
const { createNews } = require("../controller/news");

// Creating News Post By User Article

router.post("/user/:userId/news", isSingnedIn, createNews);

module.exports = router;
