"use client";
import { useTNO } from "@/hooks/useTNO";
import { Box, Slider, TextField } from "@mui/material";
import TNO from "../TNO/page";
import { useState } from "react";

export default function InfoContainer() {
  const {
    calor,
    velocidade,
    pressao,
    volume,
    clas,
    perc,
    setCalor,
    setVelocidade,
    setPressao,
    setVolume,
    setClas,
    setPerc
  } = useTNO();

  const [val1, setval1] = useState(calor.toFixed(1));
  const [val2, setval2] = useState(velocidade.toFixed(1));
  const [val3, setval3] = useState(pressao.toFixed(1));
  const [val4, setval4] = useState(volume.toFixed(1));
  const [val5, setval5] = useState((perc * 100).toFixed(1));

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  function valuetext(value: number) {
    return `${value}`;
  }

  function adjustString(str: string) {
    if (str.indexOf('.') !== str.lastIndexOf('.')) {
      return str.slice(0, -1);
    }
    if (str.startsWith("0")) return str.slice(1, str.length -1);
    return str;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div className="p-2 gap-2 flex flex-col md:flex-row items-center bg-slate-200 rounded-lg h-full">
        <div className="flex w-72 flex-col items-center">
          <div className="text-3xl font-bold text-center w-full my-6">
            BlastImpact Sim
          </div>
          <div className="mt-4 grid gap-y-2 grid-cols-2">
            <TextField
              id="calor"
              label="Calor de combustão em MJ/m³"
              value={val1}
              sx={{ width: '140px' }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setval1(adjustString(event.target.value));
                setCalor(parseFloat(adjustString(event.target.value)));
              }}
            />
            <TextField
              id="vel"
              label="Velocidade do som"
              value={val2}
              sx={{ width: '140px' }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setval2(adjustString(event.target.value));
                setVelocidade(parseFloat(adjustString(event.target.value)));
              }}
            />
            <TextField
              id="pres"
              label="Pressão Pa"
              value={val3}
              sx={{ width: '140px' }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setval3(adjustString(event.target.value));
                setPressao(parseFloat(adjustString(event.target.value) || "0"));
              }}
            />
            <TextField
              id="vol"
              label="Volume total m³"
              value={val4}
              sx={{ width: '140px' }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setval4(adjustString(event.target.value));
                setVolume(parseFloat(adjustString(event.target.value)));
              }}
            />
            <TextField
              id="perc"
              label="Explosividade de interesse em %"
              value={val5}
              sx={{ width: '284px' }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setval5(adjustString(event.target.value));
                setPerc(parseFloat(adjustString(event.target.value)) / 100);
              }}
            />
          </div>
          <Box className="mt-4" sx={{ width: 250 }}>
            <div>Classe</div>
            <Slider
              aria-label="Always visible"
              value={clas}
              onChange={(event: Event, newValue: number | number[]) => {
                setClas(newValue as number);
              }}
              getAriaValueText={valuetext}
              step={1}
              min={1}
              max={10}
              marks={marks}
              valueLabelDisplay="on"
            />
          </Box>
        </div>
        <TNO />
      </div>
      <div className="">Equipe de PSM Aperam South America - 2024</div>
    </div>
  );
}
