"use client";
import Image from "next/image";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import schoolLogo from "@/assets/images/SchoolLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";

function Navbar() {
  const [menuClicked, setMenuclicked] = useState(false);
  const pathName = usePathname();
  const absolutePath = pathName.split("/")[1];
  return (
    absolutePath != "portal" && (
      <div className="min-h-52 md:min-h-44 pt-2.5 bg-gradient-to-r to-blue-400 via-blue-500 from-blue-600">
        <div className="h-40 md:h-30 flex items-center justify-center  bg-white">
          <div className="items-center flex flex-col md:flex-row w-[1020px] px-2 md:justify-between">
            <div
              onClick={() => window.location.href("/")}
              className="text-zinc-800 cursor-pointer flex items-center justify-center w-full md:w-auto "
            >
              <Image
                alt="school Logo"
                src={schoolLogo}
                width={500}
                height={500}
                style={{ height: "auto", width: "auto", maxHeight: "100px" }}
                className="object-contain"
              />
              <div className="ml-4 flex flex-col justify-center items-center">
                <h1 className="font-black text-xl sm:text-3xl">
                  LITTLE FLOWERS&apos;
                </h1>
                <h2 className="font-semibold  text-zinc-700">
                  BOARDING SCHOOL
                </h2>
              </div>
            </div>
            <div className="flex sm:mt-2 items-center w-full md:w-auto justify-center ">
              <input
                className="border-1 w-full placeholder-gray-700 text-gray-700 focus:outline-none border-blue-400 rounded-l-md pl-2 h-7 hover:border-blue-500 transition"
                placeholder="Search...."
              />
              <button className="bg-blue-400 focus:outline-none flex justify-center items-center text-xl h-7 w-10 rounded-e-md hover:bg-blue-500 transition cursor-pointer">
                <CiSearch />
              </button>
              <a
                href="/portal/login"
                className="bg-blue-400 m-4 cursor-pointer text-white  px-4 py-0.5 rounded hover:bg-blue-600 transition"
              >
                Login
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-2 md:mt-2.5">
          <div
            onClick={() => setMenuclicked(!menuClicked)}
            className="flex items-center justify-center w-full cursor-pointer font-semibold hover:text-blue-200 md:hidden"
          >
            <div className="flex">
              <RxHamburgerMenu className="h-auto mx-2 transition" />
              <button>Menu</button>
            </div>
          </div>
          {menuClicked && (
            <div className="flex flex-col w-full md:hidden ">
              <button className="transition cursor-pointer py-2 border-t border-gray-50 bg-blue-300 hover:bg-blue-400">
                Home
              </button>
              <button className="transition cursor-pointer py-2 border-t border-gray-50 bg-blue-300 hover:bg-blue-400">
                About Us
              </button>
              <button className="transition cursor-pointer py-2 border-t border-gray-50 bg-blue-300 hover:bg-blue-400">
                Curriculum
              </button>
              <button className="transition cursor-pointer py-2 border-t border-gray-50 bg-blue-300 hover:bg-blue-400">
                Students
              </button>
              <button className="transition cursor-pointer py-2 border-t border-gray-50 bg-blue-300 hover:bg-blue-400">
                News
              </button>
              <button className="transition cursor-pointer py-2 border-t border-gray-50 bg-blue-300 hover:bg-blue-400">
                Contact
              </button>
            </div>
          )}
          <div className="hidden md:flex w-[1020px] px-14 justify-evenly">
            <button className="transition cursor-pointer font-semibold hover:text-[#1e3a8a]">
              HOME
            </button>
            <button className="transition cursor-pointer font-semibold hover:text-[#1e3a8a]">
              ABOUT US
            </button>
            <button className="transition cursor-pointer font-semibold hover:text-[#1e3a8a]">
              CURRICULUM
            </button>
            <button className="transition cursor-pointer font-semibold hover:text-[#1e3a8a]">
              STUDENTS
            </button>
            <button className="transition cursor-pointer font-semibold hover:text-[#1e3a8a]">
              NEWS
            </button>
            <button className="transition cursor-pointer font-semibold hover:text-[#1e3a8a]">
              CONTACT
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Navbar;
