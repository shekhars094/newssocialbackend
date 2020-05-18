const fs = require("fs");

const formidable = require("formidable");

const Post = require("../models/post");
const User = require("../models/user");

// get Post By Id Controller

const postById = async (req, res, next, id) => {
    try {
        const post = await Post.findById(id)
            .populate("postedBy", "_id name")
            .exec();

        if (!post) {
            return res.status(400).json({
                err: "Not Able to get the Post",
            });
        }
        res.post = post;
        next();
    } catch (error) {
        return res.status(400).json({
            err: `Not Able to get The Post ${error}`,
        });
    }
};

// NewsFeed controller

const listNewsFeed = async (req, res) => {
    let following = req.profile.following;
    following.push(req.profile._id);
    try {
        let posts = await Post.find({
            postedBy: { $in: req.profile.following },
        })
            .populate("comments.postedBy", "_id name")
            .populate("postedBy", "_id name")
            .sort("-created")
            .exec();
        res.json(posts);
    } catch (error) {
        return res.status(400).json({
            err: `There is Something Wrong ${error}`,
        });
    }
};

// post list by User

const listByUser = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.profile._id })
            .populate("comments", "text created")
            .populate("comments.postedBy", "_id name")
            .populate("postedBy", "_id name")
            .sort("-created")
            .exec();
        return res.json(posts);
    } catch (error) {
        return res.status(400).json({
            err: `Not Able to fetch Posts List
            ${error}`,
        });
    }
};

// create New Post By a UserId

const createPost = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (error, fields, files) => {
        if (error) {
            return res.status(400).json({
                err: "Image Could Not Be Uploaded",
            });
        }
        let post = new Post(fields);
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((error, result) => {
            if (error) {
                return res.status(400).json({
                    err: `There is Something Wrong ${error}`,
                });
            }
            return res.json(result);
        });
    });
};

// Photo Controller

const photo = async (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
};

// remove Post

const removePost = async (req, res) => {
    let post = req.post;
    try {
        let deletedPost = await post.remove();
        res.json(deletedPost);
    } catch (error) {
        return res.status(400).json({
            err: `Something is Wrong`,
        });
    }
};

// is Poster

const isPoster = async (req, res, next) => {
    let isPoster =
        req.post && req.auth && req.post.postedBy._id == req.auth._id;

    if (!isPoster) {
        return res.status(400).json({
            err: "You Are Not Authorized",
        });
    }

    next();
};

// like Controller

const like = async (req, res) => {
    try {
        let result = await Post.findByIdAndUpdate(
            req.body.postId,
            { $push: { likes: req.body.userId } },
            { new: true }
        );
        res.json(result);
    } catch (error) {
        return res.status(400).json({
            err: `Something is Wrong ${error}`,
        });
    }
};

// unlike Controller

const unlike = async (req, res) => {
    try {
        let result = await Post.findByIdAndUpdate(
            req.body.postId,
            { $pull: { likes: req.body.userId } },
            { new: true }
        );
        res.json(result);
    } catch (error) {
        return res.status(400).json({
            err: `Something is Wrong ${error}`,
        });
    }
};

// comment Controller

const comment = async (req, res) => {
    let comment = req.body.comment;
    comment.postedBy = req.body.userId;
    try {
        let result = await Post.findByIdAndUpdate(
            req.body.postId,
            { $push: { comments: comment } },
            { new: true }
        )
            .populate("comments.postedBy", "_id name")
            .populate("postedBy", "_id name")
            .exec();
        return res.json(result);
    } catch (error) {
        return res.status(400).json({
            err: `Something is wrong ${error}`,
        });
    }
};

// uncomment Controller

const deleteComment = async (req, res) => {
    let comment = req.body.comment;
    try {
        let result = await Post.findByIdAndUpdate(
            req.body.postId,
            { $pull: { comments: { _id: comment._id } } },
            { new: true }
        )
            .populate("comments.postedBy", "_id name")
            .populate("postedBy", "_id name")
            .exec();
        res.json(result);
    } catch (error) {
        return res.status(400).json({
            err: `Something is Wrong ${error}`,
        });
    }
};

// Exporting Controller

module.exports = {
    createPost,
    listByUser,
    photo,
    postById,
    isPoster,
    removePost,
    like,
    unlike,
    comment,
    deleteComment,
    listNewsFeed
};
