import { UpdateSubjectById } from "@/utils/axios/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillSave } from "react-icons/ai";

function EditSubjectModal({ onClose, subject = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState();

  const submitForm = async (data) => {
    try {
      setIsLoading(true);
      await UpdateSubjectById(data, subject.id);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-400/40  flex justify-center items-center z-50 text-gray-900">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">
          Edit Subject
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col my-2">
            <label htmlFor="name" className="text-gray-700 text-sm ">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue={subject?.name}
              className="border w-full focus:outline-blue-600 rounded p-1 border-gray-300  px-2"
              {...register("name", { required: "Subject name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="shortName" className="text-gray-700 text-sm  ">
              Shortname
            </label>
            <input
              type="text"
              defaultValue={subject?.shortName}
              className="border w-full focus:outline-blue-600 rounded  border-gray-300 p-1 px-2"
              {...register("shortName", { required: "Shor name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.shortName.message}</p>
            )}
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
                  Save
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

export default EditSubjectModal;
