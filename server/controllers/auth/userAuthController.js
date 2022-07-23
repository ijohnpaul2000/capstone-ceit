const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");

const { generateToken } = require("../../utils/generateToken");
const User = require("../../models").User;

const loginUser = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  res.status(200).json({
    _userId: existingUser._userId,
    username,
    role: existingUser.role,
    token: generateToken(existingUser._userId),
  });
});

module.exports = { loginUser };
