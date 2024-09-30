"use client";

import { ReactNode, createContext, useState } from "react";

export const TNOContext = createContext({
  calor: 3.3,
  velocidade: 344.0,
  pressao: 101325.0,
  volume: 58.34,
  clas: 7,
  xs: [] as number[],
  overPressures: [] as number[],
  zoom: 15,
  limites: [] as number[],
  setCalor: (value: number) => {},
  setVelocidade: (value: number) => {},
  setPressao: (value: number) => {},
  setVolume: (value: number) => {},
  setClas: (value: number) => {},
  setXs: (value: number[]) => {},
  setOverPressures: (value: number[]) => {},
  setZoom: (value: number) => {},
  setLimites: (value: number[]) => {},
});

interface ProviderProps {
  children: ReactNode;
}

export function TNOContextProvider({ children }: ProviderProps) {
  const [calor, setCalor] = useState(3.3);
  const [velocidade, setVelocidade] = useState(344.0);
  const [pressao, setPressao] = useState(101325.0);
  const [volume, setVolume] = useState(58.34);
  const [clas, setClas] = useState(7);
  const [xs, setXs] = useState([] as number[]);
  const [overPressures, setOverPressures] = useState([] as number[]);
  const [zoom, setZoom] = useState(15);
  const [limites, setLimites] = useState([] as number[]);

  return (
    <TNOContext.Provider
      value={{
        calor,
        velocidade,
        pressao,
        volume,
        clas,
        xs,
        overPressures,
        zoom,
        limites,
        setCalor,
        setVelocidade,
        setPressao,
        setVolume,
        setClas,
        setXs,
        setOverPressures,
        setZoom,
        setLimites
      }}
    >
      {children}
    </TNOContext.Provider>
  );
}
