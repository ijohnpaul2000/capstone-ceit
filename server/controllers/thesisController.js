const expressAsyncHandler = require("express-async-handler");
const { v4 } = require("uuid");
const path = require("path");

const Thesis = require("../models/").Thesis;

require("dotenv").config({ path: process.env.ENV_VARIABLE_FILE_PATH });

const createThesis = expressAsyncHandler(async (req, res) => {
  const files = req.files;

  //* Looping through the uploaded files (multiple)
  Object.keys(files).forEach((key) => {
    const filepath = path.join(__dirname, `../files/${key}`, files[key].name);
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });

  let pdf_filepath = "";
  let excel_filepath = "";

  //* Checking if the files upload are either .pdf or .xlsx then set the filepath to the respective variables.
  Object.keys(files).forEach((key) => {
    if (key === "journal_filepath") {
      pdf_filepath = path.join(__dirname, `../files/${key}`, files[key].name);
    } else if (key === "softcopy_filepath") {
      excel_filepath = path.join(__dirname, `../files/${key}`, files[key].name);
    }
  });

  const thesis = await Thesis.create({
    _thesisId: v4(),
    journal_filepath: pdf_filepath,
    softcopy_filepath: excel_filepath,
    ...req.body,
  });

  res.status(200).json(thesis);
});
const getThesis = expressAsyncHandler(async (req, res) => {
  const thesis = await Thesis.findAll();
  res.status(200).json(thesis);
});

const getThesisById = expressAsyncHandler(async (req, res) => {});
const updateThesis = expressAsyncHandler(async (req, res) => {});
const deleteThesis = expressAsyncHandler(async (req, res) => {});

const getJournal = expressAsyncHandler(async (req, res) => {
  const thesis = await Thesis.findOne({
    where: { _thesisId: req.params._thesisId },
  });

  res.download(thesis.journal_filepath);
});

const getSoftcopy = expressAsyncHandler(async (req, res) => {
  const thesis = await Thesis.findOne({
    where: { _thesisId: req.params._thesisId },
  });

  console.log(thesis.softcopy_filepath);

  res.download(path.resolve(thesis.softcopy_filepath));
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
