'use client';

import MapWithGeocoder from '@/components/searchMap/page';
import Search from '@/components/ui/search';
import SideNav from '@/components/ui/sideNav';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export default function V2() {
  return (
    <div className="relative h-screen w-screen bg-slate-400 overflow-hidden">
      <MapWithGeocoder />
      <SideNav />
      <Search />
      <div className="absolute top-3 right-3 z-50 bg-white p-[2px] rounded-full">
        <Avatar className="cursor-pointer" sx={{ bgcolor: deepOrange[500] }}>
          RC
        </Avatar>
      </div>
    </div>
  );
}
