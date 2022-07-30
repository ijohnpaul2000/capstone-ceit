import React from "react";

//* DataTable imports
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
//* Redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  openAddGuestModal,
  openConfirmModal,
  openModal,
} from "../features/modalSlice";
import { setMode } from "../features/thesisSlice";

const CrudOptions = ({ exportCSV }) => {
  const dispatch = useDispatch();
  const { selection } = useSelector((state) => state.selection);
  const { role } = useSelector((state) => state.auth.user);
  const leftToolbarTemplate = () => {
    return (
      <div className="flex gap-x-2">
        {(role === "Dean" || role === "Encoder") && (
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success"
            onClick={() => {
              dispatch(openModal());
              dispatch(setMode("CREATE"));
            }}
          />
        )}

        <Button
          label="View"
          icon="pi pi-eye"
          className="p-button-success"
          onClick={() => {
            dispatch(openModal());
            dispatch(setMode("VIEW"));
          }}
          disabled={!selection}
        />

        {role === "Dean" && (
          <>
            <Button
              label="Edit"
              icon="pi pi-pencil"
              className="p-button-success"
              onClick={() => {
                dispatch(openModal());
                dispatch(setMode("UPDATE"));
              }}
              disabled={!selection}
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              className="p-button-danger"
              onClick={() => {
                dispatch(openConfirmModal());
                dispatch(setMode("DELETE"));
              }}
              disabled={!selection}
            />
          </>
        )}
      </div>
    );
  };

  const isPermittedToExport =
    role.toString().includes("Dean") || role.toString().includes("Chairperson");

  const rightToolbarTemplate = () => {
    return (
      <div className="flex gap-x-4">
        <Button
          label="Add Guest"
          icon="pi pi-plus"
          className="p-button-primary"
          onClick={() => {
            dispatch(openAddGuestModal());
          }}
        />
        {isPermittedToExport && (
          <Button
            label="Export to CSV"
            icon="pi pi-upload"
            className="p-button-primary"
            onClick={() => {
              exportCSV();
            }}
          />
        )}
      </div>
    );
  };

  return (
    <Toolbar
      className="mb-4 max-w-[1700px] mx-auto flex gap-y-4 "
      left={leftToolbarTemplate}
      right={rightToolbarTemplate}
    ></Toolbar>
  );
};

export default CrudOptions;
