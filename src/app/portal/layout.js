"use client";
import Sidebar from "@/components/Sidebar";
import UserNav from "@/components/UserNav";
import { RxHamburgerMenu } from "react-icons/rx";

import { usePathname } from "next/navigation";
import React, { useState } from "react";

function portalLayout({ children }) {
  const pathName = usePathname();
  const subPathName = pathName.split("/")[2];

  const [sidebarVisible, setSidebarVisible] = useState(false);

  return subPathName != "login" ? (
    <div className="w-full bg-gray-200 relative ">
      <div
        className={`sidebar-scroll w-[270px]  bg-blue-500 overflow-y-auto rounded-tr-4xl absolute transition-all duration-300 ease-in-out border-r-2 border-r-blue-400 shadow-[4px_0_4px_-2px_rgba(0,0,0,0.3)] ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 z-20`}
      >
        <Sidebar />
      </div>
      <div
        onClick={() => setSidebarVisible(false)}
        className="h-svh w-auto overflow-y-auto p-4 relative sm:relative sm:ml-64 transition-all duration-300 ease-in-out"
      >
        <UserNav />

        <div
          onClick={(e) => {
            e.stopPropagation();
            setSidebarVisible(!sidebarVisible);
          }}
          className=" text-blue-800 text-xl border-b sm:hidden h-6 border-b-gray-200 cursor-pointer"
        >
          <RxHamburgerMenu />
        </div>
        {children}
      </div>
    </div>
  ) : (
    <div className="flex w-full ">{children}</div>
  );
}

export default portalLayout;
