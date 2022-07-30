import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import { initialValues, validationSchema } from "../yupUtils/thesis/addThesis";
import { useFormik } from "formik";

import {
  getThesis,
  setIsSubmitting,
  setIsUpdating,
  setMode,
} from "../features/thesisSlice";
import { closeModal } from "../features/modalSlice";
import { useSelector, useDispatch } from "react-redux";

import { useRef } from "react";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyToast } from "../utils/notifyToast";

const MainThesisModal = () => {
  const pdfRef = useRef(null);
  const excelRef = useRef(null);

  const dispatch = useDispatch();
  const { isGeneralModalOpen } = useSelector((state) => state.modal);
  const { currentMode } = useSelector((state) => state.thesis);
  const { isUpdating } = useSelector((state) => state.thesis);
  const { isSubmitting } = useSelector((state) => state.thesis);
  const { role } = useSelector((state) => state.auth.user);

  const selection = useSelector((state) => state.selection.selection);

  console.log(role);
  const buttonName =
    currentMode?.charAt(0).toUpperCase() +
    currentMode?.slice(1).toLowerCase() +
    " Thesis";

  const submitUpdate = () => {
    dispatch(setIsSubmitting(true));
    dispatch(setIsUpdating(false));
  };
  const setUpdating = () => {
    dispatch(setIsUpdating(true));
  };

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

      // TODO: Add a conditional statement to check if the mode is CREATE or UPDATE.
      axios({
        url:
          currentMode === "CREATE"
            ? "http://localhost:5000/api/thesis/"
            : `http://localhost:5000/api/thesis/${selection._thesisId}`,
        method: currentMode === "CREATE" ? "POST" : "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("User")}`,
        },
        data: data,
      })
        .then((res) => {
          dispatch(setIsSubmitting(true));
          notifyToast(
            `Thesis ${isUpdating ? "Updated" : "Created"}!`,
            "success"
          );
        })
        .catch((err) => {
          notifyToast(err.response.data.message, "error");
        })
        .finally(() => {
          dispatch(setIsSubmitting(false));
          dispatch(getThesis());
        });
    },
  });

  const headerName =
    currentMode?.charAt(0).toUpperCase() +
    currentMode?.slice(1).toLowerCase() +
    " Thesis";

  return (
    <Dialog
      header={`${isUpdating ? "Updating Thesis" : headerName}`}
      visible={isGeneralModalOpen}
      style={{ width: "70vw" }}
      modal
      onHide={() => {
        dispatch(closeModal());
        dispatch(setIsUpdating(false));
        dispatch(setMode(null));
      }}
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
                value={
                  currentMode === "VIEW" ||
                  (currentMode === "UPDATE" && !isUpdating)
                    ? selection?.title
                    : formik.values.title
                }
                disabled={
                  currentMode === "VIEW" ||
                  (currentMode === "UPDATE" && !isUpdating)
                }
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
                <select
                  id="course"
                  name="course"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full"
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.course
                      : formik.values.course
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
                >
                  <option></option>
                  <option value="IT">Information Technology</option>
                  <option value="CE">Civil Engineering</option>
                  <option value="EE">Electrical Engineering</option>
                </select>
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
                  type="number"
                  min={1}
                  max={5}
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.yearLevel
                      : formik.values.yearLevel
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  type="number"
                  min={0}
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.section
                      : formik.values.section
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.authors
                      : formik.values.authors
                  }
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
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.panelists
                      : formik.values.panelists
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.keywords
                      : formik.values.keywords
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  min="2002-06-05"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.yearPublished
                      : formik.values.yearPublished
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  type="number"
                  min={0}
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.copies
                      : formik.values.copies
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  type="number"
                  min={0}
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.volume
                      : formik.values.volume
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  type="number"
                  className="w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.grades
                      : formik.values.grades
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.adviser
                      : formik.values.adviser
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.chairperson
                      : formik.values.chairperson
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                  value={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                      ? selection?.dean
                      : formik.values.dean
                  }
                  disabled={
                    currentMode === "VIEW" ||
                    (currentMode === "UPDATE" && !isUpdating)
                  }
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
                Abstract
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
                value={
                  currentMode === "VIEW" ||
                  (currentMode === "UPDATE" && !isUpdating)
                    ? selection?.abstract
                    : formik.values.abstract
                }
                disabled={
                  currentMode === "VIEW" ||
                  (currentMode === "UPDATE" && !isUpdating)
                }
              />
            </div>

            <div className="fileUpload">
              {currentMode === "VIEW" ||
                (currentMode === "UPDATE" && (
                  <label className="">Currently Uploaded Files:</label>
                ))}
              {role !== "Guest" && role !== "Encoder" ? (
                <div className="">
                  <label
                    htmlFor="journal_filepath"
                    className="text-h4 font-roboto font-medium text-textColor"
                  >
                    Journal
                  </label>

                  {currentMode === "VIEW" || currentMode === "UPDATE" ? (
                    <>
                      <p className="mb-4">{selection?.journal_filename}</p>
                      {currentMode !== "UPDATE" && (
                        <a
                          href={`${
                            process.env.currentDomain || "http://localhost:5000"
                          }/api/thesis/${selection._thesisId}/journal`}
                          className="text-blue-500 underline"
                          rel="noreferrer"
                        >
                          Download
                        </a>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {currentMode !== "VIEW" && (
                    <input
                      id="journal_filepath"
                      name="journal_filepath"
                      type="file"
                      className="w-full"
                      ref={excelRef}
                      accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.journal_filepath}
                      disabled={
                        currentMode === "VIEW" ||
                        (currentMode === "UPDATE" && !isUpdating)
                      }
                    />
                  )}
                </div>
              ) : null}

              {/* SOFTCOPY */}
              {role !== "Guest" && role !== "Encoder" ? (
                <div className="">
                  <label
                    htmlFor="softcopy_filepath"
                    className="text-h4 font-roboto font-medium text-textColor"
                  >
                    Softcopy
                  </label>

                  {currentMode === "VIEW" || currentMode === "UPDATE" ? (
                    <>
                      <p className="mb-4">{selection?.softcopy_filename}</p>
                      {currentMode !== "UPDATE" && (
                        <a
                          href={`${
                            process.env.currentDomain || "http://localhost:5000"
                          }/api/thesis/${selection._thesisId}/softcopy`}
                          className="text-blue-500 underline"
                          rel="noreferrer"
                        >
                          Download
                        </a>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {currentMode !== "VIEW" && (
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
                      disabled={
                        currentMode === "VIEW" ||
                        (currentMode === "UPDATE" && !isUpdating)
                      }
                    />
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-full flex mt-4 justify-end gap-x-4 ">
          {currentMode === "UPDATE" && (
            <Button
              type="button"
              label="Cancel"
              className="p-button-secondary"
              onClick={() => {
                dispatch(closeModal());
                dispatch(setIsUpdating(false));
              }}
            />
          )}

          {currentMode === "CREATE" && (
            <Button
              label="Create Thesis"
              className="p-button-primary"
              type="submit"
            />
          )}
          {currentMode === "UPDATE" && (
            <Button
              label={
                currentMode === "UPDATE" && isUpdating ? "Save" : buttonName
              }
              onClick={
                currentMode === "UPDATE" && isUpdating
                  ? submitUpdate
                  : setUpdating
              }
              type={isSubmitting ? "submit" : "button"}
            />
          )}
        </div>
      </form>
      <ToastContainer />
    </Dialog>
  );
};

export default MainThesisModal;
