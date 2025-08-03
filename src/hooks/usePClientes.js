import { useEffect, useState } from "react";
import { listarPedidosDelCliente } from "../Services/pedidosApi"; // Ajusta la ruta según tu estructura

const CACHE_KEY = "usuario_pedidos";
const CACHE_TIME_KEY = "usuario_pedidos_cache_time";
const CACHE_DURATION = 10 * 60 * 1000;

export const usePClientes = (id, rol, enable = true) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !enable) return;

    const cargarPedidos = async () => {
      setLoading(true);

      // Si es Cliente, intentamos usar el caché
      if (rol === "Cliente") {
        console.log(
          "Cargando pedidos desde caché o API..., id:",
          id,
          "rol:",
          rol,
        );
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
        if (rol === "Cliente") {
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
  }, [id, rol, enable]);

  return { rows, loading, error };
};
