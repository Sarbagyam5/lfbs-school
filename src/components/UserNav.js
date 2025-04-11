import React from "react";
import { CiSettings } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

function UserNav() {
  return (
    <div className="flex items-center justify-around absolute top-0 right-0 w-40 h-10 rounded-bl-full text-black p-2 pl-8 text-2xl bg-white border-b-2 border-gray-700 ">
      <IoMdNotificationsOutline className="text-gray-700 cursor-pointer" />
      <CiSettings className="text-gray-700 cursor-pointer hover:animate-spin " />
      <div className="flex w-8 h-8 bg-gray-200 text-gray-700 rounded-full border-2 text-xl items-center justify-center right-2 cursor-pointer hover:shadow-lg">
        <FaRegUser />
      </div>
    </div>
  );
}

export default UserNav;
