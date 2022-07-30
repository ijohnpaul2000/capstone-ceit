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
const { protect } = require("../middlewares/authMiddleware");

router.post(
  "/",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".pdf", ".doc", ".docx"]),
  fileSizeLimiter,
  protect,
  createThesis
);
router.get("/", protect, getThesis);
router.get("/:_thesisId", protect, getThesisById);
router.put(
  "/:_thesisId",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".pdf", ".doc", ".docx"]),
  fileSizeLimiter,
  protect,
  updateThesis
);
router.delete("/:_thesisId", protect, deleteThesis);

router.get("/:_thesisId/journal", getJournal);
router.get("/:_thesisId/softcopy", getSoftcopy);

module.exports = router;
