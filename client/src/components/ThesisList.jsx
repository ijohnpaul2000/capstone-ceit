import React, { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";

//* DataTable imports
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";

//* Redux imports
import { useDispatch, useSelector } from "react-redux";
import { getThesis } from "../features/thesisSlice";
import CrudOptions from "./CrudOptions";
import { resetState, selectThesis } from "../features/selectionSlice";
import { useRef } from "react";
import Logout from "./Logout";
import DownloadAudits from "./DownloadAudits";

const ThesisList = () => {
  const dispatch = useDispatch();
  const thesis = useSelector((state) => state.thesis.thesis);

  const { role } = useSelector((state) => state.auth.user);
  const isSubmitting = useSelector((state) => state.thesis.isSubmitting);
  const { selection } = useSelector((state) => state.selection);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const columns = [
    { field: "title", header: "Title" },
    { field: "course", header: "Course" },
    { field: "yearLevel", header: "Year Level" },
    { field: "section", header: "Section" },
    { field: "yearPublished", header: "Year Published" },
    { field: "authors", header: "Authors" },
    { field: "panelists", header: "panelists" },
    { field: "copies", header: "Copies" },
    { field: "volume", header: "Volume" },
    { field: "grades", header: "Grade" },
    { field: "keywords", header: "Keywords" },
    { field: "adviser", header: "Adviser" },
    { field: "chairperson", header: "Chairperson" },
    { field: "dean", header: "Dean" },
    { field: "abstract", header: "Abstract" },
  ];

  const [selectedColumns, setSelectedColumns] = useState(columns);

  const dt = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      course: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      yearLevel: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      section: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      yearPublished: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },

      authors: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      panelists: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      copies: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      volume: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      grades: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      keywords: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      adviser: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      chairperson: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      dean: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
    setGlobalFilterValue("");
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="max-w-[1700px] mx-auto">
        <div className="flex flex-col md:flex md:flex-row justify-between items-start md:items-end  gap-y-4">
          <div className="flex flex-col mt-4 gap-y-4">
            <label>Toggle Columns</label>
            <MultiSelect
              value={selectedColumns}
              options={columns}
              optionLabel="header"
              onChange={onColumnToggle}
              style={{ width: "20em" }}
            />
          </div>
          <div className="">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              className="p-button-outlined "
              onClick={clearFilter}
            />
            <span className="p-input-icon-left ml-4">
              <i className="pi pi-search" />
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Keyword Search"
              />
            </span>
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  const columnComponents = selectedColumns.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        filter
        filterPlaceholder={`Search by ${col.header}`}
        style={{ width: "200px" }}
        className={`${
          col.field === "abstract" ? "truncate whitespace-normal" : ""
        }`}
      />
    );
  });

  useEffect(() => {
    initFilters();
    dispatch(getThesis());
  }, [isSubmitting, dispatch]);
  const isPermittedToDownload =
    role.toString().includes("Dean") || role.toString().includes("Chairperson");

  return (
    <div className="px-4">
      <div className="max-w-[1700px] mx-auto">
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <h1 className="text-h2 font-roboto font-bold text-textColor">
              CEIT Manuscript Information System
            </h1>
            <p className="font-roboto mb-4 text-lg">
              Currently signed in as:{" "}
              <span className="text-blue-500 font-roboto text-xl">{`${role}`}</span>
            </p>
          </div>
          <div className="flex items-end justify-end gap-x-4">
            {isPermittedToDownload && <DownloadAudits />}
            <Logout />
          </div>
        </div>
      </div>
      <CrudOptions exportCSV={exportCSV} />
      <DataTable
        value={thesis}
        paginator
        className="mb-4 max-w-[1700px] mx-auto rounded-lg "
        showGridlines
        rows={6}
        dataKey="_thesisId"
        size="small"
        filters={filters}
        filterDisplay="menu"
        responsiveLayout="scroll"
        globalFilterFields={[
          "title",
          "course",
          "yearLevel",
          "section",
          "yearPublished",
          "authors",
          "panelists",
          "copies",
          "volume",
          "grades",
          "keywords",
          "adviser",
          "chairperson",
          "dean",
        ]}
        header={header}
        emptyMessage="No capstone found."
        selectionMode="single"
        selection={selection}
        onRowDoubleClick={() => dispatch(resetState())}
        onSelectionChange={(e) => {
          dispatch(selectThesis(e.value));
        }}
        stateStorage="local"
        stateKey="dt-state"
        ref={dt}
        stripedRows
      >
        {columnComponents}
      </DataTable>
    </div>
  );
};

export default ThesisList;
