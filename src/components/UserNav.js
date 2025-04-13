import React, { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/utils/axios";

function UserNav({ user }) {
  const [userPrflClicked, setUserPrflClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logOut = async () => {
    setLoading(true);
    try {
      await logoutUser();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="top-0 right-0 absolute flex flex-col  items-end">
      <div className="flex items-center justify-around   w-40 h-10 rounded-bl-full text-black p-2 pl-8 text-2xl bg-white border-b-2 border-gray-700 ">
        <IoMdNotificationsOutline className="text-gray-700 cursor-pointer" />
        <CiSettings className="text-gray-700 cursor-pointer hover:animate-spin " />
        <div
          onClick={() => setUserPrflClicked(!userPrflClicked)}
          className="flex w-8 h-8 bg-gray-200 text-gray-700 rounded-full border-2 text-xl items-center justify-center right-2 cursor-pointer hover:shadow-lg"
        >
          <FaRegUser />
        </div>
      </div>
      {userPrflClicked && (
        <div className="bg-white text-gray-700 mt-2 rounded border border-gray-700 p-2 mr-1">
          <div className=" flex flex-col items-center border-b-gray-400 border-b m-r">
            <div className="flex w-16 h-16 bg-gray-200 text-gray-700 rounded-full border-2 text-3xl items-center justify-center ">
              <FaRegUser />
            </div>
            <h1 className="mt-2">Hello {user.name}</h1>
          </div>
          <div className="flex flex-col mt-2 items-start">
            <button className="flex gap-2 w-full items-center rounded hover:shadow  cursor-pointer hover:bg-gray-300 py-1 px-2">
              <CgProfile />
              Profile
            </button>
            <button className="flex gap-2 w-full items-center rounded hover:shadow  cursor-pointer hover:bg-gray-300 py-1 px-2">
              <RiLockPasswordLine />
              Change Password
            </button>
            <button
              onClick={() => logOut()}
              className={`flex gap-2 w-full items-center rounded hover:shadow text-red-600 cursor-pointer hover:bg-gray-300 py-1 px-2 ${
                loading && "opacity-50 pointer-events-none"
              }`}
            >
              <IoLogOutOutline />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserNav;
