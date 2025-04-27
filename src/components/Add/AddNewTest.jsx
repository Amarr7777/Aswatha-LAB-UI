import React, { useState } from "react";
import {
  ADD_NEW_TEST_REQUESTING,
  ADD_NEW_TEST_SAGA_REQUESTING,
} from "../../constants/actionTypes";
import { useDispatch } from "react-redux";
import { appActions } from "../../store/app";

export default function AddNewTest() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(appActions[ADD_NEW_TEST_REQUESTING]());
    dispatch({ type: ADD_NEW_TEST_SAGA_REQUESTING, payload: value.toUpperCase() });
    setValue("");
  };
  return (
    <>
      <p className="font-bold">ADD NEW TEST</p>
      <div className="flex gap-2 w-full">
        <input
          type="text"
          placeholder="Test Name"
          className="p-2 bg-secondary outline-0 rounded-xl flex-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={handleAdd}
          disabled={value.length <= 0}
          className="p-2 rounded-xl bg-[#4d6139] hover:scale-90 transform-fill transition cursor-pointer disabled:opacity-50"
        >
          <p className="text-white">Add</p>
        </button>
      </div>
    </>
  );
}
