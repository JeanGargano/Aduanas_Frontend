const API_URL = import.meta.env.VITE_API_URL;

export const crearCorreo = async (correo, token_type, access_token) => {
  try {
    const response = await fetch(`${API_URL}/sengrid/enviar_correo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
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
