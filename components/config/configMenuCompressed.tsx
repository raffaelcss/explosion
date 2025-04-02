import Image from 'next/image';
import ConfigItens from './configItens';

interface ConfigMenuCompressedProps {}
export default function ConfigMenuCompressed(props: ConfigMenuCompressedProps) {
  return (
    <>
      <div className='h-14 flex items-center justify-center'>
        <Image
          src={'/icons/nuclear-explosion.png'}
          alt=""
          height={27}
          width={27}
        />
      </div>
      <div className='h-14 flex items-center justify-center'>
        <Image src={'/icons/volume.png'} alt="" height={25} width={25} />
      </div>
      <div className='h-14 flex items-center justify-center'>
        <Image src={'/icons/range.png'} alt="" height={25} width={25} />
      </div>
      <div className='h-14 flex items-center justify-center'>
        <Image src={'/icons/shapes.png'} alt="" height={25} width={25} />
      </div>
      <div className='h-14 flex items-center justify-center'>
        <Image src={'/icons/balance.png'} alt="" height={25} width={25} />
      </div>
    </>
  );
}
