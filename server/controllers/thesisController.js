const expressAsyncHandler = require("express-async-handler");
const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

const { generateDate } = require("../utils/generateDate");
const Thesis = require("../models/").Thesis;

require("dotenv").config({ path: process.env.ENV_VARIABLE_FILE_PATH });

const createThesis = expressAsyncHandler(async (req, res) => {
  const files = req.files;

  //* Looping through the uploaded files (multiple)
  Object.keys(files).forEach((key) => {
    const filepath = path.join(
      __dirname,
      `../files/${key}`,
      v4() + "_" + files[key].name
    );

    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });

  let pdf_filepath = "";
  let excel_filepath = "";

  //* Checking if the files upload are either .pdf or .xlsx then set the filepath to the respective variables.
  Object.keys(files).forEach((key) => {
    if (key === "journal_filepath") {
      pdf_filepath = path.join(
        __dirname,
        `../files/${key}`,
        v4() + "_" + files[key].name
      );
    } else if (key === "softcopy_filepath") {
      excel_filepath = path.join(
        __dirname,
        `../files/${key}`,
        v4() + "_" + files[key].name
      );
    }
  });

  const thesis = await Thesis.create({
    _thesisId: v4(),
    journal_filepath: pdf_filepath,
    softcopy_filepath: excel_filepath,
    journal_filename: v4() + "_" + files.journal_filepath.name,
    softcopy_filename: v4() + "_" + files.softcopy_filepath.name,
    ...req.body,
  });

  res.status(200).json(thesis);
});
const getThesis = expressAsyncHandler(async (req, res) => {
  const thesis = await Thesis.findAll();
  res.status(200).json(thesis);
});

const getThesisById = expressAsyncHandler(async (req, res) => {
  const { _thesisId } = req.params;
  const thesis = await Thesis.findOne({ where: { _thesisId } });

  if (!thesis) {
    return res
      .status(404)
      .json({ status: "error", message: "Thesis not found" });
  }
  res.status(200).json(thesis);
});
const updateThesis = expressAsyncHandler(async (req, res) => {
  const { _thesisId } = req.params;
  const thesis = await Thesis.findOne({ where: { _thesisId } });

  if (!thesis) {
    return res
      .status(404)
      .json({ status: "error", message: "Thesis not found" });
  }
  const newThesis = {
    ...req.body,
  };

  await Thesis.update(newThesis, { where: { _thesisId } });
  res.status(200).json(newThesis);
});
const deleteThesis = expressAsyncHandler(async (req, res) => {
  const { _thesisId } = req.params;
  const thesis = await Thesis.findOne({ where: { _thesisId } });

  if (!thesis) {
    return res
      .status(404)
      .json({ status: "error", message: "Thesis not found" });
  }
  await Thesis.destroy({ where: { _thesisId } });
  res.status(200).json({ status: "success", message: "Thesis deleted" });
});

const getJournal = expressAsyncHandler(async (req, res) => {
  const { _thesisId } = req.params;

  const thesis = await Thesis.findOne({
    where: { _thesisId },
  });
  const filename =
    __dirname + "/../files/journal_filepath/" + thesis.journal_filename;

  res.download(filename);
});

const getSoftcopy = expressAsyncHandler(async (req, res) => {
  const { _thesisId } = req.params;

  const thesis = await Thesis.findOne({
    where: { _thesisId },
  });

  const filename =
    __dirname + "/../files/softcopy_filepath/" + thesis.softcopy_filename;

  res.download(filename);
});

module.exports = {
  createThesis,
  getThesis,
  getThesisById,
  updateThesis,
  deleteThesis,
  getJournal,
  getSoftcopy,
};
