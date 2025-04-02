import { useState } from 'react';
import ResultItens from './resultItens';

interface ResultMenuProps {}
export default function ResultMenu(props: ResultMenuProps) {
  const [peopleSelected, setPeople] = useState(false);

  const structures = [
    "Projeção de materiais",
    "Danos estruturais menores",
    "Danos estruturais medianos",
    "Janelas se quebram",
    "Colapso de paredes e telhados",
    "Demolição de prédios e tanques metálicos",
    "Vagões carregados se tombam"
  ]

  const people = [
    "Projeção de materiais",
    "Sensação leve da onda de choque",
    "Risco de ferimentos leves por estilhaços",
    "Risco de ferimentos por estilhaços",
    "Danos pulmonares leves, possível ruptura de tímpano",
    "Ruptura do tímpano em 50% dos casos, danos pulmonares graves",
    "Alta probabilidade de óbito por danos internos"
  ]
  return (
    <>
      <ResultItens
        pressure={1}
        distance={210}
        text= {peopleSelected ? people[0] : structures[0]}
        bgColor="bg-blue-300"
      />
      <ResultItens
        pressure={2}
        distance={113}
        text= {peopleSelected ? people[1] : structures[1]}
        bgColor="bg-[#b7df71]"
      />
      <ResultItens
        pressure={5}
        distance={54}
        text= {peopleSelected ? people[2] : structures[2]}
        bgColor="bg-[#cce90b]"
      />
      <ResultItens
        pressure={8.5}
        distance={34}
        text= {peopleSelected ? people[3] : structures[3]}
        bgColor="bg-yellow-400"
      />
      <ResultItens
        pressure={14}
        distance={23}
        text= {peopleSelected ? people[4] : structures[4]}
        bgColor="bg-amber-500"
      />
      <ResultItens
        pressure={28}
        distance={14}
        text= {peopleSelected ? people[5] : structures[5]}
        bgColor="bg-orange-500"
      />
      <ResultItens
        pressure={55}
        distance={10}
        text= {peopleSelected ? people[6] : structures[6]}
        bgColor="bg-red-500"
        textColor="text-white"
      />
      <div className="flex h-full mt-2 gap-4 text-gray-600">
        <div onClick={() => {setPeople(false)}} className={`flex-1 cursor-pointer bg-slate-300 h-10 rounded-lg flex justify-center items-center ${!peopleSelected ? "shadow-[inset_0px_0px_4px_1px_rgba(0,0,0,0.25)]" : "shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)]"}`}>
          Estruturas
        </div>
        <div onClick={() => {setPeople(true)}} className={`flex-1 cursor-pointer bg-slate-300 h-10 rounded-lg flex justify-center items-center ${peopleSelected ? "shadow-[inset_0px_0px_4px_1px_rgba(0,0,0,0.25)]" : "shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)]"}`}>
          Pessoas
        </div>
      </div>
    </>
  );
}
