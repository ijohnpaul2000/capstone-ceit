const router = require("express").Router();
const fileUpload = require("express-fileupload");

//* Middlewares for file upload
const fileExtLimiter = require("../middlewares/fileExtLimiter");
const fileSizeLimiter = require("../middlewares/fileSizeLimiter");
const filesPayloadExists = require("../middlewares/filesPayloadExists");

const {
  createThesis,
  getThesis,
  getThesisById,
  updateThesis,
  deleteThesis,
  getJournal,
  getSoftcopy,
} = require("../controllers/thesisController");

router.post(
  "/",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".pdf", ".doc", ".docx"]),
  fileSizeLimiter,
  createThesis
);
router.get("/", getThesis);
router.get("/:_thesisId", getThesisById);
router.put("/:_thesisId", updateThesis);
router.delete("/:_thesisId", deleteThesis);

router.get("/:_thesisId/journal", getJournal);
router.get("/:_thesisId/softcopy", getSoftcopy);

module.exports = router;
