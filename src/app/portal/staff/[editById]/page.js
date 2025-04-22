"use client";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineUser } from "react-icons/hi2";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Image from "next/image";
import { compressImageToUnder100KB } from "@/helper/compressImage";
import {
  addTeacher,
  getteacherById,
  updateTeacherById,
} from "@/utils/axios/teacher";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function EditStaff({ params }) {
  const { editById } = React.use(params);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const staff = await getteacherById(editById);
        console.log(staff);
        reset({
          firstName: staff?.firstName,
          lastName: staff?.lastName,
          address: staff?.address,
          dateOfBirth: staff?.dateOfBirth,
          sex: staff?.sex,
          phoneNumber: staff?.phoneNumber,
          email: staff?.email,
          designation: staff?.designation,
          appointDate: staff?.appointDate,
          imageUrl: staff?.imageUrl,
          citizenshipNumber: staff?.citizenshipNumber,
          state: staff?.state,
          municipalityVdc: staff?.municipalityVdc,
          degreeProgram: staff?.degreeProgram,
          institute: staff?.institute,
          position: staff?.position,
          company: staff?.company,
          startDate: staff?.startDate,
          endDate: staff?.endDate,
        });
      } catch (error) {
        toast.error(error.response.message || "Can't fetch the teacher data");
      }
    };
    fetchUser();
  }, [editById, reset]);

  const watchedFields = watch();
  const router = useRouter();
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState();

  const personalDetailForm = [
    { label: "First Name", name: "firstName", type: "text", required: true },
    { label: "Last Name", name: "lastName", type: "text", required: true },
    { label: "Sex", name: "sex", type: "select", required: true },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "number",
      required: true,
    },
    { label: "Email", name: "email", type: "text", required: true },
    { label: "Designation", name: "designation", type: "text", required: true },
    {
      label: "Date of Birth",
      name: "dateOfBirth",
      type: "date",
      required: true,
    },
    {
      label: "Citizenship Number / ID",
      name: "citizenshipNumber",
      type: "text",
      required: true,
    },
    {
      label: "Appoint Date",
      name: "appointDate",
      type: "date",
      required: true,
    },
    { label: "Address", name: "address", type: "text", required: true },
    { label: "State", name: "state", type: "text" },
    { label: "Municipality/VDC", name: "municipalityVdc", type: "text" },
  ];

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const compressedImage = await compressImageToUnder100KB(file);
      const imageUrl = URL.createObjectURL(compressedImage);
      setSelectedImageUrl(imageUrl);
      setSelectedImage(compressedImage);
    } catch (error) {
      toast.error("Couldn't compress image");
    } finally {
    }
  }

  async function submitForm(data) {
    const formData = new FormData();
    formData.append("image", selectedImage ? selectedImage : "");
    for (const key in data) {
      const value = data[key];
      if (value !== "" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }

    try {
      setLoading(true);
      const response = await updateTeacherById(editById, formData);
      toast.success(`${response.firstName}'s data uploaded succesfully`);
      router.push("view");
    } catch (error) {
      toast.error(error.response?.data || "Couldn't login");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      className="flex flex-col md:flex-row w-full sm:px-6 p-2"
      onSubmit={handleSubmit(submitForm)}
    >
      <Toaster />
      {/* Left Side */}
      <div className="md:w-1/2 md:pr-8 ">
        <div className="flex w-full justify-end sm:justify-normal pt-5 mr-4">
          <button
            className={`px-8 rounded p-1 bg-green-600 text-white hover:bg-green-500 cursor-pointer${
              loading && "opacity-50 pointer-events-none"
            } lg:hidden`}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Save"
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.push("/portal/staff/view");
            }}
            className="px-6 rounded p-1 bg-red-600 text-white hover:bg-red-500 cursor-pointer ml-2  lg:hidden"
          >
            Cancel
          </button>
        </div>

        <div className="flex items-center justify-center py-14 w-full">
          <div
            className={`bg-gray-100 text-6xl ${
              selectedImageUrl ? "p-2 " : " p-10"
            } rounded-full text-blue-700 relative`}
          >
            {selectedImage ? (
              <div>
                <Image
                  src={selectedImageUrl}
                  height={180}
                  width={180}
                  className="rounded-full"
                  alt="profilePic"
                ></Image>
              </div>
            ) : (
              <HiOutlineUser />
            )}
            <div className="absolute text-2xl bottom-1 right-1 p-1 bg-white rounded-full cursor-pointer hover:text-blue-500 transition">
              <input
                type="file"
                id="addPhoto"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="addPhoto" className="cursor-pointer">
                <BsFillPlusCircleFill size={24} />
              </label>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 w-full gap-4">
          {personalDetailForm.map((field, index) => (
            <div key={index} className="flex flex-col text-gray-700">
              <label htmlFor={field.name} className="text-gray-600">
                {field.label}
                {field.required && <span className="ml-1 text-red-600">*</span>}
              </label>

              {field.type === "select" ? (
                <select
                  {...register(field.name, {
                    required: `${field.label} is required`,
                  })}
                  className={`border border-gray-300 p-2 rounded focus:outline-none text-sm input-style ${
                    watchedFields.firstName ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <option value="">Select {field.label}</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                  className={`border border-gray-300 p-2 rounded focus:outline-none text-sm input-style ${
                    watchedFields.firstName ? "bg-gray-100" : "bg-white"
                  }`}
                  {...register(field.name, {
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                  })}
                />
              )}

              {errors[field.name] && (
                <span className="text-red-500 text-sm">
                  {errors[field.name]?.message}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2">
        <div className="flex">
          <button className="px-8 rounded p-1 bg-green-600 text-white hover:bg-green-500 cursor-pointer hidden lg:block">
            Save
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.push("/portal/staff/view");
            }}
            className="px-6 rounded p-1 bg-red-600 text-white hover:bg- red-500 cursor-pointer ml-2 hidden lg:block">
            Cancel
          </button>
        </div>

        <div className="text-gray-600 mt-2 gap-y-4 flex flex-col">
          <div>
            <label>Education</label>
            <div className="border grid lg:grid-cols-2 border-gray-300 p-2 py-4 rounded  gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="degreeProgram">Degree Program</label>
                <input
                  placeholder="Degree Program"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("degreeProgram")}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="institute">Institute</label>
                <input
                  placeholder="Eg: TU"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("institute")}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mt-4">Experience</label>
            <div className="border lg:grid lg:grid-cols-2 gap-2 border-gray-300 p-2 py-4 rounded">
              <div className="flex flex-col w-full">
                <label htmlFor="position">Position/Designation</label>
                <input
                  placeholder="Position"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("position")}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="company">Company</label>
                <input
                  placeholder="Company"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("company")}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("startDate")}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("endDate")}
                />
              </div>
              <div className="flex flex-col w-full col-span-2">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={4}
                  placeholder="Description"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("description")}
                ></textarea>
              </div>
            </div>
          </div>

          <div>
            <label>Skills</label>
            <div className="border grid lg:grid-cols-2 border-gray-300 p-2 py-4 rounded">
              <div className="flex flex-col w-full">
                <input
                  placeholder="Skills"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("skills")}
                />
              </div>
            </div>
          </div>
          <div>
            <label>System/Account</label>
            <div className="border grid lg:grid-cols-2 border-gray-300 p-2 py-2 rounded  gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("username")}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-200 rounded p-1 px-2 focus:outline-none"
                  {...register("password")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditStaff;
