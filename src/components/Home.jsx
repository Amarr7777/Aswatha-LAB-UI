import React, { useEffect, useState } from "react";
import Records from "./Records/Records";
import AddNewRecord from "./Add/AddNewRecord";
import AddIndex from "./Add/AddIndex";
import { useDispatch, useSelector } from "react-redux";
import { getRecords, getRecordsRequesting } from "../store/appSelector";
import { appActions } from "../store/app";
import {
  GET_RECORD_REQUESTING,
  GET_RECORD_SAGA_REQUESTING,
} from "../constants/actionTypes";
import DeleteModal from "./modal/deleteModal";

export default function Home({ activeTab, setActiveTab }) {
  const requesting = useSelector(getRecordsRequesting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions[GET_RECORD_REQUESTING]());
    dispatch({ type: GET_RECORD_SAGA_REQUESTING });
  }, []);

  const data = useSelector(getRecords);
  console.log("data in home: ", data);

  return (
    <div className="flex rounded-3xl px-5 h-[80vh] transform transition-colors bg-primary py-5">
      {requesting ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-third"></div>
        </div>
      ) : (
        <>
          {activeTab == 0 && <p>hi</p>}
          {activeTab == 1 && (
            <div className="flex flex-col gap-2 w-full overflow-scroll">
              {data.map((item) => {
                return <Records key={item._id} record={item} />;
              })}
            </div>
          )}
          {activeTab == 2 && (
            <div className="w-full overflow-scroll relative">
              <AddNewRecord setActiveTab={setActiveTab} />
            </div>
          )}
          {activeTab == 3 && (
            <div className="w-full overflow-scroll">
              <AddIndex />
            </div>
          )}
        </>
      )}
    </div>
  );
}
