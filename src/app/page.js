import Image from "next/image";
import SchoolImage from "@/assets/images/school.png";
import { IoIosArrowDropright } from "react-icons/io";

export default function Home() {
  return (
    <div className="max-w-[1020px] m-4">
      <Image
        src={SchoolImage}
        height={2617}
        width={4608}
        style={{ height: "auto", width: "auto" }}
        className="md:object-contain"
      />
      <div className="transition flex flex-col md:flex-row  w-full mt-4">
        <div className="h-32 pt-4 px-4 flex flex-col w-full items-center cursor-pointer bg-blue-500 hover:bg-blue-600">
          <h1 className="font-semibold text-sm">WELCOME</h1>
          <p className="text-xs italic">Message from the Head</p>
          <IoIosArrowDropright className=" text-3xl mt-4" />
        </div>
        <div className="transition h-32 pt-4 px-4 flex flex-col w-full items-center  cursor-pointer bg-orange-400 hover:bg-orange-500">
          <h1 className="font-semibold text-sm">LATEST NEWS</h1>
          <p className="text-xs italic">What's happening at School</p>
          <IoIosArrowDropright className=" text-3xl mt-4" />
        </div>
        <div className="transition h-32  pt-4 px-4 flex flex-col w-full items-center cursor-pointer bg-purple-600 hover:bg-purple-700">
          <h1 className="font-semibold text-sm">UPCOMING EVENTS</h1>
          <p className="text-xs italic">Dates for your diary</p>
          <IoIosArrowDropright className=" text-3xl mt-4" />
        </div>
        <div className="transition h-32 pt-4 px-4 flex flex-col w-full items-center cursor-pointer bg-red-500 hover:bg-red-600">
          <h1 className="font-semibold text-sm">PROSPECTUS</h1>
          <p className="text-xs italic">Download the latest brochure</p>
          <IoIosArrowDropright className=" text-3xl mt-4" />
        </div>
      </div>
    </div>
  );
}
