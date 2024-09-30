"use client";
import { useTNO } from "@/hooks/useTNO";
import { Box, Slider, TextField } from "@mui/material";
import TNO from "../TNO/page";

export default function InfoContainer() {
  const {
    calor,
    velocidade,
    pressao,
    volume,
    clas,
    zoom,
    setCalor,
    setVelocidade,
    setPressao,
    setVolume,
    setClas,
  } = useTNO();

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

  return (
    <div className="p-2 flex flex-col items-center bg-slate-200 rounded-lg">
      <div className="text-3xl font-bold text-center w-full my-6">
        Simulador TNO
      </div>
      <div className="mt-4 grid gap-2 grid-cols-2">
        <TextField
          id="calor"
          label="Calor de combustão em MJ/m³"
          value={calor}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCalor(parseFloat(event.target.value));
          }}
        />
        <TextField
          id="vel"
          label="Velocidade do som m/s"
          value={velocidade}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setVelocidade(parseFloat(event.target.value));
          }}
        />
        <TextField
          id="pres"
          label="Pressão do ambiente em Pa"
          value={pressao}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPressao(parseFloat(event.target.value));
          }}
        />
        <TextField
          id="vol"
          label="Volume total em m³"
          value={volume}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setVolume(parseFloat(event.target.value));
          }}
        />
      </div>
      <Box className="mt-5" sx={{ width: 350 }}>
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
      <TNO />
    </div>
  );
}
