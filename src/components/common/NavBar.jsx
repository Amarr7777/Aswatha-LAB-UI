import React from "react";

export default function NavBar({ setActiveTab }) {
  return (
    <div className="flex items-center justify-between my-5 bg-primary h-12 rounded-full">
      <p
        onClick={() => {
          setActiveTab(0);
        }}
        className="text-third px-5 font-bold cursor-pointer"
      >
        Aswathy Lab
      </p>
      <div className="flex items-center px-2">
        <p
          onClick={() => {
            setActiveTab(1);
          }}
          className="text-third px-5 font-light cursor-pointer hover:bg-secondary py-2 rounded-full transition-all"
        >
          Records
        </p>
        <p
          onClick={() => {
            setActiveTab(2);
          }}
          className="text-third px-5 font-light cursor-pointer hover:bg-secondary py-2 rounded-full transition-all"
        >
          Add new record
        </p>
        <p
          onClick={() => {
            setActiveTab(3);
          }}
          className="text-third px-5 font-light cursor-pointer hover:bg-secondary py-2 rounded-full transition-all"
        >
          Add new test
        </p>
      </div>
    </div>
  );
}
