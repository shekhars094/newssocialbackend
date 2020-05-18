const router = require("express").Router();

const { requireSignIn } = require("../controller/auth");
const {
    listByUser,
    createPost,
    photo,
    postById,
    isPoster,
    listNewsFeed,
    removePost,
    like,
    unlike,
    comment,
    deleteComment,
} = require("../controller/post");

// get Post

router.param("postId", postById);

// get Posts by userId

router.get("/posts/by/:userId", requireSignIn, listByUser);

// List News Feed

router.get("/posts/feed/:userId", requireSignIn, listNewsFeed);

// create New Post By a UserId

router.post("/posts/new/:userId", requireSignIn, createPost);

// Retrieve Photo

router.get("/posts/photo/:postId", photo);

// delete a Post

router.delete("/posts/:postId", requireSignIn, isPoster, removePost);

// like route

router.put("/posts/like", requireSignIn, like);

// unlike route

router.put("/posts/unlike", requireSignIn, unlike);

// comment route

router.put("/posts/comment", requireSignIn, comment);

// uncomment route

router.put("/posts/uncomment", requireSignIn, deleteComment);

module.exports = router;
