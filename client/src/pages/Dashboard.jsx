import React, { useEffect } from "react";

import { openModal, closeModal } from "../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import { getThesis, setIsSubmitting } from "../features/thesisSlice";

import { Button } from "primereact/button";

import AddThesis from "../components/AddThesis";
import ThesisList from "../components/ThesisList";

const Dashboard = () => {
  const dispatch = useDispatch();

  const currentModal = useSelector((state) => state.modal.isOpen);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(getThesis());
  }, []);
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
      <ThesisList />
    </>
  );
};

export default Dashboard;
