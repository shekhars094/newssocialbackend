const News = require("../models/news");

// Controller for Creating News

const createNews = async (req, res) => {
    const newsData = new News(req.body);

    try {
        const response = await newsData.save();
        res.json({
            res: response,
        });
    } catch (error) {
        res.status(400).json({
            err: error,
        });
    }
};

module.exports = { createNews };
