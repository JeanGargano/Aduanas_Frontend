import { useEffect, useState } from "react";
import { listarUsuarios } from "../Services/usuariosApi"; // Ajusta la ruta si es necesario

const CACHE_KEY = "usuarios";
const CACHE_TIME_KEY = "usuarios_cache_time";
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos en milisegundos

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const cache = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (cache && cacheTime && now - Number(cacheTime) < CACHE_DURATION) {
        setUsuarios(JSON.parse(cache));
        setLoading(false);
        return;
      }

      try {
        const data = await listarUsuarios();
        const usuariosConId = data.map((u) => ({
          ...u,
          id: u.identificacion, // Establece 'id' para uso en tablas
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

  return { usuarios, loading, error };
};
