const router = require("express").Router();

const {
  downloadAuditTrail,
  updateAuditTrail,
} = require("../controllers/auditTrailController");

router.get("/", downloadAuditTrail);
router.put("/", updateAuditTrail);

module.exports = router;
