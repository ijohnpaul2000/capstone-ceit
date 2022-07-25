const filesPayloadExists = (req, res, next) => {
  if (!req.files)
    res
      .status(400)
      .json({ status: "error", message: "No files were uploaded" });
  next();
};

module.exports = filesPayloadExists;
