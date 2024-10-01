"use client"
import InfoContainer from "../components/InfoContainer/page";
import MapWithGeocoder from "../components/searchMap/page";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-slate-100 p-6 rounded-md flex gap-3">
        <InfoContainer />
        <div className="h-[30rem] w-[40rem] rounded-lg overflow-hidden">
          <MapWithGeocoder />
        </div>
      </div>
    </div>
  );
}
