import React, { useEffect } from "react";

//* Table imports
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { ColumnGroup } from "primereact/columngroup";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Row } from "primereact/row";
import { header } from "../data/manuscriptHeader";

//* Redux imports
import { useSelector, useDispatch } from "react-redux";
import { getThesis } from "../features/thesisSlice";

const TestTable = () => {
  const thesis = useSelector((state) => state.thesis.thesis);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThesis());
  }, []);

  const Header = header.map((col) => (
    <Column
      key={col.field}
      field={col.field}
      header={col.header}
      headerStyle={{ justifyContent: "center", padding: "1rem 2rem" }}
      style={{
        minWidth: col.style,
        justifyContent: col.justifyContent,
        whiteSpace: "normal",
      }}
      resizeable={col.resizeable}
      sortable
    />
  ));

  return (
    <DataTable
      value={thesis}
      scrollable
      scrollHeight="500px"
      resizableColumns
      columnResizeMode="expand"
      responsiveLayout="scroll"
      dataKey="thesisId"
      rows={10}
      showGridlines
      stripedRows
      paginator
      sortMode="single"
    >
      {Header}
    </DataTable>
  );
};
export default TestTable;
