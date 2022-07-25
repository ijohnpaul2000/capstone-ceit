import React, { useEffect } from "react";

import { openModal, closeModal } from "../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetState } from "../features/authSlice";

import axios from "axios";

import { Button } from "primereact/button";

import { ToastContainer } from "react-toastify";
import { notifyToast } from "../utils/notifyToast";

import AddThesis from "../components/AddThesis";

import { initialValues, validationSchema } from "../yupUtils/thesis/addThesis";
import { useFormik } from "formik";

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentModal = useSelector((state) => state.modal.isOpen);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Button onClick={() => dispatch(openModal())}>Open Modal</Button>
      {currentModal && <AddThesis />}
    </>
  );
};

export default Dashboard;
