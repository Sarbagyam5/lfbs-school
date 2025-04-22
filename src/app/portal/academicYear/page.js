"use client";

import AcademicYearsTable from "@/components/AcademicComponents/AcademicYear/AcademicYearsTable.js";
import React, { useState } from "react";
import AddAcademicYearModal from "@/components/AcademicComponents/AcademicYear/AddAcademicYearModal.js";

function AcademicYearPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-end justify-between px-4 mb-2">
        <h1 className="text-2xl font-semibold text-gray-700">Academic Years</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2 cursor-pointer hover:bg-green-500 bg-green-600 rounded text-gray-100 shadow"
        >
          Add +
        </button>
      </div>

      <AcademicYearsTable />

      {isAddModalOpen && (
        <AddAcademicYearModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}

export default AcademicYearPage;
