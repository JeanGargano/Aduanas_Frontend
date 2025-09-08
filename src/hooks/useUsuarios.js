import { useEffect, useState } from "react";
import { listarUsuarios } from "../Services/usuariosApi";

const CACHE_KEY = "usuarios";
const CACHE_TIME_KEY = "usuarios_cache_time";
const CACHE_RESUMEN_KEY = "usuarios_resumen";
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [resumen, setResumen] = useState({
    cantidadTotalUsuarios: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const cache = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
      const cacheResumen = localStorage.getItem(CACHE_RESUMEN_KEY);
      const now = Date.now();

      // Si hay cache válido
      if (cache && cacheTime && now - Number(cacheTime) < CACHE_DURATION) {
        setUsuarios(JSON.parse(cache));
        if (cacheResumen) {
          setResumen(JSON.parse(cacheResumen));
        }
        setLoading(false);
        return;
      }

      try {
        let datosArray = [];
        const data = await listarUsuarios();
        datosArray = Array.isArray(data) ? data : [];
        const cantidadTotalUsuarios = datosArray.length;

        // resumen
        const nuevoResumen = { cantidadTotalUsuarios };
        setResumen(nuevoResumen);
        localStorage.setItem(CACHE_RESUMEN_KEY, JSON.stringify(nuevoResumen));

        // usuarios con id
        const usuariosConId = data.map((u) => ({
          ...u,
          id: u.identificacion, // clave única para tablas
        }));

        setUsuarios(usuariosConId);
        localStorage.setItem(CACHE_KEY, JSON.stringify(usuariosConId));
        localStorage.setItem(CACHE_TIME_KEY, now.toString());
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  return { usuarios, resumen, loading, error };
};
