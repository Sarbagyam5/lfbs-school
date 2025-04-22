"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useForm, useWatch } from "react-hook-form";
import { MdPassword } from "react-icons/md";
import schoolLogo from "@/assets/images/SchoolLogo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginReq } from "@/utils/axios/axios";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState();
  const [loginError, setLoginError] = useState();
  const logoRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password");
  const usernameValue = watch("username");
  const emptyUsername = !usernameValue || usernameValue?.trim() === "";
  const emptyPassword = !passwordValue || passwordValue?.trim() === "";

  async function submitForm(data) {
    try {
      setLoading(true);

      const user = await loginReq(data);
      toast.success("Login Successfull but wait a minute");

      sessionStorage.setItem("username", user.username);
      setLoading(false);
      router.push("/portal/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data || "Couldn't login");
    }
  }

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full flex flex-col  items-center p-4 sm:px-6"
      >
        <div className="flex flex-col w-full  items-center">
          <Image width={80} ref={logoRef} src={schoolLogo} alt="logo" />
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
          <label
            htmlFor="role"
            className="text-blue-600 sm:text-md font-medium"
          >
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
            <option value="staff">Teacher/Staff</option>
            <option value="student">Student/Parent</option>
          </select>
        </div>

        {/*Submit Button*/}

        <button
          type="submit"
          className={`mt-8 w-full flex justify-center bg-gradient-to-r to-blue-400 hover:to-blue-600 via-blue-600 hover:via-blue-400 from-blue-400 hover:from-blue-600 p-2 rounded cursor-pointer sm:font-semibold ${
            loading && "opacity-50 pointer-events-none"
          }`}
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>
        {loginError && (
          <p className="text-red-600">Invalid Username or Password</p>
        )}
      </form>
    </>
  );
}

export default LoginForm;
