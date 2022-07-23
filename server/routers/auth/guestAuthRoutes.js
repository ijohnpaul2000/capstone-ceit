const router = require("express").Router();
const { loginGuest } = require("../../controllers/auth/guestAuthController");

router.post("/", loginGuest);
module.exports = router;
