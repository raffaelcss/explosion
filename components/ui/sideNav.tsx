'use client';

import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import Image from 'next/image';
import ConfigItens from '../config/configItens';
import ConfigMenu from '../config/configMenu';
import ResultMenu from '../config/resultMenu';

export default function SideNav() {
  return (
    <div className="flex shadow-[30px_0px_30px_rgba(0,0,0,0.3)] z-40 flex-col bg-gray-100 w-[27rem]">
      {/* Título */}
      <div className="flex h-20 justify-start items-center bg-white border-b">
        <span className="relative w-6 h-4 cursor-pointer ml-7">
          <Image src={'/Hamburguer.png'} alt="Menu" fill />
        </span>
        <div className="flex-1 flex justify-center">
          <div className="relative cursor-pointer w-52 h-7">
            <Image src={'/Logo.png'} alt="BlastImpact Sim" fill />
          </div>
        </div>
      </div>
      {/* Menu */}
      <div className="flex text-gray-600 font-semibold items-center h-12">
        <div className="flex-1 cursor-pointer h-full flex justify-center items-center">
          Configurações
        </div>
        <div className="flex-1 cursor-pointer h-full shadow-[inset_2px_-2px_4px_rgba(0,0,0,0.2)] bg-gray-300 flex justify-center items-center">
          Resultados
        </div>
      </div>
      <div className="h-full p-6 pb-2 flex flex-col justify-between">
        <div className='flex gap-3 flex-col'>
          <ResultMenu />
        </div>
        <div className="text-gray-600 text-xs w-full flex justify-center">
          Simulador de explosão TNO
        </div>
      </div>
    </div>
  );
}
