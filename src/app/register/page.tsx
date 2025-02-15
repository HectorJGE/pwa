"use client";
import { useEffect, useState } from "react";
import { registerUser } from "../../services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
      const token = localStorage.getItem("token"); 

      if (token) {
          router.replace("/");
      }
  }, [router]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await registerUser(formData);
    
    if (result) {
      router.push("/login");
    } else {
      setError("Error al registrar usuario");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-black bg-white p-10 rounded-lg shadow-lg lg:w-1/3 w-full">
        <h1 className="text-xl font-bold text-center mb-4">Registro</h1>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Direcciön"
            value={formData.direccion}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          <button type="submit" className="p-2 bg-red-500 text-white rounded">
            Registrarse
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}
        <p className="mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-red-500 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
