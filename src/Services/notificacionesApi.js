export const obtenerFechaLocal = () => {
  const ahora = new Date();
  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  const segundos = String(ahora.getSeconds()).padStart(2, "0");
  return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
};

export const crearNotificacion = async (notificacion) => {
  try {
    const response = await fetch(
      `http://localhost:8080/notificacion/crear_notificacion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificacion),
      },
    );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear notificación:", error);
    throw error;
  }
};

export const listarNotificaciones = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/notificacion/listar_notificaciones`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok)
      throw new Error(`Error al listar notificaciones: ${response.status}`);

    const data = await response.json();

    // 🔹 Transformar el formato aquí
    return data.map((n) => ({
      // name: `Usuario ${n.usuario_id}`, // Si luego tienes el nombre real, cámbialo
      noti: n.mensaje,
      time: calcularTiempoRelativo(n.fecha),
    }));
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    throw error;
  }
};

// 🔹 Función para calcular "hace X tiempo"
const calcularTiempoRelativo = (fechaISO) => {
  const fecha = new Date(fechaISO);
  const ahora = new Date();
  const diffMs = ahora - fecha;

  const segundos = Math.floor(diffMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);

  if (segundos < 60) return `${segundos} seconds ago`;
  if (minutos < 60) return `${minutos} minutes ago`;
  if (horas < 24) return `${horas} hours ago`;
  return fecha.toLocaleDateString();
};

export const listarMisNotificaciones = async (usuarioId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/notificacion/listar_mis_notificaciones?usuario_id=${usuarioId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok)
      throw new Error(
        `Error al listar notificaciones del usuario ${usuarioId}`,
      );

    const data = await response.json();

    // ✅ Transformar el formato al requerido por tu componente Updates
    return data.map((n) => ({
      name: `Usuario ${n.usuario_id}`,
      noti: n.mensaje,
      time: calcularTiempoRelativo(n.fecha),
    }));
  } catch (error) {
    console.error("Error al obtener notificaciones del usuario:", error);
    throw error;
  }
};
