import React, { useEffect, useState } from "react";

import axios from "axios";

import { getThesis, setThesis } from "../features/thesisSlice";
import { useSelector, useDispatch } from "react-redux";
const Table = () => {
  const dispatch = useDispatch();
  const thesis = useSelector((state) => state.thesis.thesis);
  const isSubmitting = useSelector((state) => state.thesis.isSubmitting);

  useEffect(() => {
    dispatch(getThesis());
  }, []);

  const Files = thesis.map((item) => (
    <div key={item._thesisId}>
      <a
        href={`http://localhost:5000/api/thesis/${item._thesisId}/journal`}
        target="_blank"
      >
        {" "}
        {item.journal_filename}
      </a>
      <a
        href={`http://localhost:5000/api/thesis/${item._thesisId}/softcopy`}
        target="_blank"
      >
        {item.softcopy_filename}
      </a>
    </div>
  ));

  if (thesis.length === 0) {
    return <div>No Thesis Found. </div>;
  }

  return <div>{Files}</div>;
};

export default Table;
