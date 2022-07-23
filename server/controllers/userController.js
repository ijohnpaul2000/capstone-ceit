const User = require("../models/").User;
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const expressAsyncHandler = require("express-async-handler");

// @route   POST api/users
// @desc    Register a user
// @access  Public
const createUser = expressAsyncHandler(async (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(200).json({ message: "User already exists" });
  }

  try {
    const genSalt = 10;
    const hashedPassword = bcrypt.hashSync(password, genSalt);

    const newUser = {
      _userId: v4(),
      username,
      password: hashedPassword,
      role,
    };
    await User.create(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    throw new Error(error);
  }
});
// @route   GET api/users
// @desc    Get all users
// @access  Public
const getUser = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) {
      return res.status(200).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    throw new Error(error);
  }
});
// @route   GET api/users/:_userId
// @desc    Get a user by id
// @access  Public
const getUserById = expressAsyncHandler(async (req, res) => {
  const { _userId } = req.params;
  const user = await User.findOne({ where: { _userId } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});
// @route   PUT api/users/:_userId
// @desc    Update a user
// @access  Public
const updateUser = expressAsyncHandler(async (req, res) => {
  const { _userId } = req.params;
  const { password, role } = req.body;

  const existingUser = await User.findOne({ where: { _userId } });

  const genSalt = 10;
  const hashedPassword = bcrypt.hashSync(password, genSalt);

  const updateUser = {
    password: hashedPassword,
    role,
  };
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    await User.update(updateUser, { where: { _userId } });
    res.status(200).json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

// @route   DELETE api/users/:_userId
// @desc    Delete a user
// @access  Public
const deleteUser = expressAsyncHandler(async (req, res) => {
  const { _userId } = req.params;
  const existingUser = await User.findOne({ where: { _userId } });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    await User.destroy({ where: { _userId } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
};
