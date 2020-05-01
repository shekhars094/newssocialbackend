const News = require("../models/news");

// Controller for Creating News

const createNews = async (req, res) => {
    let newsData = new News(req.body);

    const author = req.params.userId;
    newsData.author = author;

    try {
        const response = await newsData.save();
        res.json({
            res: response,
        });
    } catch (error) {
        res.status(400).json({
            message:
                "Something is Not Right Either You are Not Login Or Not Authorized",
            err: error,
        });
    }
};

// Controller for getting All news

const getAllNews = async (req, res) => {
    try {
        const allNewsPost = await News.find({});
        res.json({
            data: allNewsPost,
        });
    } catch (err) {
        res.json({
            err: `Not Able to Fetch The Data`,
        });
    }
};

// Deleting a News By User

const deleteNewsArticle = async (req, res) => {
    const newsId = req.params.newsId;

    console.log(req.profile);

    try {
        const response = await News.findByIdAndDelete({ _id: newsId });
        console.log(response);
        res.json({
            message: `Deleted Succesfully`,
        });
    } catch (err) {
        res.json({
            message: `Not Able to Delete News Article ${err}`,
        });
    }
};

module.exports = { createNews, getAllNews, deleteNewsArticle };
