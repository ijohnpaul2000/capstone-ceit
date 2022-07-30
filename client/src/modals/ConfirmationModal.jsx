import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/modalSlice";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import axios from "axios";
import { notifyToast } from "../utils/notifyToast";
import { ToastContainer } from "react-toastify";
import { getThesis, setIsDeleting, setMode } from "../features/thesisSlice";

const ConfirmationModal = () => {
  const dispatch = useDispatch();
  const { isConfirmModalOpen } = useSelector((state) => state.modal);
  const { selection } = useSelector((state) => state.selection);

  const onDelete = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/api/thesis/${selection._thesisId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("User")}`,
      },
    })
      .then((res) => {
        notifyToast("Thesis deleted successfully!", "success");
      })
      .catch((err) => {
        notifyToast(err.response.data.message, "error");
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(closeModal());
          dispatch(setIsDeleting(false));
          dispatch(setMode(null));
        }, [2000]);
        dispatch(getThesis());
      });
  };
  const deleteProductsDialogFooter = (
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
        label="Yes"
        icon="pi pi-check"
        className="p-button-danger"
        onClick={onDelete}
        type="button"
      />
    </React.Fragment>
  );

  return (
    <>
      <Dialog
        visible={isConfirmModalOpen}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        onHide={() => {
          dispatch(closeModal());
          dispatch(setIsDeleting(false));
          dispatch(setMode(null));
        }}
        footer={deleteProductsDialogFooter}
      >
        <div className="flex items-end">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {selection && (
            <span>{`Are you sure you want to delete ${selection.title}?`}</span>
          )}
        </div>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default ConfirmationModal;
