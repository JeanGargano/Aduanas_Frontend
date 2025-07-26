export const crearCarpetasDrive = async (cliente, contrato) => {
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1; // Enero es 0

  const datos = {
    cliente,
    numero_contrato: contrato,
    year,
    mes,
    carpeta_raiz_id: "1KkHNZXXJpwcvkwJg0SiHFHjn3a7WRM2p",
  };

  try {
    const respuesta = await fetch(
      "http://localhost:8080/drive/crear_carpetas_drive",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      },
    );

    if (!respuesta.ok) {
      throw new Error("Error al crear carpetas en Drive");
    }

    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error("Error en crearCarpetasDrive:", error);
    throw error;
  }
};
