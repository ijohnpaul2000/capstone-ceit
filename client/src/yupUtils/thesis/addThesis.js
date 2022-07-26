import * as Yup from "yup";

export const initialValues = {
  title: "",
  course: "",
  abstract: "",
  yearLevel: "",
  section: "",
  yearPublished: "",
  authors: "",
  panelists: "",
  copies: "",
  volume: "",
  grades: "",
  keywords: "",
  adviser: "",
  chairperson: "",
  dean: "",
  journal_filepath: "",
  softcopy_filepath: "",
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  abstract: Yup.string().required("Abstract is required"),
  course: Yup.string().required("Course is required"),
  yearLevel: Yup.number().required("Year level is required"),
  section: Yup.number().required("Section is required"),
  yearPublished: Yup.date().required("Year published is required"),
  authors: Yup.string().required("Authors is required"),
  panelists: Yup.string().required("Panelists is required"),
  copies: Yup.number().required("Copies is required"),
  volume: Yup.number().required("Volume is required"),
  grades: Yup.number().required("Grades is required"),
  keywords: Yup.string().required("Keywords is required"),
  adviser: Yup.string().required("Adviser is required"),
  chairperson: Yup.string().required("Chairperson is required"),
  dean: Yup.string().required("Dean is required"),
  journal_filepath: Yup.string().notRequired(),
  softcopy_filepath: Yup.string().notRequired(),
});
