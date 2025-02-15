const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (formData: { nombre: string, apellido: string, telefono: string, email: string, direccion: string, password: string }) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Error al registrar usuario");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Credenciales incorrectas");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
