import ResultItens from './resultItens';

interface ResultMenuProps {}
export default function ResultMenu(props: ResultMenuProps) {
  return (
    <>
      <ResultItens
        pressure={1}
        distance={210}
        text="Projeção de materiais"
        bgColor="bg-blue-300"
      />
      <ResultItens
        pressure={2}
        distance={113}
        text="Danos estruturais menores"
        bgColor="bg-[#b7df71]"
      />
      <ResultItens
        pressure={5}
        distance={54}
        text="Danos estruturais medianos"
        bgColor="bg-[#cce90b]"
      />
      <ResultItens
        pressure={8.5}
        distance={34}
        text="Janelas se quebram"
        bgColor="bg-yellow-400"
      />
      <ResultItens
        pressure={14}
        distance={23}
        text="Colapso de paredes e telhados"
        bgColor="bg-amber-500"
      />
      <ResultItens
        pressure={28}
        distance={14}
        text="Demolição de prédios e tanques metálicos"
        bgColor="bg-orange-500"
      />
      <ResultItens
        pressure={55}
        distance={10}
        text="Vagões carregados se tombam"
        bgColor="bg-red-500"
        textColor="text-white"
      />
      <div className="flex h-full mt-2 gap-4 text-gray-600">
        <div className="flex-1 shadow-[inset_0px_0px_4px_1px_rgba(0,0,0,0.25)] cursor-pointer bg-slate-300 h-10 rounded-lg flex justify-center items-center">
          Estruturas
        </div>
        <div className="flex-1 shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)] cursor-pointer bg-slate-300 h-10 rounded-lg flex justify-center items-center">
          Pessoas
        </div>
      </div>
    </>
  );
}
