import React from "react";

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500/30 z-50">
      <div className="bg-secondary rounded-xl shadow-lg p-8 w-80 flex flex-col items-center">
        <p className="text-lg font-semibold mb-6 text-center text-third">
          Are you sure?
        </p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-primary hover:bg-primary/50 text-black rounded-lg font-medium"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
