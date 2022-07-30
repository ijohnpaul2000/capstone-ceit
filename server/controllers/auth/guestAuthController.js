const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");

const { generateToken } = require("../../utils/generateToken");
const Guest = require("../../models").Guest;

const loginGuest = expressAsyncHandler(async (req, res) => {
  const { guestUsername, guestPassword } = req.body;

  const existingGuest = await Guest.findOne({ where: { guestUsername } });

  if (!existingGuest) {
    return res.status(404).json({ message: "Guest not found" });
  }

  const isPasswordMatch = bcrypt.compareSync(
    guestPassword,
    existingGuest.guestPassword
  );
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const existingGuestExpiration = moment(existingGuest.expiredAt).format(
    "YYYY-MM-DD"
  );
  const currentDate = moment().format("YYYY-MM-DD");

  if (moment(existingGuestExpiration).isSameOrBefore(currentDate)) {
    return res.status(401).json({ message: "Guest session expired" });
  }

  res.status(200).json({
    _guestId: existingGuest._guestId,
    guestUsername,
    role: existingGuest.role,
    permittedBy: existingGuest.permittedBy,
    createdAt: existingGuest.createdAt,
    expired: existingGuest.expiredAt,
    token: generateToken(existingGuest._guestId),
  });
});

module.exports = { loginGuest };
