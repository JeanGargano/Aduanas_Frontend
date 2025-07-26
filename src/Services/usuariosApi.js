export const listarUsuarios = async () => {
  const respuesta = await fetch(
    `http://localhost:8080/usuario/listar_usuarios`,
  );

  if (!respuesta.ok) {
    throw new Error("Error al obtener usuarios");
  }

  const datos = await respuesta.json();
  return datos;
};

export const crearCliente = async (datos) => {
  const respuesta = await fetch("http://localhost:8080/usuario/crear_usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new Error("Error al crear cliente");
  }

  return await respuesta.json();
};

export const logearUsuario = async (credenciales) => {
  try {
    const respuesta = await fetch(
      "http://localhost:8080/usuario/logear_usuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales),
      },
    );

    if (!respuesta.ok) {
      const error = await respuesta.json();
      throw new Error(error.message || "Error al iniciar sesión");
    }

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error en logearUsuario:", error.message);
    throw error;
  }
};

export const asignarContrasena = async ({ identificacion, contraseña }) => {
  try {
    const respuesta = await fetch(
      "http://localhost:8080/usuario/asignar_contraseña",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identificacion, contraseña }),
      },
    );

    if (!respuesta.ok) {
      const error = await respuesta.json();
      throw new Error(error.message || "No se pudo asignar la contraseña");
    }

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error en asignarContrasena:", error.message);
    throw error;
  }
};

export const obtenerUsuarioPorId = async (identificacion) => {
  try {
    const response = await fetch(
      `http://localhost:8080/usuario/listar_usuario_por_id?identificacion=${identificacion}`,
    );
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};
