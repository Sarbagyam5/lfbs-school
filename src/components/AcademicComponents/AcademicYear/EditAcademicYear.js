import { addAcademicYears, updateAcademicYears } from "@/utils/axios/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NepaliDatePicker from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import { AiFillSave } from "react-icons/ai";
import { ImCheckboxChecked } from "react-icons/im";

function EditAcademicYearModel({ onClose, academicYear = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isRunning, setIsRunning] = useState(true);

  const submitForm = async (data) => {
    const form = {
      name: data.name,
      startDate: data.startDate.adDate,
      endDate: data.endDate.adDate,
      isCurrent: isRunning,
    };
    try {
      await updateAcademicYears(form, academicYear.id);
      window.location.reload();
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-400/40  flex justify-center items-center z-50 text-gray-900">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">
          Add Academic Year
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col my-2">
            <label htmlFor="name" className="text-gray-700 text-sm ">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue={academicYear?.name}
              className="border w-full focus:outline-blue-600 rounded p-1 border-gray-300  px-2"
              {...register("name", { required: "Academic Year is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full ">
            <label htmlFor="startDate" className="text-gray-700 text-sm ">
              Starting Date <span className="text-red-500">*</span>
            </label>
            <NepaliDatePicker
              className="border w-full border-gray-300 focus:outline-blue-600 rounded p-1 px-2"
              value={startDate}
              defaultDate={academicYear.startDate}
              onChange={(value) => {
                setStartDate(value);
                setValue("startDate", value, { shouldValidate: true });
                trigger("startDate");
              }}
              language="en"
              theme="blue"
            />
            {errors.startDate && (
              <p className="text-sm text-red-500">{errors.startDate.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="endDate" className="text-gray-700 text-sm ">
              Ending Date <span className="text-red-500">*</span>
            </label>
            <NepaliDatePicker
              className="border w-full border-gray-300 focus:outline-blue-600 rounded p-1 px-2"
              defaultDate={academicYear.endDate}
              value={endDate}
              onChange={(value) => {
                setEndDate(value);
                setValue("endDate", value, { shouldValidate: true });
                trigger("endDate");
              }}
              language="en"
              theme="blue"
            />
            {errors.endDate && (
              <p className="text-sm text-red-500">{errors.endDate.message}</p>
            )}
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="remarks" className="text-gray-700 text-sm  ">
              Remarks
            </label>
            <input
              type="text"
              className="border w-full focus:outline-blue-600 rounded  border-gray-300 p-1 px-2"
              {...register("remarks")}
            />
          </div>
          <div className="flex mt-8 justify-end gap-2">
            <div className="flex items-center text-gray-800 justify-center gap-2 mr-12 ">
              Running{" "}
              {!isRunning ? (
                <div
                  onClick={() => setIsRunning(!isRunning)}
                  className="border border-gray-300 flex h-6 w-6 cursor-pointer"
                ></div>
              ) : (
                <ImCheckboxChecked
                  onClick={() => setIsRunning(!isRunning)}
                  className="text-red-500 h-6 w-6 cursor-pointer"
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-green-500 p-2 px-3 flex gap-1 items-center text-gray-100 rounded hover:bg-green-400 cursor-pointer"
            >
              <AiFillSave className="text-xl" />
              Save
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

export default EditAcademicYearModel;
