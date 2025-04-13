"use client";
import Sidebar from "@/components/Sidebar";
import UserNav from "@/components/UserNav";
import { RxHamburgerMenu } from "react-icons/rx";

import { usePathname, useRouter } from "next/navigation";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { authUser } from "@/utils/axios";

function portalLayout({ children }) {
  const pathName = usePathname();
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setUser] = useState();

  const subPathName = pathName.split("/")[2];

  useEffect(() => {
    const checkAuth = async () => {
      if (subPathName !== "login") {
        try {
          const user = await authUser();
          setUser(user);
          console.log(user);
          setAuthChecked(true);
        } catch (error) {
          router.push("/portal/login");
        }
      }
    };
    checkAuth();
  }, [router, subPathName]);

  const getTitle = () => {
    if (subPathName === "dashboard") return "Dashboard";
    if (subPathName === "users") return "Users";
    if (subPathName === "settings") return "Settings";
    return "Portal";
  };

  if (!authChecked && subPathName !== "login") {
    return (
      <div className="flex h-svh w-full justify-center items-center text-center p-10 text-indigo-600">
        Checking authentication
        <span className="typing-dots" />
      </div>
    );
  }

  return subPathName !== "login" ? (
    <>
      <Head>
        <title>{getTitle()}</title>
      </Head>
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
          <UserNav user={user} />
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
    </>
  ) : (
    <div className="flex w-full ">{children}</div>
  );
}

export default portalLayout;
