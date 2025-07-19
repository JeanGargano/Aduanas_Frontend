import { useEffect, useState } from "react";
import { listarPedidos } from "../Services/pedidosApi"; // Ajusta la ruta según tu estructura

const CACHE_KEY = "pedidos";
const CACHE_TIME_KEY = "pedidos_cache_time";
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

export const usePedidos = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPedidos = async () => {
      const cache = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (cache && cacheTime && now - Number(cacheTime) < CACHE_DURATION) {
        setRows(JSON.parse(cache));
        setLoading(false);
        return;
      }

      try {
        const data = await listarPedidos();
        const pedidosConId = data.map((p) => ({
          ...p,
          id: p.id_pedido,
        }));

        setRows(pedidosConId);
        localStorage.setItem(CACHE_KEY, JSON.stringify(pedidosConId));
        localStorage.setItem(CACHE_TIME_KEY, now.toString());
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, []);

  return { rows, loading, error };
};
