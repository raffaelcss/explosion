
interface ResultItensProps {
  bgColor: string;
  textColor?: string;
  pressure: number;
  distance: number;
  text: string;
}
export default function ResultItens(props: ResultItensProps) {
  const { bgColor, textColor, pressure, distance, text } = props;
  return (
    <div className="flex items-center gap-2 justify-start">
      <div className={`${bgColor} ${textColor} flex-none w-14 h-7 rounded-md flex justify-center items-center`}>{distance}m</div>
      <div className="flex-none w-12">{pressure}kPa</div>
      <div>{text}</div>
    </div>
  );
}
