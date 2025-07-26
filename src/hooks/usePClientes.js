import { useEffect, useState } from "react";
import { listarPedidosDelCliente } from "../Services/pedidosApi"; // Ajusta la ruta según tu estructura

const CACHE_KEY = "usuario_pedidos";
const CACHE_TIME_KEY = "usuario_pedidos_cache_time";
const CACHE_DURATION = 10 * 60 * 1000;

export const usePClientes = (id, rol) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const cargarPedidos = async () => {
      setLoading(true);

      // Si es cliente, intentamos usar el caché
      if (rol === "cliente") {
        const cache = localStorage.getItem(CACHE_KEY);
        const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        if (cache && cacheTime && now - Number(cacheTime) < CACHE_DURATION) {
          setRows(JSON.parse(cache));
          setLoading(false);
          return;
        }
      }

      // Si es admin, o no hay caché válido
      try {
        const data = await listarPedidosDelCliente(id);
        const pedidosConId = data.map((pedido) => ({
          ...pedido,
          id: pedido.id_pedido,
        }));

        setRows(pedidosConId);

        // Guardar en caché solo si es cliente
        if (rol === "cliente") {
          localStorage.setItem(CACHE_KEY, JSON.stringify(pedidosConId));
          localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        }
      } catch (err) {
        console.error("Error al cargar pedidos del cliente:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, [id, rol]);

  return { rows, loading, error };
};
