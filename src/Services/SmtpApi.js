export const crearCorreo = async (correo) => {
  try {
    const response = await fetch(`http://localhost:8080/smtp/enviar_correo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(correo),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear el correo:", error);
    throw error;
  }
};
