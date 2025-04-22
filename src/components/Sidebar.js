import React, { useState } from "react";
import schoolLogo from "@/assets/images/SchoolLogo.png";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiExamBold } from "react-icons/pi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { GoReport } from "react-icons/go";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import Link from "next/link";
import { portal } from "@/constant/routes";
import { IoMdArrowDropright } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { FaBookOpen } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";

function Sidebar() {
  const pathName = usePathname();
  const requiredPathname = pathName.split("/");

  const mainPathname = requiredPathname[2];
  const subPathName = requiredPathname[3];

  const [pathnameClick, setPathnameClick] = useState([]);

  const removePathname = (itemToRemove) => {
    setPathnameClick((path) => path.filter((item) => item !== itemToRemove));
  };

  const buttons = [
    {
      icon: <MdOutlineSpaceDashboard />,
      label: "Dashboard",
      path: "dashboard",
    },
    {
      icon: <HiOutlineAcademicCap />,
      label: "Academic Year",
      path: "academicYear",
    },
    {
      icon: <FaBookOpen />,
      label: "Subject",
      path: "subject",
    },
    {
      icon: <SiGoogleclassroom />,
      label: "Classroom",
      path: "classroom",
    },
    {
      icon: <PiStudentBold />,
      label: "Student",
      path: "student",
      subRoutes: [
        { label: "View Students", path: "view" },
        { label: "Add Students", path: "add" },
        { label: "Bulk Update", path: "bulkUpdate" },
        { label: "Promote", path: "promote" },
      ],
    },
    {
      icon: <FaChalkboardTeacher />,
      label: "Teacher/Staff",
      path: "staff",
      subRoutes: [
        { label: "View Staffs", path: "view" },
        { label: "Add Staff", path: "add" },
        { label: "Assign Subject", path: "assignSubject" },
      ],
    },
    {
      icon: <PiExamBold />,
      label: "Exam",
      path: "exam",
    },
    {
      icon: <RiMoneyRupeeCircleLine />,
      label: "Account",
      path: "account",
    },
    {
      icon: <GoReport />,
      label: "Report",
      path: "report",
    },
  ];

  return (
    <div className="h-svh relative">
      {/* Heading of SideBar */}
      <div className="flex p-4 pt-7 bg-blue-500 sticky top-0 border-b border-b-gray-400 shadow-xl ">
        <h2 className="text-gray-300 w-3/4 flex-col flex">
          <span className="font-black text-xl">Little Flowers'</span>
          <span className="font-semibold">Boarding School</span>
        </h2>
        <div className="flex w-1/4 items-center">
          <Image
            src={schoolLogo}
            alt="school logo"
            width={500}
            height={500}
            style={{ height: "auto", width: "auto", maxHeight: "100px" }}
            className="object-contain"
          />
        </div>
      </div>

      {/* Buttons of SideBar */}
      <div className="my-12">
        {buttons.map((button, index) => (
          <div key={index}>
            {button.subRoutes ? ( // Checking if the button has sub-routes
              // These are buttons with sub-buttons
              <div>
                <button
                  onClick={() => {
                    pathnameClick.includes(button.path)
                      ? removePathname(button.path)
                      : setPathnameClick((prev) => [...prev, button.path]);
                  }}
                  className={`transition-all duration-300 flex w-full items-center p-2 px-5 border-b-1 border-b-gray-400 cursor-pointer text-lg ${
                    !pathnameClick.includes(button.path) &&
                    mainPathname === button.path
                      ? "bg-green-600 hover:bg-green-400"
                      : "hover:bg-green-400"
                  }`}
                >
                  <span className="text-xl mr-2">{button.icon}</span>
                  {button.label}
                  <span className="ml-auto">
                    {pathnameClick.includes(button.path) ? (
                      <MdArrowDropDown />
                    ) : (
                      <IoMdArrowDropright />
                    )}
                  </span>
                </button>
                {pathnameClick.includes(button.path) && // These are the sub-buttons
                  button.subRoutes.map((subRoute, subIndex) => (
                    <Link
                      href={`${portal}/${button.path}/${subRoute.path}`}
                      key={subIndex}
                      className={`transition-all duration-300 flex w-full items-center text-white p-2 px-10 border-b-gray-400 cursor-pointer text-lg ${
                        subPathName === subRoute.path &&
                        mainPathname === button.path
                          ? "bg-green-600 hover:bg-green-400"
                          : "bg-blue-400"
                      } hover:bg-green-400`}
                    >
                      <GoDotFill className="mr-2" />
                      {subRoute.label}
                    </Link>
                  ))}
              </div>
            ) : (
              // These are buttons without sub-routes
              <Link
                href={`${portal}/${button.path}`}
                className={`transition-all duration-300 flex w-full items-center p-2 px-5 border-b-1 border-b-gray-400 cursor-pointer text-lg ${
                  mainPathname === button.path
                    ? "bg-green-600 hover:bg-green-400"
                    : "hover:bg-green-400"
                }`}
              >
                <span className="text-xl mr-2">{button.icon}</span>
                {button.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
