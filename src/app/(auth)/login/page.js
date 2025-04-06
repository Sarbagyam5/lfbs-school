"use client";
import LoginForm from "@/components/loginForm";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import portalImage from "@/assets/images/LoginPortal2.png";

function page() {
  const path = usePathname();
  return (
    <div className="flex p-4 justify-center items-center w-full h-svh bg-gradient-to-r to-blue-200 via-blue-400 from-blue-600">
      <div className=" w-[1080px] p-4 md:flex shadow-xl shadow-blue-800 justify-between  rounded bg-gradient-to-r to-[#fcfbf8] via-[#fcfbf8] from-white">
        <div className="md:border-r flex items-center  w-full">
          <LoginForm />
        </div>
        <div className="hidden md:display w-full md:flex bg-[#fcfbf8] flex-row items-center justify-center">
          <Image src={portalImage} height={500}></Image>
        </div>
      </div>
    </div>
  );
}

export default page;
