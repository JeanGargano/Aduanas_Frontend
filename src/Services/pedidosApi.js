export const crearPedido = async (values) => {
  const cleanData = Object.fromEntries(
    Object.entries(values).filter(([_, value]) => value !== ""),
  );

  try {
    const response = await fetch("http://localhost:8080/pedido/crear_pedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const listarPedidos = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/pedido/listar_pedidos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

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

export const obtenerPedidoPorId = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/pedido/listar_pedido_por_id?id_pedido=${id}`,
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

export const actualizarPedidoPorId = async (idPedido, datosActualizados) => {
  try {
    const response = await fetch(
      `http://localhost:8080/pedido/actualizar_pedido_por_id?id_pedido=${idPedido}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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

export const listarPedidosDelCliente = async (idCliente) => {
  try {
    const response = await fetch(
      `http://localhost:8080/pedido/listar_pedidos_del_cliente?id_cliente=${idCliente}`,
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
      `http://localhost:8080/pedido/actualizar_estado?id_pedido=${idPedido}`,
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
