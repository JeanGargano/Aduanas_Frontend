import { obtenerUsuarioPorId } from "./usuariosApi";

const API_URL = import.meta.env.VITE_API_URL;

export const crearCarpetasDrive = async (
  contrato,
  id,
  token_type,
  access_token,
) => {
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1; // Enero es 0
  const usuario = await obtenerUsuarioPorId(id);

  const datos = {
    cliente: usuario[0].nombre,
    numero_contrato: contrato,
    year,
    mes,
    carpeta_raiz_id: "1KkHNZXXJpwcvkwJg0SiHFHjn3a7WRM2p",
  };
  try {
    const respuesta = await fetch(`${API_URL}/drive/crear_carpetas_drive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      throw new Error("Error al crear carpetas en Drive", Error);
    }

    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error("Error en crearCarpetasDrive:", error);
    throw error;
  }
};
