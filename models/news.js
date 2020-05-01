const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const newsSchema = new mongoose.Schema(
    {
        newsTitle: {
            type: String,
            maxlength: 80,
        },
        newsArticle: {
            type: String,
        },
        newsPhoto: {
            type: Buffer,
        },
        categories: {
            type: ObjectId,
            ref: "Category",
        },
        author: {
            type: ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
