import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="absolute bottom-0 grid place-content-center w-screen ">
      <p className="py-4 font-roboto text-p text-textColor">
        Pamantasan ng Lungsod ng Valenzuela &copy; {date}
      </p>
    </div>
  );
};

export default Footer;
