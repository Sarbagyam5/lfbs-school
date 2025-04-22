"use client";
import Image from "next/image";
import SchoolImage1 from "@/assets/images/school.png";
import SchoolImage2 from "@/assets/images/school2.jpg";
import { IoIosArrowDropright } from "react-icons/io";
import { useEffect, useState, useMemo } from "react";

export default function Home() {
  const images = useMemo(() => [SchoolImage1, SchoolImage2], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []); // No need to depend on `images` anymore

  return (
    <div className="max-w-[1020px] m-4">
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={images[currentIndex]}
          height={2617}
          width={4608}
          className="w-full h-auto object-contain md:w-auto"
          alt="school image"
        />
      </div>
      <div className="transition flex flex-col md:flex-row w-full mt-4">
        <div className="h-32 pt-4 px-4 flex flex-col w-full items-center cursor-pointer bg-blue-500 hover:bg-blue-600">
          <h1 className="font-semibold text-sm">WELCOME</h1>
          <p className="text-xs italic">Message from the Head</p>
          <IoIosArrowDropright className="text-3xl mt-4" />
        </div>
        <div className="transition h-32 pt-4 px-4 flex flex-col w-full items-center cursor-pointer bg-orange-400 hover:bg-orange-500">
          <h1 className="font-semibold text-sm">LATEST NEWS</h1>
          <p className="text-xs italic">What's happening at School</p>
          <IoIosArrowDropright className="text-3xl mt-4" />
        </div>
        <div className="transition h-32 pt-4 px-4 flex flex-col w-full items-center cursor-pointer bg-purple-600 hover:bg-purple-700">
          <h1 className="font-semibold text-sm">UPCOMING EVENTS</h1>
          <p className="text-xs italic">Dates for your diary</p>
          <IoIosArrowDropright className="text-3xl mt-4" />
        </div>
        <div className="transition h-32 pt-4 px-4 flex flex-col w-full items-center cursor-pointer bg-red-500 hover:bg-red-600">
          <h1 className="font-semibold text-sm">PROSPECTUS</h1>
          <p className="text-xs italic">Download the latest brochure</p>
          <IoIosArrowDropright className="text-3xl mt-4" />
        </div>
      </div>
    </div>
  );
}
