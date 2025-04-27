import React, { useState } from "react";
import { MdEdit, MdDownload, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { DELETE_RECORD_SAGA_REQUESTING } from "../../constants/actionTypes";
import DeleteModal from "../modal/deleteModal";
import { generateLabReport } from "../../utils/report";
export default function Records({ record }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {
    dispatch({ type: DELETE_RECORD_SAGA_REQUESTING, payload: record._id });
  };

  return (
    <>
      <div className="flex items-center justify-between py-2 px-5 bg-secondary w-full rounded-full transform-fill transition">
        <p className="text-third text-sm font-bold">
          {record.firstName} {record.middleName} {record.lastName}
        </p>
        <p className="text-third text-sm font-light">{record.test}</p>
        <div className="flex items-center gap-2">
          {/* <div className="p-2 rounded-full bg-third hover:scale-90 transform-fill transition cursor-pointer">
            <FaEye color="white" />
          </div> */}
          <button 
          onClick={() => generateLabReport(record)}
          className="p-2 rounded-full bg-third hover:scale-90 transform-fill transition cursor-pointer">
            <MdDownload color="white" />
          </button>
          <button className="p-2 rounded-full bg-red-700 hover:scale-90 transform-fill transition cursor-pointer">
            <MdDelete color="white" onClick={handleDelete} />
          </button>
        </div>
      </div>
    </>
  );
}
