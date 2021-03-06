const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
    .connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/newssocial",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
        }
    )
    .then(() => {
        console.log(`Database is Connected`);
    })
    .catch((err) => {
        console.log(`Something is Wrong in Database Connection`);
    });
