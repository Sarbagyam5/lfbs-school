import { addAcademicYears, addSubjects } from "@/utils/axios/axios";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form"; // Using useFieldArray for dynamic form arrays
import { AiFillSave } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

function AddSubjectModal({ onClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ name: "", shortName: "" });
    }
  }, [append, fields]);

  const submitForm = async (data) => {
    try {
      await addSubjects(data.subjects);
      window.location.reload();
      onClose();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to save subjects. Please try again.";
      setError("root", {
        type: "server",
        message,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-400/40 flex justify-center items-center z-50 text-gray-900">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Add Subject(s)
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
                <th className="border border-blue-300 px-2 py-2">Subject</th>
                <th className="border border-blue-300 px-2 py-2">Short Name</th>
                <th className="border border-blue-300 px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((subject, index) => (
                <tr key={subject.id} className="hover:bg-gray-50">
                  <td className="border border-blue-300 py-2">{index + 1}.</td>
                  <td className="border border-blue-300 ">
                    <input
                      className="p-2 max-w-32 focus:outline-none  rounded"
                      type="text"
                      {...register(`subjects[${index}].name`, {
                        required: "Subject name is required",
                      })}
                      defaultValue={subject.name}
                    />
                    {errors.subjects?.[index]?.name && (
                      <span className="text-red-500 text-xs">
                        {errors.subjects[index].name.message}
                      </span>
                    )}
                  </td>
                  <td className="border border-blue-300">
                    <input
                      className="p-2 max-w-20 focus:outline-none  rounded"
                      type="text"
                      {...register(`subjects[${index}].shortName`, {
                        required: "Short name is required",
                      })}
                      defaultValue={subject.shortName}
                    />
                    {errors.subjects?.[index]?.shortName && (
                      <span className="text-red-500 text-xs">
                        {errors.subjects[index].shortName.message}
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
              className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-500"
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

export default AddSubjectModal;
