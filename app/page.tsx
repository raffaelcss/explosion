"use client";
import { Avatar } from "@mui/material";
import InfoContainer from "../components/InfoContainer/page";
import MapWithGeocoder from "../components/searchMap/page";
import { deepOrange } from "@mui/material/colors";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full md:h-screen">
      <div className="bg-slate-200 h-24 w-full flex justify-between items-center px-6 gap-2">
        <div className="mt-5 cursor-pointer">
{/*           <Image
            src="/Logo_Aperam.png"
            alt="Aperam logo"
            height={55}
            width={194}
          /> */}
        </div>
        <div className="flex gap-2 items-center">
          <div className="cursor-default text-lg text-slate-700">Raffael C.</div>
          <Avatar className="cursor-pointer" sx={{ bgcolor: deepOrange[500] }}>RC</Avatar>
        </div>
      </div>
      <div className="p-6 rounded-md flex flex-col md:flex-row items-center gap-3">
        <InfoContainer />
        <div className="h-[15rem] md:h-[30rem] w-[22rem] md:w-[40rem] bg-red-500 rounded-lg overflow-hidden">
          <MapWithGeocoder />
        </div>
      </div>
    </div>
  );
}
