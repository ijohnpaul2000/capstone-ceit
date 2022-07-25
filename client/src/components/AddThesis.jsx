import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import { initialValues, validationSchema } from "../yupUtils/thesis/addThesis";
import { useFormik } from "formik";

import { closeModal } from "../features/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyToast } from "../utils/notifyToast";

const AddThesis = () => {
  const pdfRef = useRef(null);
  const excelRef = useRef(null);

  const dispatch = useDispatch();
  const currentModal = useSelector((state) => state.modal.isOpen);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const pdfFile = pdfRef.current.files[0];
      const excelFile = excelRef.current.files[0];

      //* FormData constructor is built in on Javascript Engine.
      var data = new FormData();

      data.append("title", values.title);
      data.append("course", values.course);
      data.append("yearLevel", values.yearLevel);
      data.append("section", values.section);
      data.append("yearPublished", values.yearPublished);
      data.append("authors", values.authors);
      data.append("panelists", values.panelists);
      data.append("copies", values.copies);
      data.append("volume", values.volume);
      data.append("grades", values.grades);
      data.append("keywords", values.keywords);
      data.append("adviser", values.adviser);
      data.append("chairperson", values.chairperson);
      data.append("dean", values.dean);
      data.append("abstract", values.abstract);
      data.append("journal_filepath", pdfFile);
      data.append("softcopy_filepath", excelFile);

      axios({
        url: "http://localhost:5000/api/thesis/",
        method: "POST",
        data: data,
      })
        .then((res) => {
          notifyToast("Thesis Created!", "success");
        })
        .catch((err) => {
          notifyToast(err.response.data.message, "error");
        });
    },
  });

  return (
    <Dialog
      header="Create Thesis"
      visible={currentModal}
      style={{ width: "50vw" }}
      onHide={() => dispatch(closeModal())}
    >
      <form onSubmit={formik.handleSubmit} className="addThesisForm">
        <div className="grid grid-cols-1 lg:grid-cols-[66%,33%] gap-4 ">
          <div className="h-full w-full">
            <div className="grid gap-y-4">
              <label
                htmlFor="title"
                className="text-h4 font-roboto font-medium text-textColor"
              >
                Title
              </label>

              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-400">{formik.errors.title}</div>
              ) : null}
              <input
                id="title"
                name="title"
                type="text"
                className="w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </div>
            <Divider />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 ">
              <div className="grid gap-y-4">
                <label
                  htmlFor="course"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Course
                </label>

                {formik.touched.course && formik.errors.course ? (
                  <div className="text-red-400">{formik.errors.course}</div>
                ) : null}
                <input
                  id="course"
                  name="course"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.course}
                />
              </div>
              <div className="grid gap-y-4">
                <label
                  htmlFor="section"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Section
                </label>

                {formik.touched.section && formik.errors.section ? (
                  <div className="text-red-400">{formik.errors.section}</div>
                ) : null}
                <input
                  id="section"
                  name="section"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.section}
                />
              </div>
              <div className="grid gap-y-4">
                <label
                  htmlFor="yearLevel"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Year Level
                </label>

                {formik.touched.yearLevel && formik.errors.yearLevel ? (
                  <div className="text-red-400">{formik.errors.yearLevel}</div>
                ) : null}
                <input
                  id="yearLevel"
                  name="yearLevel"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.yearLevel}
                />
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-1  lg:grid-cols-2 gap-x-4">
              <div className="grid gap-y-4">
                <label
                  htmlFor="authors"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Authors
                </label>

                {formik.touched.authors && formik.errors.authors ? (
                  <div className="text-red-400">{formik.errors.authors}</div>
                ) : null}
                <input
                  id="authors"
                  name="authors"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.authors}
                />
              </div>
              <div className="grid gap-y-4">
                <label
                  htmlFor="panelists"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Panelists
                </label>

                {formik.touched.panelists && formik.errors.panelists ? (
                  <div className="text-red-400">{formik.errors.panelists}</div>
                ) : null}
                <input
                  id="panelists"
                  name="panelists"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.panelists}
                />
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 ">
              <div className="grid gap-y-4 col-span-3 lg:col-span-2">
                <label
                  htmlFor="keywords"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Keywords
                </label>

                {formik.touched.keywords && formik.errors.keywords ? (
                  <div className="text-red-400">{formik.errors.keywords}</div>
                ) : null}
                <input
                  id="keywords"
                  name="keywords"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.keywords}
                />
              </div>
              <div className="grid gap-y-4 col-span-3 lg:col-span-1">
                <label
                  htmlFor="yearPublished"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Year Published
                </label>

                {formik.touched.yearPublished && formik.errors.yearPublished ? (
                  <div className="text-red-400">
                    {formik.errors.yearPublished}
                  </div>
                ) : null}
                <input
                  id="yearPublished"
                  name="yearPublished"
                  type="date"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.yearPublished}
                />
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-1 lg:grid-cols-3  gap-x-4">
              <div className="grid gap-y-4">
                <label
                  htmlFor="copies"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Copies
                </label>

                {formik.touched.copies && formik.errors.copies ? (
                  <div className="text-red-400">{formik.errors.copies}</div>
                ) : null}
                <input
                  id="copies"
                  name="copies"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.copies}
                />
              </div>
              <div className="grid gap-y-4">
                <label
                  htmlFor="volume"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Volume
                </label>

                {formik.touched.volume && formik.errors.volume ? (
                  <div className="text-red-400">{formik.errors.volume}</div>
                ) : null}
                <input
                  id="volume"
                  name="volume"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.volume}
                />
              </div>
              <div className="grid gap-y-4">
                <label
                  htmlFor="grades"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Grades
                </label>

                {formik.touched.grades && formik.errors.grades ? (
                  <div className="text-red-400">{formik.errors.grades}</div>
                ) : null}
                <input
                  id="grades"
                  name="grades"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.grades}
                />
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4">
              <div className="grid gap-y-4">
                <label
                  htmlFor="adviser"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Adviser
                </label>

                {formik.touched.adviser && formik.errors.adviser ? (
                  <div className="text-red-400">{formik.errors.adviser}</div>
                ) : null}
                <input
                  id="adviser"
                  name="adviser"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.adviser}
                />
              </div>
              <div className="grid gap-y-4">
                <label
                  htmlFor="chairperson"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Chairperson
                </label>

                {formik.touched.chairperson && formik.errors.chairperson ? (
                  <div className="text-red-400">
                    {formik.errors.chairperson}
                  </div>
                ) : null}
                <input
                  id="chairperson"
                  name="chairperson"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.chairperson}
                />
              </div>
              <div className="grid gap-y-4">
                <label
                  htmlFor="dean"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Dean
                </label>

                {formik.touched.dean && formik.errors.dean ? (
                  <div className="text-red-400">{formik.errors.dean}</div>
                ) : null}
                <input
                  id="dean"
                  name="dean"
                  type="text"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dean}
                />
              </div>
            </div>
          </div>
          <div className="h-full">
            <div className="grid gap-y-4 ">
              <label
                htmlFor="abstract"
                className="text-h4 font-roboto font-medium text-textColor"
              >
                abstract
              </label>

              {formik.touched.abstract && formik.errors.abstract ? (
                <div className="text-red-400">{formik.errors.abstract}</div>
              ) : null}

              <textarea
                id="abstract"
                name="abstract"
                type="text"
                rows={10}
                className="w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.abstract}
              />
            </div>
            <div className="fileUpload">
              <label
                htmlFor="journal_filepath"
                className="text-h4 font-roboto font-medium text-textColor"
              >
                Journal
              </label>
              <input
                id="journal_filepath"
                name="journal_filepath"
                type="file"
                className="w-full"
                ref={pdfRef}
                accept="application/pdf"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.journal_filepath}
              />
              <label
                htmlFor="softcopy_filepath"
                className="text-h4 font-roboto font-medium text-textColor"
              >
                Softcopy
              </label>
              <input
                id="softcopy_filepath"
                name="softcopy_filepath"
                type="file"
                className="w-full"
                ref={excelRef}
                accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.softcopy_filepath}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex mt-4 justify-end">
          <Button type="submit">Create Thesis</Button>
        </div>
      </form>
      <ToastContainer />
    </Dialog>
  );
};

export default AddThesis;
