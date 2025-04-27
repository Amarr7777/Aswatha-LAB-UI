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
  const data = useSelector(getRecords);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    dispatch(appActions[GET_RECORD_REQUESTING]());
    dispatch({ type: GET_RECORD_SAGA_REQUESTING });
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchData(data);
    } else {
      const filteredData = data.filter((item) =>
        `${item.firstName} ${item.middleName || ''} ${item.lastName || ''} ${item._id}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchData(filteredData);
    }
  }, [searchTerm, data]);

  return (
    <div className="flex rounded-3xl px-5 h-[80vh] transform transition-colors bg-primary py-5">
      {requesting ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-third"></div>
        </div>
      ) : (
        <>
          {activeTab === 1 && (
            <div className="flex flex-col gap-2 w-full overflow-scroll">
              <div className="w-full flex items-center justify-between">
                <p className="font-bold text-third">RECORDS</p>
                <input
                  className="bg-secondary outline-0 px-5 py-2 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Name / UID"
                />
              </div>

              {searchData.length > 0 ? (
                searchData.map((item) => (
                  <Records key={item._id} record={item} />
                ))
              ) : (
                <div className="flex justify-center items-center mt-10 text-third font-semibold">
                  No Records Found
                </div>
              )}
            </div>
          )}
          {activeTab === 2 && (
            <div className="w-full overflow-scroll relative">
              <AddNewRecord setActiveTab={setActiveTab} />
            </div>
          )}
          {activeTab === 3 && (
            <div className="w-full overflow-scroll">
              <AddIndex />
            </div>
          )}
        </>
      )}
    </div>
  );
}