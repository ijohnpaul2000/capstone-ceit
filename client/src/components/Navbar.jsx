import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  return (
    <>
      <div className="w-screen h-[80px] px-4 relative">
        <div className="max-w-[1400px] mx-auto h-full flex justify-between items-center">
          <Link
            to="/"
            className="font-roboto text-h4 font-medium tracking-wide leading-none"
          >
            CEIT Manuscript <br /> Information System
          </Link>
          {/* DESKTOP */}
          <div className="hidden md:flex gap-x-4 ">
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

          <div
            onClick={() => setNav((prevNav) => !prevNav)}
            className="md:hidden z-10"
          >
            {nav ? (
              <div className="pi pi-times" />
            ) : (
              <div className="pi pi-bars" />
            )}
          </div>
          {/* MOBILE */}
          <div
            onClick={() => setNav((prevNav) => !prevNav)}
            className={
              nav
                ? "fixed h-full text-black right-0 top-0 w-full bg-gray-100 px-4 py-7  "
                : "absolute left-[-100%]"
            }
          >
            <div className="grid place-content-center h-full gap-y-4">
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
      </div>
    </>
  );
};

export default Navbar;
