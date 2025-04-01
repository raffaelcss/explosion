'use client';

import Image from 'next/image';

export default function Search() {
  return (
    <div className="absolute shadow-[0px_2px_4px_rgba(0,0,0,0.2)] cursor-text pl-4 flex gap-3 items-center left-4 top-3 z-50 w-96 py-2 rounded-3xl bg-white">
      <span className="relative w-4 h-4">
        <Image src={'/search.png'} alt="Buscar" fill />
      </span>
      <input
      placeholder='Pesquise um local no mapa'
        type="text"
        className="w-full mr-4 h-8 border-none focus:outline-none"
      />
    </div>
  );
}
