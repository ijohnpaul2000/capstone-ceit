import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openLogoutModal } from "../features/modalSlice";

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="group flex items-end mb-4"
      title="Do you want to log out?"
      onClick={() => dispatch(openLogoutModal())}
    >
      <div className="rounded-full shadow-2xl  p-4 bg-red-400  group-hover:scale-95 cursor-pointer">
        <div className="relative">
          <AiOutlinePoweroff size={25} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Logout;
