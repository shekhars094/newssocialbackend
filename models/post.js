const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            trim: true,
            required: "Text is Required",
        },
        photo: {
            type: Buffer,
            contentType: String,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                text: String,
                created: {
                    type: Date,
                    default: Date.now(),
                },
                postedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
