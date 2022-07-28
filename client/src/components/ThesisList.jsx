import React, { useEffect, useState } from "react";

//* DataTable imports
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";

//* Redux imports
import { useDispatch, useSelector } from "react-redux";
import { getThesis } from "../features/thesisSlice";

const ThesisList = () => {
  const dispatch = useDispatch();
  const thesis = useSelector((state) => state.thesis.thesis);
  const isSubmitting = useSelector((state) => state.thesis.isSubmitting);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedThesis, setSelectedThesis] = useState(undefined);
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
      <div className="flex ">
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
        <MultiSelect
          value={selectedColumns}
          options={columns}
          optionLabel="header"
          onChange={onColumnToggle}
          style={{ width: "20em" }}
        />
      </div>
    );
  };
  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
  };
  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
      />
    );
  });

  useEffect(() => {
    initFilters();
    dispatch(getThesis());
  }, [isSubmitting]);

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          field="title"
          header="Title"
          filter
          filterPlaceholder="Search by Title"
          rowSpan={3}
        />

        <Column header="Course &amp; Section" colSpan={3} align="center" />
        <Column
          header="Year Published"
          filterField="yearPublished"
          field="yearPublished"
          dataType="date"
          style={{ minWidth: "10rem" }}
          body={dateBodyTemplate}
          filter
          filterElement={dateFilterTemplate}
          rowSpan={3}
        />
        <Column
          field="authors"
          header="Authors"
          filter
          filterPlaceholder="Search by Authors"
          rowSpan={3}
        />
        <Column
          field="panelists"
          header="Panelists"
          filter
          filterPlaceholder="Search by Panelists"
          rowSpan={3}
        />
        <Column
          field="copies"
          header="Copies"
          filter
          filterPlaceholder="Search by No. of Copies"
          rowSpan={3}
        />
        <Column
          field="volume"
          header="Volume"
          filter
          filterPlaceholder="Search by No. of Volumes"
          rowSpan={3}
        />
        <Column
          field="grades"
          header="Grades"
          filter
          filterPlaceholder="Search by Grades"
          rowSpan={3}
        />
        <Column
          field="keywords"
          header="Keywords"
          filter
          filterPlaceholder="Search by Keywords"
          rowSpan={3}
        />
        <Column
          field="adviser"
          header="Adviser"
          filter
          filterPlaceholder="Search by Adviser"
          rowSpan={3}
        />
        <Column
          field="chairperson"
          header="Chairperson"
          filter
          filterPlaceholder="Search by Chairperson"
          rowSpan={3}
        />
        <Column
          field="dean"
          header="Dean"
          filter
          filterPlaceholder="Search by Dean"
          rowSpan={3}
        />
      </Row>

      <Row>
        <Column
          field="course"
          header="Course"
          filter
          filterPlaceholder="Search by Course"
        />
        <Column
          field="yearLevel"
          header="Year Level"
          filter
          filterPlaceholder="Search by Year Level"
        />
        <Column
          field="section"
          header="Section"
          filter
          filterPlaceholder="Search by Section"
        />
      </Row>
    </ColumnGroup>
  );

  return (
    <DataTable
      value={thesis}
      paginator
      className="p-datatable-customers"
      showGridlines
      rows={10}
      dataKey="_thesisId"
      size="normal"
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
      selection={selectedThesis}
      onSelectionChange={(e) => {
        console.log(e.value);
        setSelectedThesis(e.value);
      }}
    >
      {columnComponents}
    </DataTable>
  );
};

export default ThesisList;
