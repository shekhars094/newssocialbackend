const router = require("express").Router();
const { signin, signout } = require("../controller/auth");

router.post("/auth/signin", signin);
router.get("/auth/signout", signout);

module.exports = router;
