require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

require("./utils/dbconnection");

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use("/api", userRouter);
app.use("/api", authRouter);

app.listen(port, () => {
    console.log("App is running on ", port);
});
