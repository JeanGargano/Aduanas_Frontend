const API_URL = "http://localhost:8080/usuario";

export const listarUsuarios = async () => {
  const respuesta = await fetch(`${API_URL}/listar_usuarios`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener usuarios");
  }

  const datos = await respuesta.json();
  return datos;
};

export const crearCliente = async (datos) => {
  const respuesta = await fetch(`${API_URL}/crear_usuario`, {
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
    const respuesta = await fetch(`${API_URL}/autenticar_usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(credenciales).toString(),
    });

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
    const respuesta = await fetch(`${API_URL}/asignar_contraseña`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identificacion, contraseña }),
    });

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
      `${API_URL}/listar_usuario_por_id?identificacion=${identificacion}`,
    );
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};

export const actualizarUsuarioPorId = async (identificacion, datos) => {
  try {
    const response = await fetch(
      `${API_URL}/actualizar_usuario_por_id?identificacion=${identificacion}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      },
    );
    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }
    const resultado = await response.json();
    return resultado;
  } catch (error) {
    console.error("Error en actualizarUsuarioPorId:", error);
    throw error;
  }
};
