const router = require("express").Router();

const {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
} = require("../controllers/userController");

router.post("/", createUser);
router.put("/forgot_password", forgotPassword);
router.get("/", getUser);
router.get("/:_userId", getUserById);
router.put("/:_userId", updateUser);
router.delete("/:_userId", deleteUser);

module.exports = router;
