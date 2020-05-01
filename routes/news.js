const router = require("express").Router();

const { isAuthenticated, isSingnedIn } = require("../middleware/auth");
const {
    createNews,
    getAllNews,
    deleteNewsArticle,
} = require("../controller/news");

const { getUserById } = require("../controller/user_profile");

// Extracting user Profile

router.param("userId", getUserById);

// Creating News Post By User Article

router.post("/user/:userId/news", isSingnedIn, createNews);

// Getting All News Articles

router.get("/allnews", getAllNews);

// Deleting News Article By User

router.delete(
    "/user/:userId/news/:newsId",
    isSingnedIn,
    isAuthenticated,
    deleteNewsArticle
);

module.exports = router;
