import React from "react";
import { logout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { ToastContainer } from "react-toastify";
import { setMode } from "../features/thesisSlice";
import { closeModal, setIsLoggingOut } from "../features/modalSlice";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { initialValues, validationSchema } from "../yupUtils/auth/createGuest";
import { useFormik } from "formik";
import { notifyToast } from "../utils/notifyToast";

const AddGuestModal = () => {
  const dispatch = useDispatch();
  const { isAddGuestModalOpen } = useSelector((state) => state.modal);
  const user = useSelector((state) => state.auth.user);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      var data = {
        permittedBy: user.role,
        guestUsername: values.guestUsername,
        guestPassword: values.guestPassword,
      };

      axios({
        method: "POST",
        url: "http://localhost:5000/api/guests",
        data: data,
      })
        .then((res) => {
          if (res.data.message) {
            return notifyToast(res.data.message, "error");
          }
          notifyToast(
            "Success! You may let the guest use this account.",
            "success"
          );
          setTimeout(() => {
            dispatch(closeModal());
            dispatch(setMode(null));
          }, 2000);
        })
        .catch((err) => {
          notifyToast(err.response.data.message, "error");
        });
    },
  });
  return (
    <>
      <Dialog
        visible={isAddGuestModalOpen}
        style={{ minWidth: "400px" }}
        header="Create Guest"
        modal
        onHide={() => {
          dispatch(closeModal());
          dispatch(setMode(null));
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-y-4">
            <label
              htmlFor="guestUsername"
              className="text-h4 font-roboto font-medium text-textColor"
            >
              Username
            </label>

            {formik.touched.guestUsername && formik.errors.guestUsername ? (
              <div className="text-red-400">{formik.errors.guestUsername}</div>
            ) : null}
            <input
              id="guestUsername"
              name="guestUsername"
              type="text"
              className="p-2 bg-inputBox rounded-xl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.guestUsername}
            />
          </div>
          <div className="grid gap-y-4 mt-4">
            <label
              htmlFor="guestPassword"
              className="text-h4 font-roboto font-medium text-textColor"
            >
              Password
            </label>

            {formik.touched.guestPassword && formik.errors.guestPassword ? (
              <div className="text-red-400">{formik.errors.guestPassword}</div>
            ) : null}
            <input
              id="guestPassword"
              name="guestPassword"
              type="password"
              className="p-2 bg-inputBox rounded-xl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.guestPassword}
            />
          </div>
          <div className="flex gap-x-4 mt-4 justify-end">
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => {
                dispatch(closeModal());
              }}
              type="button"
            />
            <Button
              label="Create Guest"
              icon="pi pi-check"
              className="p-button-success"
              type="submit"
            />
          </div>
        </form>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default AddGuestModal;
