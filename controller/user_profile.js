// User data Extracting from database and attaching into the req object

const getUserById = (req, res, next, id) => {
    User.findOne({ _id: id })
        .then((user) => {
            if (user) {
                req.profile = user;
                req.profile.password = undefined;

                next();
            } else {
                res.json({ message: "Something is Wrong" });
            }
        })
        .catch((err) => {
            res.json({ message: `Err ${err}` });
            next();
        });
};

module.exports = { getUserById };
