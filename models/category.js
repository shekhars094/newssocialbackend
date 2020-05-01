const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
    },
    newsByCategory: [
        {
            type: ObjectId,
            ref: "News",
        },
    ],
});

module.exports = mongoose.model("Category", categorySchema)
