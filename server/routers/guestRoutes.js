const router = require("express").Router();

const {
  createGuest,
  getGuest,
  getGuestById,
  updateGuest,
  deleteGuest,
} = require("../controllers/guestController");

router.post("/", createGuest);
router.get("/", getGuest);
router.get("/:_guestId", getGuestById);
router.put("/:_guestId", updateGuest);
router.delete("/:_guestId", deleteGuest);

module.exports = router;
