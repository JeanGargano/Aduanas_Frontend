import { useEffect, useState } from "react";
import Header from "../../Header/Header.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, useMediaQuery, Backdrop, CircularProgress } from "@mui/material";
import { listarPedidosDelCliente } from "../../../Services/pedidosApi";
import { columnsPedidos } from "../../../Data/Data.jsx";
import Table from "../../Table/Table";
import Swal from "sweetalert2";
import { UilFilePlus } from '@iconscout/react-unicons';

const PedidosCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await listarPedidosDelCliente(id);
        // Asegúrate de que cada pedido tenga una propiedad "id" única
        const pedidosConId = data.map((pedido) => ({
          ...pedido,
          id: pedido.id_pedido, // Asegúrate de que este campo exista en tu API
        }));
        setPedidos(pedidosConId);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarPedidos();
  }, [id]);

  const handleEditarPedido = async () => {
    const { value: pedidoId } = await Swal.fire({
      title: "Editar Pedido",
      input: "text",
      inputLabel: "ID del Pedido",
      inputPlaceholder: "Ingrese el ID del pedido a editar",
      showCancelButton: true,
      confirmButtonColor: "#E7423E",
      cancelButtonColor: "#6E81A4",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      background: "#fff",
      iconColor: "#E7423E",
      inputAttributes: {
        autocapitalize: "off",
      },
      customClass: {
        popup: "swal2-rounded",
        confirmButton: "swal2-confirm-custom",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Debe ingresar un ID";
        }
      },
    });

    if (pedidoId) {
      navigate(`/pedidos/editar/${pedidoId}`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pedidos) {
    return <div>No se pudieron cargar los pedidos.</div>;
  }

  return (
    <div className="PedidosCliente">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      ></Backdrop>
      <Box m={2} p={isMobile ? 2 : 6}>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          gap={2}
        >
          <Header title={`Pedidos del Cliente ${id}`} subtitle="Lista de pedidos" />
          <Button
            onClick={() => navigate("/pedidos/crear")}
            sx={{
              backgroundColor: "#E7423E",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              transition: "all 0.3s ease",
              alignSelf: isMobile ? "left" : "flex-end",
              "&:hover": {
                backgroundColor: "#6E81A4",
              },
            }}
          >
            <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
              <UilFilePlus size={isMobile ? "32" : "40"} />
              Crear Pedido
            </Box>
          </Button>
          <Button
            onClick={handleEditarPedido}
            sx={{
              backgroundColor: "#E7423E",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              transition: "all 0.3s ease",
              alignSelf: isMobile ? "left" : "flex-end",
              "&:hover": {
                backgroundColor: "#6E81A4",
              },
            }}
          >
            <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
              <UilFilePlus size={isMobile ? "32" : "40"} />
              Editar Pedido
            </Box>
          </Button>
        </Box>
        <Box mt="10px">
          <Table
            rows={pedidos}
            columns={columnsPedidos}
          />
        </Box>
      </Box>
    </div>
  );
};

export default PedidosCliente;
