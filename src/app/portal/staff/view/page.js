"use client";
import { deleteTeacherById, getAllTeachers } from "@/utils/axios/teacher";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RiEditBoxLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

function ViewStaffs() {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const teacher = await getAllTeachers();
        setTeachers(teacher);
      } catch (error) {
        toast.error(error.response.message || "Server Error");
      }
    };
    getTeacher();
  }, []);

  async function deleteSubject(id) {
    try {
      await deleteTeacherById(id);
      toast.success("Teacher deleted successfully");
      const updatedTeacher = teachers.filter((teacher) => teacher.id != id);
      setTeachers(updatedTeacher);
    } catch (error) {
      toast.error(error.response.message || "Error");
    }
  }

  return (
    <div className="w-full flex justify-center">
      <Toaster />
      <div className="flex flex-col w-full max-w-[1200px] gap-2">
        <div>
          <button
            onClick={() => router.push("/portal/staff/add")}
            className="bg-green-500 hover:bg-green-400 rounded text-white ml-5 p-2 px-4 block cursor-pointer"
          >
            Add +
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto px-2">
            <thead className="border-b border-b-zinc-200 text-sm text-zinc-600">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Designation</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Email</th>
                <th className="p-2">Address</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-zinc-600">
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td className="p-2 text-center">
                    <div className="flex px-4">
                      <div
                        className="flex w-[80px] h-[80px] border border-gray-300 mr-2 text-xs items-center text-gray-300 justify-center"
                        style={{ width: "80px", height: "80px" }}
                      >
                        {!teacher.imageUrl ? (
                          "No image"
                        ) : (
                          <Image
                            src={teacher.imageUrl}
                            width={80}
                            height={80}
                            objectFit="cover"
                            alt={`${teacher.firstName} ${teacher.lastName}`}
                          ></Image>
                        )}
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <p>
                          {teacher.firstName} {teacher.lastName}
                        </p>
                        <p>{teacher.sex}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-center">{teacher.designation}</td>
                  <td className="p-2 text-center">{teacher.phoneNumber}</td>
                  <td className="p-2 text-center">{teacher.email}</td>
                  <td className="p-2 text-center">{teacher.address}</td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center px-1">
                      <div
                        onClick={() =>
                          router.push(`/portal/staff/${teacher.id}`)
                        }
                        className=" hover:bg-blue-600 hover:text-white border-blue-300 px-2 py-2 text-blue-600 cursor-pointer hover:underline flex justify-center"
                      >
                        <RiEditBoxLine />
                      </div>
                      <div
                        onClick={() => deleteSubject(teacher.id)}
                        className=" hover:bg-red-600 hover:text-white  px-2 py-2 text-red-600 cursor-pointer hover:underline flex justify-center "
                      >
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Add more rows as necessary */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewStaffs;
