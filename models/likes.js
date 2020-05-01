const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
        ],
        news: [{ type: mongoose.Schema.ObjectId, ref: "News" }],
    },
    { timestamps }
);

module.exports = mongoose.model("Like", likeSchema);
