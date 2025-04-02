'use client';

import Image from 'next/image';
import ConfigMenu from '../config/configMenu';
import ResultMenu from '../config/resultMenu';
import { useEffect, useState } from 'react';
import ConfigMenuCompressed from '../config/configMenuCompressed';

import { useTNO } from '@/hooks/useTNO';
import * as tables from '@/utils/tables'

export default function SideNav() {
  const [configMode, setConfigMode] = useState(true);
  const [expanded, setExpanded] = useState(true);

  const {
    calor,
    velocidade,
    pressao,
    volume,
    clas,
    perc,
    fator,
    setXs,
    setOverPressures,
    setLimites,
  } = useTNO();

  function vlookup(
    lookupValue: number,
    data: number[][],
    colIndex: number,
    sorted: boolean = false
  ): number | null {
    if (!sorted) {
      for (let row of data) {
        if (row[0] === lookupValue) {
          return row[colIndex - 1];
        }
      }
      return null; // Valor não encontrado
    }

    let lastValidValue: number[] | null = null;
    for (let row of data) {
      if (row[0] === lookupValue) {
        return row[colIndex - 1];
      } else if (row[0] > lookupValue) {
        break;
      }
      lastValidValue = row;
    }

    return lastValidValue ? lastValidValue[colIndex - 1] : null;
  }

  function nextValueInColumn(
    lookupValue: number,
    data: number[][]
  ): number | null {
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i][0] === lookupValue) {
        return data[i + 1][0]; // Retorna o valor da próxima linha na mesma coluna
      }
    }
    return null; // Caso o valor não seja encontrado ou esteja na última linha
  }

  function calcEnergy(calorComb: number, volInflamavel: number): number {
    return calorComb * volInflamavel;
  }

  function calcStaggeredDistance(
    energyMJ: number,
    distInteresse: number,
    pressaoAmbiente: number
  ): number {
    return (
      distInteresse /
      Math.pow((energyMJ * Math.pow(10, 6)) / pressaoAmbiente, 1 / 3)
    );
  }

  function getX0(
    staggeredDistance: number,
    overpressureTable: number[][]
  ): number {
    if (staggeredDistance < overpressureTable[0][0]) {
      return overpressureTable[0][0];
    }

    if (
      staggeredDistance > overpressureTable[overpressureTable.length - 1][0]
    ) {
      return overpressureTable[overpressureTable.length - 2][0];
    }

    return vlookup(staggeredDistance, overpressureTable, 1, true) as number;
  }

  function getX1(x0: number, overpressureTable: number[][]): number {
    return nextValueInColumn(x0, overpressureTable) || x0;
  }

  function getY(x: number, overpressureTable: number[][]): number | null {
    return vlookup(x, overpressureTable, 2);
  }

  function calcScaledValue(
    staggeredDistance: number,
    x0: number,
    x1: number,
    y0: number,
    y1: number
  ): number {
    if (staggeredDistance === 0) {
      return 0;
    } else {
      const xNew: number = staggeredDistance;

      if (x1 - x0 === 0) {
        throw new Error("Cannot compute slope because min1 equals max1.");
      }

      const m: number = (y1 - y0) / (x1 - x0);
      const b: number = y0 - m * x0;

      // Compute the predicted y-value
      return m * xNew + b;
    }
  }

  function calcSideonOverPressure(
    scaledOverPressure: number,
    ambientPressureKPa: number
  ): number {
    return scaledOverPressure * ambientPressureKPa;
  }

  function calcDuration(
    scaledDuration: number,
    energy: number,
    ambientPressurePa: number,
    soundSpeed: number
  ): number {
    return (
      (scaledDuration *
        Math.pow(energy / ambientPressurePa, 1 / 3) *
        Math.pow(10, 5)) /
      soundSpeed
    );
  }

  function calcIntervalSideonOverPressure(
    xMin: number,
    xMax: number,
    ambientPressureKPa: number
  ): number[] {
    const sideonOverPressures: number[] = [];
    for (let x = xMin; x <= xMax; x++) {
      sideonOverPressures.push(calcSideonOverPressure(x, ambientPressureKPa));
    }
    return sideonOverPressures;
  }

  function calcIntervalDuration(
    xMin: number,
    xMax: number,
    energy: number,
    ambientPressurePa: number,
    soundSpeed: number
  ): number[] {
    const durations: number[] = [];
    for (let x = xMin; x <= xMax; x++) {
      durations.push(calcDuration(x, energy, ambientPressurePa, soundSpeed));
    }
    return durations;
  }

  function getMoreImportantImpactsRadius(
    xs: number[],
    overPressures: number[]
  ): (number | null)[] {
    const data1 = overPressures
      .slice()
      .reverse()
      .map((pressure, index) => [pressure, xs[xs.length - 1 - index]]);

    // Area segura
    const res0 = vlookup(1.03, data1, 2, true);
    // Demolição parcial de casas, tornando-as inabitáveis
    const res1 = vlookup(2.07, data1, 2, true);
    // Colapso parcial de paredes e telhados de casas
    const res2 = vlookup(4.8, data1, 2, true);
    // 50% de destruição de quarteirões de casas
    const res3 = vlookup(8.3, data1, 2, true);
    // Ruptura de revestimento de edifícios industriais leves
    const res4 = vlookup(13.8, data1, 2, true);
    // Demolição quase completa de casas
    const res5 = vlookup(27.6, data1, 2, true);
    // Vagões ferroviários carregados virados
    const res6 = vlookup(55.1, data1, 2, true);

    return [res0, res1, res2, res3, res4, res5, res6];
  }

  function calcAll(
    clas: number,
    distInteresse: number,
    pressaoAmbiente: number,
    velSom: number
  ) {
    let blast_overpressure_table;
    let blast_duration_table;
    switch (clas) {
      case 10:
        blast_overpressure_table = tables.blast_10_overpressure_table;
        blast_duration_table = tables.blast_10_duration_table;
        break;
      case 9:
        blast_overpressure_table = tables.blast_9_overpressure_table;
        blast_duration_table = tables.blast_9_duration_table;
        break;
      case 8:
        blast_overpressure_table = tables.blast_8_overpressure_table;
        blast_duration_table = tables.blast_8_duration_table;
        break;
      case 7:
        blast_overpressure_table = tables.blast_7_overpressure_table;
        blast_duration_table = tables.blast_7_duration_table;
        break;
      case 6:
        blast_overpressure_table = tables.blast_6_overpressure_table;
        blast_duration_table = tables.blast_6_duration_table;
        break;
      case 5:
        blast_overpressure_table = tables.blast_5_overpressure_table;
        blast_duration_table = tables.blast_5_duration_table;
        break;
      case 4:
        blast_overpressure_table = tables.blast_4_overpressure_table;
        blast_duration_table = tables.blast_4_duration_table;
        break;
      case 3:
        blast_overpressure_table = tables.blast_3_overpressure_table;
        blast_duration_table = tables.blast_3_duration_table;
        break;
      case 2:
        blast_overpressure_table = tables.blast_2_overpressure_table;
        blast_duration_table = tables.blast_2_duration_table;
        break;
      default:
        blast_overpressure_table = tables.blast_1_overpressure_table;
        blast_duration_table = tables.blast_1_duration_table;
    }
    // # Cálculo de energia
    const energy = calcEnergy(calor, volume * perc);
    // # Cálculo de distancia escalonada
    const staggeredDistance = calcStaggeredDistance(
      energy,
      distInteresse,
      pressaoAmbiente
    );

    // # Cálculo de sobre pressão escalonada
    let x0 = getX0(staggeredDistance, blast_overpressure_table);
    let x1 = getX1(x0, blast_overpressure_table);
    let y0 = getY(x0, blast_overpressure_table) || 0;
    let y1 = getY(x1, blast_overpressure_table) || 0;
    let scaledOverPressure = 0;
    try {
      scaledOverPressure = calcScaledValue(
        staggeredDistance,
        x0,
        x1,
        y0,
        y1
      );
    } catch (error) {
      console.error(error);
    }
    const overPressure = calcSideonOverPressure(
      scaledOverPressure,
      pressao / 1000
    );

    // # Cálculo de duração escalonada
    x0 = getX0(staggeredDistance, blast_duration_table);
    x1 = getX1(x0, blast_duration_table);
    y0 = getY(x0, blast_duration_table) || 0;
    y1 = getY(x1, blast_duration_table) || 0;
    let scaledDuration = 0;
    try {
      scaledDuration = calcScaledValue(staggeredDistance, x0, x1, y0, y1);
    } catch (error) {
      console.error(error);
    }
    const duration = calcDuration(
      scaledDuration,
      energy,
      pressaoAmbiente,
      velSom
    );

    return [overPressure, duration];
  }

  function getConsequencia(value: number) {
    if (value == 6) return "Vagões ferroviários carregados virados";
    if (value == 5) return "Demolição de prédios e colapso de tanques";
    if (value == 4) return "Colapso parcial de paredes e telhados";
    if (value == 3) return "Janelas quebradas e deformação de paineis de alumínio";
    if (value == 2) return "Danos a estrutura de casas";
    if (value == 1) return "Danos estruturais menores";
    if (value == 0) return "Área afetada por projeção de material";
    return "";
  }

  function getPression(value: number) {
    if (value == 6) return 55.1;
    if (value == 5) return 27.6;
    if (value == 4) return 13.8;
    if (value == 3) return 8.3;
    if (value == 2) return 4.8;
    if (value == 1) return 2.07;
    if (value == 0) return 1.03;
    return 0;
  }

  useEffect(() => {
    let durations = [];
    let over_cal = [];
    let xs_calc = [];
    for (let i = 1; i < 3000; i++) {
      const [overPressure, duration] = calcAll(clas, i, pressao, velocidade);
      over_cal.push(overPressure * (fator / 100));
      durations.push(duration);
      xs_calc.push(i);
      // console.log(`X: ${i} | overPressure: ${overPressure}`)
    }

    setOverPressures(over_cal);
    setXs(xs_calc);

    setLimites(
      getMoreImportantImpactsRadius(xs_calc, over_cal).map((x) => x || 0)
    );
    console.log(fator / 100)
  }, [clas, pressao, velocidade, calor, volume, perc, fator]);

  return (
    <div
      className={`flex absolute top-0 left-0 h-screen shadow-[30px_0px_30px_rgba(0,0,0,0.3)] z-40 flex-col bg-gray-100 ${
        expanded ? 'w-96' : 'w-20'
      }`}
    >
      {/* Título */}
      <div className="flex h-20 justify-start items-center bg-white border-b">
        <span
          onClick={() => {
            // setExpanded(!expanded);
          }}
          className="relative w-6 h-4 cursor-pointer ml-7"
        >
          <Image src={'/Hamburguer.png'} alt="Menu" fill />
        </span>
        {expanded && (
          <div className="flex-1 flex justify-center">
            <div className="relative cursor-pointer w-52 h-7">
              <Image src={'/Logo.png'} alt="BlastImpact Sim" fill />
            </div>
          </div>
        )}
      </div>
      {/* Menu */}
      <div className="flex text-gray-600 font-semibold items-center h-12">
        {expanded && (
          <>
            <div
              onClick={() => {
                setConfigMode(true);
              }}
              className={`flex-1 cursor-pointer h-full flex justify-center items-center ${
                configMode
                  ? ''
                  : 'shadow-[inset_2px_-2px_4px_rgba(0,0,0,0.2)] bg-gray-300'
              }`}
            >
              Configurações
            </div>
            <div
              onClick={() => {
                setConfigMode(false);
              }}
              className={`flex-1 cursor-pointer h-full flex justify-center items-center ${
                !configMode
                  ? ''
                  : 'shadow-[inset_2px_-2px_4px_rgba(0,0,0,0.2)] bg-gray-300'
              }`}
            >
              Resultados
            </div>
          </>
        )}
      </div>
      <div className="h-full p-6 pb-2 flex flex-col justify-between">
        <div className="flex gap-3 flex-col">
          {!expanded ? (
            <ConfigMenuCompressed />
          ) : configMode ? (
            <ConfigMenu />
          ) : (
            <ResultMenu />
          )}
        </div>
        <div className="text-gray-600 text-xs w-full flex justify-center">
          {expanded ? 'Simulador de explosão TNO' : 'TNO'}
        </div>
      </div>
    </div>
  );
}
