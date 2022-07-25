import React, { useEffect, useState } from "react";

import axios from "axios";

import { getThesis, setThesis } from "../features/thesisSlice";
import { useSelector, useDispatch } from "react-redux";
const Table = () => {
  const dispatch = useDispatch();
  const thesis = useSelector((state) => state.thesis.thesis);

  useEffect(() => {
    dispatch(getThesis());
  }, []);

  const handleDownloadJournal = (_thesisId) => {
    axios
      .get(`http://localhost:5000/api/thesis/${_thesisId}/journal`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDownloadSoftCopy = (_thesisId) => {
    axios
      .get(`http://localhost:5000/api/thesis/${_thesisId}/softcopy`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const Files = thesis.map((item) => (
    <div key={item._thesisId}>
      <div onClick={() => handleDownloadJournal(item._thesisId)}>
        {item.journal_filepath}
      </div>
      <div
        onClick={() => handleDownloadSoftCopy(item._thesisId)}
        key={item._thesisId}
      >
        {item.softcopy_filepath}
      </div>
    </div>
  ));

  if (thesis.length === 0) {
    return <div>Loading...</div>;
  }

  return <div>{Files}</div>;
};

export default Table;
