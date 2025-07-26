export const enviarMensaje = async (telefono, cliente, estado) => {
  console.log("enviarMensaje - telefono:", telefono);
  console.log("enviarMensaje - cliente:", cliente);
  console.log("enviarMensaje - estado:", estado);

  const Stelefono = String(telefono);
  try {
    const response = await fetch(
      "http://localhost:8080/twilio/enviar_mensaje",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    console.log("Mensaje enviado:", resultado);
    return resultado;
  } catch (error) {
    console.error("Error:", error);
  }
};
