import Image from "next/image";

interface CardBankProps {
    nombre_id: string;
    nombre: string;
    logo?: string;
    pais: string;
  }  

export default function CardBank({ nombre_id, nombre, logo, pais }: CardBankProps) {
    const defaultLogo = "https://static.thenounproject.com/png/2616532-200.png"
    return (
      <a href={`/cuentas/${nombre_id}`} className="flex items-center p-3 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-300 group hover:shadow shadow-lg">
        <Image alt="logo" src={logo || defaultLogo} height={50} width={50} />
        <span className="flex-1 ms-3 whitespace-nowrap flex items-center gap-2">
          {nombre}
          <Image src={`https://flagsapi.com/${pais}/flat/64.png`} width={20} height={20} alt='bandera' />
        </span> 
        <span className="inline-flex items-center justify-center p-1 ms-3 text-xs font-medium text-gray-700 bg-gray-200 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </a>
    );
  }