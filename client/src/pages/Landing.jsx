import React from "react";

import Folder from "../assets/Landing.png";
const Landing = () => {
  return (
    <div className=" w-screen">
      <div className="max-w-[1400px] h-[calc(100vh-80px)] mx-auto grid place-content-center  grid-cols-2">
        <div className="grid place-content-center">
          <h1 className="text-h1 font-roboto font-bold text-textColor">
            CEIT Manuscript <br /> Information System
          </h1>
          <p className="text-h4 font-roboto font-medium text-textColor">
            We aim to keep and provide a clean track of information about the
            past and incoming capstone research manuscripts created by
            Pamantasan ng Lungsode ng Valenzuela's CEIT Students
          </p>
        </div>
        <div className="">
          <img
            src={Folder}
            alt="Folder Logo"
            className="max-w-[550px] mx-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
