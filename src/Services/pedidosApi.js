const API_URL = import.meta.env.VITE_API_URL;

export const crearPedido = async (values, token_type, access_token) => {
  const cleanData = Object.fromEntries(
    Object.entries(values).filter(([_, value]) => value !== ""),
  );

  try {
    const response = await fetch(`${API_URL}/pedido/crear_pedido`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
      body: JSON.stringify(cleanData),
    });

    if (!response.ok) {
      throw new Error("Error al crear el pedido");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const listarPedidos = async (token_type, access_token) => {
  try {
    const response = await fetch(`${API_URL}/pedido/listar_pedidos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al listar los pedidos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const obtenerPedidoPorId = async (id, token_type, access_token) => {
  try {
    const response = await fetch(
      `${API_URL}/pedido/listar_pedido_por_id?id_pedido=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_type} ${access_token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("No se pudo obtener el pedido");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    throw error;
  }
};

export const actualizarPedidoPorId = async (
  idPedido,
  datosActualizados,
  token_type,
  access_token,
) => {
  try {
    const response = await fetch(
      `${API_URL}/pedido/actualizar_pedido_por_id?id_pedido=${idPedido}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_type} ${access_token}`,
        },
        body: JSON.stringify(datosActualizados),
      },
    );

    if (!response.ok) {
      console.error("Error en la respuesta del servidor:", response.statusText);
      console.error("Detalles de la solicitud:", {
        datosActualizados,
      });
      throw new Error("Error al actualizar el pedido");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarPedidoPorId:", error);
    throw error;
  }
};

export const listarPedidosDelCliente = async (
  idCliente,
  token_type,
  access_token,
) => {
  try {
    const response = await fetch(
      `${API_URL}/pedido/listar_pedidos_del_cliente?id_cliente=${idCliente}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_type} ${access_token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error al obtener los pedidos del cliente");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en listarPedidosDelCliente:", error);
    throw error;
  }
};

export const actualizarEstadoPedido = async (idPedido, nuevoEstado) => {
  try {
    const response = await fetch(
      `${API_URL}/pedido/actualizar_estado?id_pedido=${idPedido}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      },
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el estado del pedido");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizar Estado Pedido:", error);
    throw error;
  }
};
