  "use client";
import { useEffect, useState } from "react";
import { loginUser } from "../../services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  useEffect(() => {
      const token = localStorage.getItem("token"); 

      if (token) {
          router.replace("/");
      }
  }, [router]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result) {
      localStorage.setItem("token", result.access_token);
      router.push("/");
    } else {
      setError("Credenciales incorrectas!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black p-4">
      <div className="bg-white p-10 rounded-lg shadow lg:w-1/3 w-full">
      <h1 className="text-xl font-bold text-center mb-2"> Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-red-500 rounded focus:ring-red-500 focus:outline-none focus:ring-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-red-500 rounded focus:ring-red-500 focus:outline-none focus:ring-2"
        />
        <button type="submit" className="p-2 bg-red-500 text-white rounded">
          Entrar
        </button>
      </form>
      {error && <p className="text-red-700 text-center mt-2">{error}</p>}

      <p className="mt-4">
        ¿Aún no tienes cuenta?{" "}
        <Link href="/register" className="text-red-500 hover:underline">
          Registrarse
        </Link>
      </p>
      </div>
    </div>
  );
}
