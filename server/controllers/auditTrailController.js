const fs = require("fs").promises;
const path = require("path");
const expressAsyncHandler = require("express-async-handler");

const updateAuditTrail = expressAsyncHandler(async (req, res) => {
  const { username, accessedBy, accessedTime, permittedBy } = req.body;

  const data = `${accessedTime}            ${accessedBy}                ${username}               ${permittedBy}\n`;

  fs.writeFile(
    path.resolve(__dirname, "../", process.env.AUDIT_DIR, "_logs.txt"),
    data,
    {
      flag: "a",
    }
  );

  res.status(200).json({ message: "Audit Trail Updated!" });
});
const downloadAuditTrail = expressAsyncHandler(async (req, res) => {
  const file = path.resolve(
    __dirname,
    "../",
    process.env.AUDIT_DIR,
    "_logs.txt"
  );
  res.download(file);
});

module.exports = { updateAuditTrail, downloadAuditTrail };
