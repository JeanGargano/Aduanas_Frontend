import { useEffect, useState } from "react";
import { listarPedidos } from "../Services/pedidosApi"; // Ajusta la ruta según tu estructura

const CACHE_KEY = "pedidos";
const CACHE_TIME_KEY = "pedidos_cache_time";
const CACHE_RESUMEN_KEY = "cache_pedidos";
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

export const usePedidos = (enable = true, token_type, access_token) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumen, setResumen] = useState({
    cantidadTotalPedidos: 0,
    cantidadEntregados: 0,
    cantidadEnProceso: 0,
    seriesPedidos: [],
    seriesEntregados: [],
    seriesEnProceso: [],
  });

  useEffect(() => {
    if (!enable) return;

    const cargarPedidos = async () => {
      const cache = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (cache && cacheTime && now - Number(cacheTime) < CACHE_DURATION) {
        setRows(JSON.parse(cache));
        const cacheResumen = localStorage.getItem(CACHE_RESUMEN_KEY);
        if (cacheResumen) {
          setResumen(JSON.parse(cacheResumen));
        }
        setLoading(false);
        return;
      }

      try {
        const data = await listarPedidos(token_type, access_token);
        const datosArray = Array.isArray(data) ? data : [];

        // Fecha límite (últimos 30 días)
        const hoy = new Date();
        const hace30dias = new Date();
        hace30dias.setDate(hoy.getDate() - 30);

        // Filtrar pedidos del último mes
        const pedidosUltimoMes = datosArray.filter((pedido) => {
          if (!pedido.fecha_creacion) return false;
          const fechaPedido = new Date(pedido.fecha_creacion);
          return fechaPedido >= hace30dias && fechaPedido <= hoy;
        });

        // Contadores del último mes
        const cantidadTotalPedidos = pedidosUltimoMes.length;
        const cantidadRegistrados = pedidosUltimoMes.filter(
          (pedido) => pedido.estado === "REGISTRADO",
        ).length;
        const cantidadEntregados = pedidosUltimoMes.filter(
          (pedido) => pedido.estado === "ENTREGADO",
        ).length;
        const cantidadEnProceso = pedidosUltimoMes.filter(
          (pedido) => pedido.estado === "EN PROCESO",
        ).length;
        const cantidadEnPuerto = pedidosUltimoMes.filter(
          (pedido) => pedido.estado === "EN PUERTO",
        ).length;

        // Crear array de últimos 30 días YYYY-MM-DD
        const dias = [];
        for (let i = 29; i >= 0; i--) {
          const fecha = new Date();
          fecha.setDate(hoy.getDate() - i);
          dias.push(
            `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`,
          );
        }

        // Contar por fecha dentro del último mes
        const contarPorFecha = (condicion) => {
          return dias.map(
            (dia) =>
              pedidosUltimoMes.filter((pedido) => {
                if (!pedido.fecha_creacion) return false;
                const fechaNormalizada = pedido.fecha_creacion.split("T")[0];
                return fechaNormalizada === dia && condicion(pedido);
              }).length,
          );
        };

        // Series
        const seriesPedidos = contarPorFecha(() => true);
        const seriesEntregados = contarPorFecha(
          (p) => p.estado === "ENTREGADO",
        );
        const seriesEnProceso = contarPorFecha(
          (p) => p.estado === "EN PROCESO",
        );
        const seriesEnPuerto = contarPorFecha((p) => p.estado === "EN PUERTO");
        const seriesRegistrados = contarPorFecha(
          (p) => p.estado === "REGISTRADO",
        );

        // Guardar resumen
        setResumen({
          cantidadTotalPedidos,
          cantidadRegistrados,
          cantidadEnProceso,
          cantidadEntregados,
          cantidadEnPuerto,
          seriesPedidos,
          seriesEntregados,
          seriesEnProceso,
          seriesEnPuerto,
          seriesRegistrados,
        });

        // Guardar pedidos con id
        const pedidosConId = data.map((p) => ({
          ...p,
          id: p.id_pedido,
        }));

        setRows(pedidosConId);

        // Cachear
        localStorage.setItem(CACHE_KEY, JSON.stringify(pedidosConId));
        localStorage.setItem(CACHE_TIME_KEY, now.toString());
        localStorage.setItem(
          CACHE_RESUMEN_KEY,
          JSON.stringify({
            cantidadTotalPedidos,
            cantidadEntregados,
            cantidadEnProceso,
            cantidadEnPuerto,
            cantidadRegistrados,
            seriesPedidos,
            seriesEntregados,
            seriesEnProceso,
            seriesEnPuerto,
            seriesRegistrados,
          }),
        );
      } catch (error) {
        setError(error);
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, [enable, token_type, access_token]);

  return { rows, resumen, loading, error };
};
