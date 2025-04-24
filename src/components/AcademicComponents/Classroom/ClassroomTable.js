"use client";
import { deleteSubjectById, getSubjects } from "@/utils/axios/axios";
import { useEffect, useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {
  deleteClassroomById,
  getClassroomByAcademicYearId,
} from "@/utils/axios/classroom";
import toast, { Toaster } from "react-hot-toast";
import EditClassroomModal from "./EditClassroomModal";

function ClassroomTables({ academicYear }) {
  const academicYearId = academicYear?.value;

  const [classrooms, setClassrooms] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editClassroom, setEditClassroom] = useState();

  useEffect(() => {
    if (!academicYearId) return;

    const fetchClassroom = async () => {
      try {
        const data = await getClassroomByAcademicYearId(academicYearId);
        setClassrooms(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchClassroom();
  }, [academicYearId]);

  async function deleteClassroom(id, name) {
    try {
      await deleteClassroomById(id);
      setClassrooms((prev) => prev.filter((classroom) => classroom._id !== id));
      toast.success(`${name} is deleted succefully`);
    } catch (error) {
      toast.error("error:", error.status, "message:", error.message);
    }
  }

  return (
    <div className="overflow-x-auto w-full shadow-2xl">
      <Toaster />
      {isEditModalOpen && (
        <EditClassroomModal
          onClose={() => setIsEditModalOpen(false)}
          classroom={editClassroom}
        />
      )}
      <table className="min-w-full border-collapse border border-blue-300 sm:text-sm text-xs text-center shadow-md rounded-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border border-blue-300 px-2 py-2">S.N</th>
            <th className="border border-blue-300 px-2 py-2">Classroom</th>
            <th className="border border-blue-300 px-2 py-2">Section</th>
            <th className="border border-blue-300 px-2 py-2">Class Teacher</th>
            <th className="border border-blue-300 px-2 py-2">Boys</th>
            <th className="border border-blue-300 px-2 py-2">Girls</th>
            <th className="border border-blue-300 px-2 py-2">Total</th>

            <th className="border border-blue-300 px-2 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {classrooms && classrooms.length > 0 ? (
            classrooms.map((classroom, index) => (
              <tr key={classroom.id} className="hover:bg-gray-50">
                <td className="border border-blue-300 px-4 py-2">
                  {index + 1}.
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  {classroom.name}
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  {classroom.section}
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  {classroom.classTeacher.firstName}{" "}
                  {classroom.classTeacher.lastName}
                </td>
                <td className="border border-blue-300 px-4 py-2">0</td>
                <td className="border border-blue-300 px-4 py-2">0</td>
                <td className="border border-blue-300 px-4 py-2">0</td>
                <td className="border border-blue-300 ">
                  <div className="flex px-1">
                    <div
                      onClick={() => {
                        setEditClassroom(classroom);
                        setIsEditModalOpen(true);
                      }}
                      className=" hover:bg-blue-600 hover:text-white border-blue-300 px-2 py-2 text-blue-600 cursor-pointer hover:underline flex justify-center"
                    >
                      <RiEditBoxLine />
                    </div>
                    <div
                      onClick={() =>
                        deleteClassroom(classroom._id, classroom.name)
                      }
                      className=" hover:bg-red-600 hover:text-white  px-2 py-2 text-red-600 cursor-pointer hover:underline flex justify-center "
                    >
                      <RiDeleteBin6Line />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="hover:bg-gray-50">
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2">-</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClassroomTables;
