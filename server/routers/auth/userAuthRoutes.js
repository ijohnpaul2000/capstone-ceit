const router = require("express").Router();
const { loginUser } = require("../../controllers/auth/userAuthController");

router.post("/", loginUser);
module.exports = router;
