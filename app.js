const express = require("express");
require("./utils/dbconnection");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/auth");
const profileRouter = require("./routes/user_profile");
const newsRouter = require("./routes/news");

app.use("/api", userRouter);
app.use("/api", profileRouter);
app.use("/api", newsRouter);

app.listen(port, () => {
    console.log("App is running on ", port);
});
