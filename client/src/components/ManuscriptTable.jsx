import React, { useEffect, useState } from "react";

//* DataTable imports
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";

//* Redux imports
import { useSelector, useDispatch } from "react-redux";
import { getThesis, setThesis } from "../features/thesisSlice";

const ManuscriptTable = () => {
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading1, setLoading1] = useState(true);

  const dispatch = useDispatch();
  const thesis = useSelector((state) => state.thesis.thesis);
  const isSubmitting = useSelector((state) => state.thesis.isSubmitting);
  useEffect(() => {
    initFilters();
    dispatch(getThesis());
  }, [isSubmitting]);

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      courseSection: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      yearPublished: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      authors: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      panelists: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      adviser: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      chairperson: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      dean: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    setGlobalFilterValue("");
  };
  const clearFilters = () => {
    initFilters();
  };

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilters}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        className="p-button-secondary"
      ></Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        className="p-button-success"
      ></Button>
    );
  };

  const filterFooterTemplate = () => {
    return (
      <div className="px-3 pt-0 pb-3 text-center font-bold">
        Customized Buttons
      </div>
    );
  };

  const header = renderHeader();

  return (
    <DataTable
      value={thesis}
      responsiveLayout="scroll"
      paginator
      filters={filters}
      dataKey="id"
      emptyMessage="No records found"
      rows={10}
    >
      <Column
        field="title"
        header="Title"
        filter
        filterPlaceholder="Search by Title"
      />
      <Column field={`course`} sortable header="Course & Section" />
      <Column field="yearLevel" sortable header="Year Level" />
      <Column field="section" sortable header="Section" />
    </DataTable>
  );
};

export default ManuscriptTable;
