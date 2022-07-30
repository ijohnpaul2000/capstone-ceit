import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openLogoutModal } from "../features/modalSlice";
import { FaFileDownload } from "react-icons/fa";

const DownloadAudits = () => {
  const dispatch = useDispatch();
  return (
    <a
      href="http://localhost:5000/api/auditTrail"
      target="_blank"
      rel="noreferrer"
    >
      <div className="group flex items-end mb-4" title="Download Abstracts">
        <div className="rounded-full shadow-2xl  p-4 bg-green-400  group-hover:scale-95 cursor-pointer">
          <div className="relative">
            <FaFileDownload size={25} color="white" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default DownloadAudits;
