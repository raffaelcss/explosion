import Image from 'next/image';
import ConfigItens from './configItens';

interface ConfigMenuProps {}
export default function ConfigMenu(props: ConfigMenuProps) {
  return (
    <>
      <ConfigItens id="calor" label="Calor de combustão" unit="MJ/m³" value="">
        <Image src={'/icons/nuclear-explosion.png'} alt="" height={42} width={42} />
      </ConfigItens>
      <ConfigItens id="volume" label="Volume total" unit="m³" value="">
        <Image src={'/icons/volume.png'} alt="" height={32} width={32} />
      </ConfigItens>
      <ConfigItens id="percent" label="Volume de interesse" unit="%" value="">
        <Image src={'/icons/range.png'} alt="" height={32} width={32} />
      </ConfigItens>
      <ConfigItens id="class" label="Classe TNO" unit="" value="">
        <Image src={'/icons/shapes.png'} alt="" height={30} width={30} />
      </ConfigItens>
      <ConfigItens id="factor" label="Fator de conservadorismo" unit="%" value="">
        <Image src={'/icons/balance.png'} alt="" height={32} width={32} />
      </ConfigItens>
    </>
  );
}
