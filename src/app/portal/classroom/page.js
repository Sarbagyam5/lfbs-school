"use client";

import { useState } from "react";
import SubjectsTable from "@/components/AcademicComponents/Subject/SubjectTable";
import AddSubjectModal from "@/components/AcademicComponents/Subject/AddSubjectModal";

function ClassRoomPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="">
      <div className="flex items-end justify-between  mb-2">
        <h1 className="text-2xl font-semibold text-gray-700">Class Room</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2 cursor-pointer hover:bg-green-500 bg-green-600 rounded text-gray-100 shadow"
        >
          Add +
        </button>
      </div>

      <SubjectsTable />

      {isAddModalOpen && (
        <AddSubjectModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}

export default ClassRoomPage;
