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

const LogoutModal = () => {
  const dispatch = useDispatch();
  const isLogoutModalOpen = useSelector(
    (state) => state.modal.isLogoutModalOpen
  );
  const isLoggingOut = useSelector((state) => state.modal.isLoggingOut);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const onLogout = () => {
    axios({
      method: "PUT",
      url: "http://localhost:5000/api/auditTrail",
      data: {
        accessedTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        accessedBy: user.role,
        username: user.username || user.guestUsername,
        permittedBy: user?.permittedBy || "Not Applicable",
      },
    });

    dispatch(setIsLoggingOut(true));
    setTimeout(() => {
      dispatch(logout());
      dispatch(closeModal());
      dispatch(setMode(null));
      navigate("/auth/user");
      sessionStorage.clear();
    }, 2000);
  };
  const LogoutDialogFooter = (
    <React.Fragment>
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
        label={isLoggingOut ? "Logging out..." : "Yes"}
        icon="pi pi-check"
        className="p-button-danger"
        onClick={onLogout}
        type="button"
      />
    </React.Fragment>
  );
  return (
    <>
      <Dialog
        visible={isLogoutModalOpen}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        onHide={() => {
          dispatch(closeModal());
          dispatch(setMode(null));
        }}
        footer={LogoutDialogFooter}
      >
        Do you want to log out?
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default LogoutModal;
