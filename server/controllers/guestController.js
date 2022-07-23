const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const moment = require("moment");
const Guest = require("../models/").Guest;

const createGuest = expressAsyncHandler(async (req, res) => {
  const { guestUsername, guestPassword, permittedBy } = req.body;
  const existingGuest = await Guest.findOne({ where: { guestUsername } });
  if (existingGuest) {
    return res.status(200).json({ message: "Guest already exists" });
  }
  try {
    const genSalt = 10;
    const hashedPassword = await bcrypt.hash(guestPassword, genSalt);
    const newGuest = {
      _guestId: v4(),
      guestUsername,
      guestPassword: hashedPassword,
      permittedBy,
    };

    await Guest.create(newGuest);
    res.status(200).json(newGuest);
  } catch (error) {
    throw new Error(error);
  }
});
const getGuest = expressAsyncHandler(async (req, res) => {
  try {
    const guests = await Guest.findAll();

    if (!guests) {
      return res.status(404).json({ message: "No guests found" });
    }
    res.status(200).json(guests);
  } catch (error) {
    throw new Error(error);
  }
});
const getGuestById = expressAsyncHandler(async (req, res) => {
  const { _guestId } = req.params;
  const existingGuest = await Guest.findOne({ where: { _guestId } });

  if (!existingGuest) {
    return res.status(404).json({ message: "Guest not found" });
  } else {
    res.status(200).json(existingGuest);
  }
});
const updateGuest = expressAsyncHandler(async (req, res) => {
  const { _guestId } = req.params;
  const { guestPassword, permittedBy } = req.body;
  const existingGuest = await Guest.findOne({ where: { _guestId } });

  if (!existingGuest) {
    return res.status(404).json({ message: "Guest not found" });
  }
  const genSalt = 10;
  const hashedGuestPassword = bcrypt.hashSync(guestPassword, genSalt);

  const updatedGuest = {
    guestPassword: hashedGuestPassword,
    permittedBy,
  };
  try {
    await Guest.update(updatedGuest, { where: { _guestId } });
    return res.status(200).json(updatedGuest);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteGuest = expressAsyncHandler(async (req, res) => {
  const { _guestId } = req.params;
  const existingGuest = await Guest.findOne({ where: { _guestId } });

  if (!existingGuest) {
    return res.status(404).json({ message: "Guest not found" });
  }

  try {
    await Guest.destroy({ where: { _guestId } });
    return res.status(200).json({ message: "Guest deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createGuest,
  getGuest,
  getGuestById,
  updateGuest,
  deleteGuest,
};
