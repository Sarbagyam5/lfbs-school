"use client";
import Sidebar from "@/components/Sidebar";
import UserNav from "@/components/UserNav";
import { RxHamburgerMenu } from "react-icons/rx";

import { usePathname, useRouter } from "next/navigation";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { authUser } from "@/utils/axios/axios";

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
          setAuthChecked(false);
          const user = await authUser();
          setUser(user);
          setAuthChecked(true);
        } catch (error) {
          router.push("/portal/login");
        }
      } else {
        try {
          setAuthChecked(false);
          const user = await authUser();
          setAuthChecked(true);

          router.push("/portal/dashboard");
        } catch (error) {
          setAuthChecked(true);
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

  if (!authChecked) {
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
          className={`sidebar-scroll w-[270px]  bg-blue-500 overflow-y-auto h-full rounded-tr-4xl absolute transition-all duration-300 ease-in-out border-r-2 border-r-blue-400 shadow-[4px_0_4px_-2px_rgba(0,0,0,0.3)] ${
            sidebarVisible ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 z-20`}
        >
          <Sidebar />
        </div>
        <div
          onClick={() => setSidebarVisible(false)}
          className="flex min-h-svh w-auto overflow-y-auto pt-4 ml-4 relative sm:relative sm:ml-64 transition-all duration-300 ease-in-out"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSidebarVisible(!sidebarVisible);
            }}
            className=" text-blue-800 text-xl border-b sm:hidden h-6 absolute left-4 top-4 border-b-gray-200 cursor-pointer"
          >
            <RxHamburgerMenu />
          </div>
          <UserNav user={user} />
          <div className="text-black p-2 flex w-full min-h-svh items-center justify-center mt-10 sm:mt-0 mb-4 sm:mb-0 mr-4 sm:mr-0 sm:ml-8  bg-white rounded-tl-3xl rounded-tr-3xl sm:rounded-tr-none rounded-b-2xl sm:rounded-b-none">
            {children}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex w-full ">{children}</div>
  );
}

export default portalLayout;
