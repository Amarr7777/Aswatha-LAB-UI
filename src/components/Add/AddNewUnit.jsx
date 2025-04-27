import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ADD_NEW_UNIT_REQUESTING,
  ADD_NEW_UNIT_SAGA_REQUESTING,
} from "../../constants/actionTypes";
import { appActions } from "../../store/app";

export default function AddNewUnit() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(appActions[ADD_NEW_UNIT_REQUESTING]());
    dispatch({ type: ADD_NEW_UNIT_SAGA_REQUESTING, payload: value });
    setValue("");
  };
  return (
    <div>
      <p className="font-bold">ADD NEW UNIT</p>
      <div className="flex gap-2 w-full">
        <input
          type="text"
          placeholder="Unit Value"
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
    </div>
  );
}
