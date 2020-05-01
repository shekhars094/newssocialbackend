const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            trim: true,
        },
        user: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
        ],
        like: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
