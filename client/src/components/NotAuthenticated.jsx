import React from "react";
import { Link } from "react-router-dom";

const NotAuthenticated = () => {
  return (
    <div className="w-full h-screen text-textColor px-4">
      <div className="grid place-content-center items-center justify-center h-full">
        <p className="text-7xl text-center">😔</p>
        <h1 className="font-roboto text-8xl font-black text-gray-700 text-center">
          Not Authenticated!
        </h1>
        <h1 className="font-roboto text-3xl font-medium ">
          Please login and try again.
        </h1>
        <Link
          to="/"
          className="text-blue-400 underline mt-4 font-roboto text-h4"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotAuthenticated;
