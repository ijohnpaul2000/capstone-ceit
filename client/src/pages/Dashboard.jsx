import React, { useEffect } from "react";

import { openModal, closeModal } from "../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import { setIsSubmitting } from "../features/thesisSlice";

import { Button } from "primereact/button";

import AddThesis from "../components/AddThesis";

import Table from "../components/Table";

const Dashboard = () => {
  const dispatch = useDispatch();

  const currentModal = useSelector((state) => state.modal.isOpen);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <p>Not authenticated</p>;
  }
  return (
    <>
      <Button
        onClick={() => {
          dispatch(openModal());
        }}
      >
        Open Modal
      </Button>
      {currentModal && <AddThesis />}

      <Table />
    </>
  );
};

export default Dashboard;
