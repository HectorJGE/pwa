"use client";

import { useRouter } from "next/navigation";
  
export default function SalirButton() {
    const router = useRouter();

    const handleLogout = async () => {
        localStorage.removeItem("token");
        document.cookie = "token=; max-age=0";
        router.push("/login");
    };

    return (
        <button 
            onClick={handleLogout} 
            className="bg-red-500 p-2 my-5 rounded text-white hover:bg-red-800 md:fixed  md:top-10 md:right-10"
        >
            Cerrar Sesión
        </button>
    );
}