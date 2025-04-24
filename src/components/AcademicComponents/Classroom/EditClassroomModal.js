import { UpdateSubjectById } from "@/utils/axios/axios";
import { updateClassroomById } from "@/utils/axios/classroom";
import { getAllTeachers } from "@/utils/axios/teacher";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AiFillSave } from "react-icons/ai";

function EditClassroomModal({ onClose, classroom = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (classroom && Object.keys(classroom).length > 0) {
      reset({
        name: classroom.name,
        section: classroom.section,
        classTeacher: classroom?.classTeacher?._id,
      });
    }
  }, [classroom, teachers, reset]);

  const submitForm = async (data) => {
    try {
      setIsLoading(true);
      await updateClassroomById(classroom._id, data);
      toast.success(`${classroom.name} updated successfully`);
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await getAllTeachers();
        setTeachers(response);
      } catch (error) {
        toast.error(error.response?.message || "Can't fetch the teachers");
      }
    };
    fetchTeacher();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-400/40  flex justify-center items-center z-50 text-gray-900">
      <Toaster />
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">
          Edit Classroom
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col my-2">
            <label htmlFor="name" className="text-gray-700 text-sm ">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border w-full focus:outline-blue-600 rounded p-1 border-gray-300  px-2"
              {...register("name", { required: "Subject name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="section" className="text-gray-700 text-sm  ">
              Section
            </label>
            <input
              type="text"
              className="border w-full focus:outline-blue-600 rounded  border-gray-300 p-1 px-2"
              {...register("section")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="classTeacher" className="text-gray-700 text-sm  ">
              Class Teacher <span className="text-red-500">*</span>
            </label>
            <select
              className="border-gray-300 p-1  w-full border  focus:outline-none rounded"
              {...register("classTeacher", {
                required: "Teacher is required",
              })}
            >
              <option value="" className="select-none">
                Select a teacher
              </option>
              {teachers?.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-8 justify-end gap-2">
            <button
              type="submit"
              className={`p-2 px-3 flex gap-1 items-center text-gray-100 rounded cursor-pointer
                ${
                  isLoading
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-400"
                }`}
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>
                  <AiFillSave className="text-xl" />
                  Update
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 p-2 px-3 flex gap-1 items-center text-gray-100 rounded hover:bg-red-400 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClassroomModal;
