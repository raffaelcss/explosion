"use client"
import InfoContainer from "../components/InfoContainer/page";
import MapWithGeocoder from "../components/searchMap/page";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full md:h-screen">
      <div className="p-6 rounded-md flex flex-col md:flex-row items-center gap-3">
        <InfoContainer />
        <div className="h-[15rem] md:h-[30rem] w-[22rem] md:w-[40rem] bg-red-500 rounded-lg overflow-hidden">
          <MapWithGeocoder />
        </div>
      </div>
    </div>
  );
}
