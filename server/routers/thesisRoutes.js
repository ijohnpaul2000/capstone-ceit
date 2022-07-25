const router = require("express").Router();
const fileUpload = require("express-fileupload");

const {
  createThesis,
  getThesis,
  getThesisById,
  updateThesis,
  deleteThesis,
  getJournal,
  getSoftcopy,
} = require("../controllers/thesisController");

router.post("/", fileUpload({ createParentPath: true }), createThesis);
router.get("/", getThesis);
router.get("/:_thesisId", getThesisById);
router.put("/:_thesisId", updateThesis);
router.delete("/:_thesisId", deleteThesis);

router.get("/:_thesisId/journal", getJournal);
router.get("/:_thesisId/softcopy", getSoftcopy);

module.exports = router;
