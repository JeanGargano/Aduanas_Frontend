export const enviarMensaje = async (
  telefono,
  cliente,
  estado,
  token_type,
  access_token,
) => {
  const Stelefono = String(telefono);
  try {
    const response = await fetch(
      "http://localhost:8080/twilio/enviar_mensaje",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_type} ${access_token}`,
        },
        body: JSON.stringify({
          numero: `+${Stelefono}`,
          mensaje: `Señor/a ${cliente}, su pedido ha cambiado de estado a: ${estado}.`,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error al enviar el mensaje");
    }
    const resultado = await response.json();
    return resultado;
  } catch (error) {
    console.error("Error:", error);
  }
};
