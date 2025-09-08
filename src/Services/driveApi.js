import { obtenerUsuarioPorId } from "./usuariosApi";

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
  console.log("Datos para crear carpetas en Drive:", datos);
  try {
    const respuesta = await fetch(
      "http://localhost:8080/drive/crear_carpetas_drive",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_type} ${access_token}`,
        },
        body: JSON.stringify(datos),
      },
    );

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
