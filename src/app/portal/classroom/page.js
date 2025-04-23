"use client";
import { useEffect, useState } from "react";
import ClassroomTables from "@/components/AcademicComponents/Classroom/ClassroomTable";
import AddClassroomModal from "@/components/AcademicComponents/Classroom/AddClassroomModal";
import Select from "react-select";
import { getAcademicYears } from "@/utils/axios/axios";
import toast, { Toaster } from "react-hot-toast";

function ClassRoomPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [academicYears, setAcademicYears] = useState();
  const [selectedAcademicYear, setSelectedAcademicYear] = useState();

  useEffect(() => {
    const fetchAcademicYear = async () => {
      try {
        const response = await getAcademicYears();
        setAcademicYears(response);
      } catch (error) {
        toast.error(error.response.message || "Can't fetch the academic years");
      }
    };
    fetchAcademicYear();
  }, []);

  const academicYearsOption = academicYears?.map((academicYear) => ({
    value: academicYear.id,
    label: academicYear.name,
  }));

  useEffect(() => {
    if (academicYearsOption?.length > 0 && !selectedAcademicYear) {
      setSelectedAcademicYear(academicYearsOption[0]);
    }
  }, [academicYearsOption, selectedAcademicYear]);

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#ADD8E6", // Light blue color for the border
      "&:hover": {
        borderColor: "#B0E0E6", // Slightly lighter blue on hover
      },
      boxShadow: "none", // Remove the default box shadow
      "&:focus": {
        borderColor: "#B0E0E6", // Maintain lighter blue on focus
      },
    }),
  };

  return (
    <div className="border border-blue-300 p-12 rounded-3xl relative">
      <Toaster />
      <div className="flex flex-col absolute -top-10 bg-white px-6">
        <label htmlFor="academicYear" className="text-gray-800">
          Academic Year
        </label>
        <Select
          options={academicYearsOption}
          value={selectedAcademicYear}
          onChange={setSelectedAcademicYear}
          styles={customStyles} // Apply custom styles
        />
      </div>
      <div className="flex items-end justify-between mb-2">
        <h1 className="text-2xl font-semibold text-gray-700">Class Room</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2 cursor-pointer hover:bg-green-500 bg-green-600 rounded text-gray-100 shadow"
        >
          Add +
        </button>
      </div>

      <ClassroomTables academicYear={selectedAcademicYear} />

      {isAddModalOpen && (
        <AddClassroomModal
          academicYear={selectedAcademicYear}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ClassRoomPage;
