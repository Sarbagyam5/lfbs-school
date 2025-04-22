"use client";
import { deleteAcademicYearById, getAcademicYears } from "@/utils/axios/axios";
import { useEffect, useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { HiMinusCircle } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import EditAcademicYearModel from "./EditAcademicYear";

function AcademicYearsTable() {
  const router = useRouter();
  const [academicYears, setAcademicYears] = useState([]);
  const [clickedAcademicYear, setClickedAcademicYear] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAcademicYear, setEditAcademicYear] = useState(false);

  useEffect(() => {
    const fetchAcademicyear = async () => {
      try {
        const data = await getAcademicYears();
        setAcademicYears(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAcademicyear();
  }, []);

  async function deleteAcademicYear(id) {
    try {
      await deleteAcademicYearById(id);
      setAcademicYears((prev) => prev.filter((year) => year.id !== id));
      router.refresh();
    } catch (error) {
      console.log("error:", error.status, "message:", error.message);
    }
  }

  return (
    <div className="overflow-x-auto w-full shadow-2xl">
      {isEditModalOpen && (
        <EditAcademicYearModel
          onClose={() => setIsEditModalOpen(false)}
          academicYear={editAcademicYear}
        />
      )}
      <table className="min-w-full border-collapse border border-blue-300 sm:text-sm text-xs text-center shadow-md rounded-md">
        <thead className="bg-blue-500 text-white  ">
          <tr>
            <th className="border border-blue-300 px-2 py-2 ">S.N</th>
            <th className="border border-blue-300 px-2 py-2">Academic Year</th>
            <th className="border border-blue-300 px-2 py-2">Running</th>
            <th className="border border-blue-300 px-2 py-2">Starting Date</th>
            <th className="border border-blue-300 px-2 py-2  hidden sm:table-cell">
              Ending Date
            </th>
            <th className="border border-blue-300 px-2 py-2 hidden md:table-cell">
              Created Date
            </th>
            <th className="border border-blue-300 px-2 py-2 hidden lg:table-cell">
              Modified Date
            </th>
            <th className="border border-blue-300 px-2 py-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {academicYears ? (
            academicYears.map((academicYear, index) => (
              <>
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-blue-300 px-4 py-2">
                    {index + 1}.
                  </td>
                  <td className="border  border-blue-300 px-4 py-2">
                    {academicYear.name}
                  </td>
                  <td className="border border-blue-300 px-4 py-2">
                    {academicYear.isCurrent ? "Yes" : "No"}
                  </td>
                  <td className="border border-blue-300 px-4 py-2  ">
                    {academicYear.startDate}
                  </td>
                  <td className="border border-blue-300 px-4 py-2 hidden sm:table-cell ">
                    {academicYear.endDate}
                  </td>
                  <td className="border border-blue-300 px-4 py-2 hidden md:table-cell">
                    {academicYear.createdAt}
                  </td>
                  <td className="border border-blue-300 px-4 py-2 hidden lg:table-cell">
                    {academicYear.modifiedAt}
                  </td>
                  <td
                    onClick={() => {
                      if (clickedAcademicYear.includes(academicYear.name)) {
                        setClickedAcademicYear(
                          clickedAcademicYear.filter(
                            (name) => name !== academicYear.name
                          )
                        );
                      } else {
                        setClickedAcademicYear([
                          ...clickedAcademicYear,
                          academicYear.name,
                        ]);
                      }
                    }}
                    className={`border border-blue-300 text-2xl ${
                      clickedAcademicYear.includes(academicYear.name)
                        ? "text-red-600 hover:text-red-400"
                        : "text-green-600 hover:text-green-400"
                    }  px-4 py-2 cursor-pointer  lg:hidden`}
                  >
                    {clickedAcademicYear.includes(academicYear.name) ? (
                      <HiMinusCircle />
                    ) : (
                      <IoMdAddCircle />
                    )}
                  </td>
                  <td>
                    <td
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setEditAcademicYear(academicYear);
                      }}
                      className="border hover:bg-blue-600 hover:text-white  border-blue-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline hidden lg:flex justify-center"
                    >
                      <RiEditBoxLine />
                    </td>
                    <td
                      onClick={() => deleteAcademicYear(academicYear.id)}
                      className="border hover:bg-red-600 hover:text-white border-blue-300 px-4 py-2 text-red-600 cursor-pointer hover:underline hidden lg:flex justify-center"
                    >
                      <RiDeleteBin6Line />
                    </td>
                  </td>
                </tr>
                {clickedAcademicYear.includes(academicYear.name) && (
                  <tr>
                    <td
                      colSpan={8}
                      className="border text-left  border-blue-300 px-4 py-2 lg:hidden"
                    >
                      <div className="border-b mb-2 border-b-blue-300 md:hidden">
                        {" "}
                        <span className="font-semibold ">Ending Date: </span>
                        {academicYear.endDate}
                      </div>
                      <div className="border-b mb-2 border-b-blue-300 sm:hidden">
                        {" "}
                        <span className="font-semibold">
                          Created Date:{" "}
                        </span>{" "}
                        {academicYear.createdAt}
                      </div>
                      <div className="border-b mb-2 border-b-blue-300">
                        {" "}
                        <span className="font-semibold">
                          {" "}
                          Modified Date:{" "}
                        </span>{" "}
                        {academicYear.modifiedAt}
                      </div>
                      <div className="flex mb-2 text-xl gap-4 w-full">
                        {" "}
                        <RiEditBoxLine
                          onClick={() => {
                            setIsEditModalOpen(true);
                            setEditAcademicYear(academicYear);
                          }}
                          className="text-blue-400 cursor-pointer hover:text-blue-600"
                        />
                        <RiDeleteBin6Line
                          onClick={() => deleteAcademicYear(academicYear.id)}
                          className="text-red-400 cursor-pointer  hover:text-red-600"
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))
          ) : (
            <tr className="hover:bg-gray-50">
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2">-</td>
              <td className="border border-blue-300 px-4 py-2  ">-</td>
              <td className="border border-blue-300 px-4 py-2 hidden sm:table-cell ">
                -
              </td>
              <td className="border border-blue-300 px-4 py-2 hidden md:table-cell">
                -
              </td>
              <td className="border border-blue-300 px-4 py-2 hidden lg:table-cell">
                -
              </td>
              <td className="border border-blue-300 text-2xl text-green-600 hover:text-green-400  px-4 py-2 cursor-pointer  ">
                -
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AcademicYearsTable;
