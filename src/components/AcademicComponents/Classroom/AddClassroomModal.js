import { addAcademicYears, addSubjects } from "@/utils/axios/axios";
import { addClassroom } from "@/utils/axios/classroom";
import { getAllTeachers } from "@/utils/axios/teacher";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AiFillSave } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

function AddClassroomModal({ academicYear, onClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      classroom: [{ name: "", section: "", classTeacher: "" }],
    },
  });
  const [teachers, setTeachers] = useState();
  const [loading, setLoading] = useState();
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "classroom",
  });

  const submitForm = async (data) => {
    const classroomWithAcademicYear = data.classroom.map((classroom) => ({
      ...classroom,
      academicYear: academicYear.value,
    }));
    setLoading(true);
    let hasError = false;
    const successfulIndexes = [];

    for (let i = 0; i < classroomWithAcademicYear.length; i++) {
      try {
        const response = await addClassroom(classroomWithAcademicYear[i]);
        toast.success(`Class ${response.name} added successfully`);
        successfulIndexes.push(i);
      } catch (error) {
        hasError = true;
        const message =
          error.response?.data?.message ||
          "Failed to save classroom. Please try again.";
        setError("root", {
          type: "server",
          message,
        });
      }
    }

    successfulIndexes.sort((a, b) => b - a).forEach((index) => remove(index));

    if (!hasError) {
      onClose();
      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-400/40 flex justify-center items-center z-50 text-gray-900">
      <Toaster />
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Add Classroom(s)
          </h2>

          <div className="my-4 flex justify-end">
            <button
              type="button"
              onClick={() => append({ name: "", shortName: "" })}
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-400"
            >
              Add More
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(submitForm)}>
          <table className="min-w-full border-collapse border border-blue-300 sm:text-sm text-xs text-center shadow-md rounded-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-blue-300 px-2 py-2">S.N</th>
                <th className="border border-blue-300 px-2 py-2">Classroom</th>
                <th className="border border-blue-300 px-2 py-2">Section</th>
                <th className="border border-blue-300 px-2 py-2">
                  Class Teacher
                </th>
                <th className="border border-blue-300 px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((classroom, index) => (
                <tr key={classroom.id} className="hover:bg-gray-50">
                  <td className="border border-blue-300 py-2">{index + 1}.</td>
                  <td className="border border-blue-300 ">
                    <input
                      className="p-2 w-32 focus:outline-none  rounded"
                      type="text"
                      {...register(`classroom[${index}].name`, {
                        required: "Classroom is required",
                      })}
                      defaultValue={classroom.name}
                    />
                    {errors.classroom?.[index]?.name && (
                      <span className="text-red-500 text-xs">
                        {errors.classroom[index].name.message}
                      </span>
                    )}
                  </td>
                  <td className="border border-blue-300">
                    <input
                      className="p-2 w-20 focus:outline-none  rounded"
                      type="text"
                      {...register(`classroom[${index}].section`)}
                    />
                  </td>
                  <td className="border border-blue-300 ">
                    <select
                      className="p-2 w-32 focus:outline-none rounded"
                      {...register(`classroom[${index}].classTeacher`, {
                        required: "Teacher is required",
                      })}
                    >
                      <option value="" className="select-none">
                        Select a teacher
                      </option>
                      {teachers?.map((teacher, index) => (
                        <option key={index} value={teacher.id}>
                          {teacher.firstName} {teacher.lastName}
                        </option>
                      ))}
                    </select>
                    {errors.classroom?.[index]?.classTeacher && (
                      <span className="text-red-500 text-xs">
                        {errors.classroom[index].classTeacher.message}
                      </span>
                    )}
                  </td>
                  <td className="border border-blue-300 px-4 py-2">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 text-white flex items-center p-0.5 rounded-full cursor-pointer"
                    >
                      <RxCross2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className={` text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-500 ${
                loading
                  ? "bg-blue-400 opacity-50 cursor-not-allowed pointer-events-none"
                  : "bg-blue-600"
              }`}
            >
              <AiFillSave className="inline-block mr-2 " />
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClassroomModal;
