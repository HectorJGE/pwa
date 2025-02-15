const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchBanks = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instituciones`);
        if (!response.ok) throw new Error("Error fetching banks");

        const data = await response.json();
        return data.bancos;
    } catch (error) {
        console.error("Error fetching institutions:", error);
        throw error;
    }
};

export const fetchAccounts = async (banco: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cuentas-banco`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ institucion: banco }),
        cache: "no-store",
        });

        if (!response.ok) {
        throw new Error("Error fetching accounts");
        }

        const data = await response.json();
        return data.accounts;
    } catch (error) {
        console.error("Error fetching accounts:", error);
        return null;
    }
};
  
export const fetchTransacciones = async (cuenta: string, link: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transacciones-cuenta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cuenta, link: link }),
        cache: "no-store",
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener las transacciones");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return null;
    }
  };
  