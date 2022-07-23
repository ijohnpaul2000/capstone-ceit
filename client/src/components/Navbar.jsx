import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="w-screen h-[80px] px-4">
        <div className="max-w-[1400px] mx-auto h-full flex justify-between items-center">
          <Link
            to="/"
            className="font-roboto text-h4 font-medium tracking-wide leading-none"
          >
            CEIT Manuscript <br /> Information System
          </Link>
          <div className="flex gap-x-4">
            <Link
              to="/auth/guest"
              className="font-roboto text-h4 font-medium active:scale-95"
            >
              Guest Login
            </Link>
            <Link
              to="/auth/user"
              className="font-roboto text-h4 font-medium bg-button text-white px-6 rounded-full active:scale-95"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
