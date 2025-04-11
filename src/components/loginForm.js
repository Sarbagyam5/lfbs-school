"use client";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useForm, useWatch } from "react-hook-form";
import { MdPassword } from "react-icons/md";
import schoolLogo from "@/assets/images/SchoolLogo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import Image from "next/image";

function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function submitForm(data) {
    console.log(data);
  }

  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordValue = watch("password");
  const usernameValue = watch("username");
  const emptyUsername = !usernameValue || usernameValue?.trim() === "";
  const emptyPassword = !passwordValue || passwordValue?.trim() === "";

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full flex flex-col  items-center p-4 sm:px-6"
    >
      <div className="flex flex-col w-full  items-center">
        <Image width={80} ref={"logo"} src={schoolLogo} />
        <h1 className="text-2xl mb-8 font-semibold text-blue-800">
          LFBS Login Portal
        </h1>
      </div>

      {/* ******************************************Username*********************************************  */}

      <div className="relative w-full">
        <label
          htmlFor="username"
          className="text-blue-600 sm:text-md font-medium"
        >
          Username<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className={`border-b  w-full text-md "border-zinc-400" text-gray-800  focus:outline-none  focus:border-b-2 ${
            !emptyUsername
              ? "border-b-green-600 border-b-2 focus:border-b-green-600"
              : "border-zinc-400 focus:border-b-blue-600"
          }`}
          {...register("username", {
            required: "Username is required",
          })}
        ></input>
        <FaUser className="absolute text-blue-800 text-xl top-5 right-2" />
        <p className="text-red-600"> {errors.username?.message}</p>
      </div>

      {/* ************************************Password***********************************************  */}

      <div className="relative mt-2 w-full">
        <label
          htmlFor="password"
          className="text-blue-600 sm:text-md font-medium"
        >
          Password<span className="text-red-500">*</span>
        </label>
        <input
          type={passwordVisible ? "text" : "password"}
          className={`border-b  w-full text-md "border-zinc-400" text-gray-800 focus:outline-none  focus:border-b-2 ${
            !emptyPassword
              ? "border-b-green-600 border-b-2 focus:border-b-green-600"
              : "border-zinc-400 focus:border-b-blue-600"
          }`}
          {...register("password", {
            required: "Password is required",
          })}
        ></input>
        {emptyPassword ? (
          <MdPassword className="absolute text-blue-800 text-xl top-6 right-2" />
        ) : !passwordVisible ? (
          <FaEye
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute text-blue-800 text-xl top-6 right-2"
          />
        ) : (
          <FaEyeSlash
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute text-blue-800 text-xl top-6 right-2"
          />
        )}

        <p className="text-red-600"> {errors.password?.message}</p>
      </div>

      {/* ************************************Role***********************************************  */}

      <div className="mt-2 w-full">
        <label htmlFor="role" className="text-blue-600 sm:text-md font-medium">
          Role
        </label>
        <select
          name="roles"
          className=" border-b-2 mt-2 border-green-600 w-full sm:text-md text-gray-800  focus:outline-none focus:border-b-green-600 focus:border-b-2 cursor-pointer "
          {...register("role")}
        >
          <option className="" value="admin">
            Admin
          </option>
          <option value="teacher">Teacher/Staff</option>
          <option value="student">Student/Parent</option>
        </select>
      </div>

      {/*Submit Button*/}

      <button
        type="submit"
        className="mt-8 w-full bg-gradient-to-r to-blue-400 via-blue-600 from-blue-400 p-2 rounded cursor-pointer sm:font-semibold "
      >
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
