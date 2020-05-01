const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/newssocial", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log(`Database is Connected`);
    })
    .catch((err) => {
        console.log(`Something is Wrong in Database Connection`);
    });
