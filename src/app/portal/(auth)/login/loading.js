"use client";
import React from "react";

function loading() {
  return (
    <div className="flex p-4 justify-center items-center w-full h-svh bg-gradient-to-r to-blue-200 via-blue-400 from-blue-600">
      <div className=" w-[1080px] p-4 md:flex shadow-xl shadow-blue-800 justify-between  rounded bg-gradient-to-r to-[#fcfbf8] via-[#fcfbf8] from-white">
        <div className="md:border-r flex items-center  w-full">
          <div class="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
        <div className="hidden md:display w-full md:flex bg-[#fcfbf8] flex-row items-center justify-center">
          <div class="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default loading;
