import React, { useEffect } from "react";

import { closeModal } from "../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import { getThesis } from "../features/thesisSlice";

import MainThesisModal from "../modals/MainThesisModal";
import ThesisList from "../components/ThesisList";
import { resetState } from "../features/selectionSlice";
import ConfirmationModal from "../modals/ConfirmationModal";
import NotAuthenticated from "../components/NotAuthenticated";
import Settings from "../components/Logout";
import LogoutModal from "../modals/LogoutModal";
import AddGuestModal from "../modals/AddGuestModal";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    isGeneralModalOpen,
    isConfirmModalOpen,
    isLogoutModalOpen,
    isAddGuestModalOpen,
  } = useSelector((state) => state.modal);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(getThesis());
    dispatch(closeModal());
    dispatch(resetState());
  }, [dispatch]);

  if (!isAuthenticated || sessionStorage.getItem("User") === null) {
    return <NotAuthenticated />;
  }
  return (
    <>
      {isGeneralModalOpen && <MainThesisModal />}
      {isConfirmModalOpen && <ConfirmationModal />}
      {isLogoutModalOpen && <LogoutModal />}
      {isAddGuestModalOpen && <AddGuestModal />}
      <ThesisList />
    </>
  );
};

export default Dashboard;
