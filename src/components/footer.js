"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Footer() {
  const pathName = usePathname();
  const absolutePath = pathName.split("/")[1];

  return (
    absolutePath != "portal" && (
      <div className="p-10 bg-gradient-to-r to-blue-400 via-blue-500 from-blue-600 justify-center min-h-36 flex-col flex xl:flex-row xl:items-center xl:justify-evenly">
        <div>
          <p className=" text-sm">
            © 2055 Little Flowers&apos; Boarding School ·{" "}
            <a href="#" className="text-yellow-200 px-1 ">
              Legal Information
            </a>
            · Letang-5, Morang, Koshi, nepal
            <br />
            Tel: 021-560106 Email:
            <a href="#" className="text-yellow-200 px-1 cursor-pointer">
              littleflower2055@gmail.com
            </a>
          </p>
        </div>
        <div className="flex-col mt-2 flex sm:items-end">
          <p className="text-sm"> School Website Designed and Developed</p>

          <p className="text-sm">
            by
            <a href="#" className="ml-1 cursor-pointer text-yellow-200">
              Sarbagya Ghimire
            </a>
          </p>
        </div>
      </div>
    )
  );
}

export default Footer;
