"use client";
import { deleteSubjectById, getSubjects } from "@/utils/axios/axios";
import { useEffect, useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import EditSubjectModal from "./EditSubjectModal";

function SubjectsTable() {
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSubject, setEditSubject] = useState();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSubjects();
  }, []);

  async function deleteSubject(id) {
    try {
      await deleteSubjectById(id);
      setSubjects((prev) => prev.filter((subject) => subject.id !== id));
      router.refresh();
    } catch (error) {
      console.log("error:", error.status, "message:", error.message);
    }
  }

  return (
    <div className="overflow-x-auto w-full shadow-2xl">
      {isEditModalOpen && (
        <EditSubjectModal
          onClose={() => setIsEditModalOpen(false)}
          subject={editSubject}
        />
      )}
      <table className="min-w-full border-collapse border border-blue-300 sm:text-sm text-xs text-center shadow-md rounded-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border border-blue-300 px-2 py-2">S.N</th>
            <th className="border border-blue-300 px-2 py-2">Subject</th>
            <th className="border border-blue-300 px-2 py-2">Short Name</th>
            <th className="border border-blue-300 px-2 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects && subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <tr key={subject.id} className="hover:bg-gray-50">
                <td className="border border-blue-300 px-4 py-2">
                  {index + 1}.
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  {subject.name}
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  {subject.shortName}
                </td>
                <td className="border border-blue-300 ">
                  <div className="flex px-1">
                    <div
                      onClick={() => {
                        setEditSubject(subject);
                        setIsEditModalOpen(true);
                      }}
                      className=" hover:bg-blue-600 hover:text-white border-blue-300 px-2 py-2 text-blue-600 cursor-pointer hover:underline flex justify-center"
                    >
                      <RiEditBoxLine />
                    </div>
                    <div
                      onClick={() => deleteSubject(subject.id)}
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
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectsTable;
