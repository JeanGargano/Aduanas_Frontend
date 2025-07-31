import Header from "../../components/Header/Header.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, useMediaQuery, Backdrop, CircularProgress } from "@mui/material";
import { usePClientes } from "../../hooks/usePClientes.js"; // Asegúrate de que este hook esté implementado
import { columnsPedidos } from "../../Data/DataPedidos.jsx";
import Table from "../../components/Table/Table";
import { useAuth } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { UilFilePlus } from '@iconscout/react-unicons';
import './PedidosCliente.css';

const PedidosCliente = () => {
  const { id } = useParams();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const rol = usuario.rol;

  const { rows, loading, error } = usePClientes(id, rol);

  const limpiarCachePedidos = () => {
    localStorage.removeItem("pedidos");
    localStorage.removeItem("pedidos_cache_time");
  };

  const handleEditarPedido = async () => {
    const { value: pedidoId } = await Swal.fire({
      title: "Editar Pedido",
      input: "text",
      inputLabel: "ID del Pedido",
      inputPlaceholder: "Ingrese el ID del pedido a editar",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#E7423E",
      cancelButtonColor: "#6E81A4",
      background: "#fff",
      icon: "info",
      iconColor: "#E7423E",
      customClass: {
        popup: "swal2-montserrat swal2-rounded",
        confirmButton: "swal2-confirm-custom",
        cancelButton: "swal2-cancel-custom",
      },
      inputAttributes: {
        autocapitalize: "off",
      },
      inputValidator: (value) => {
        if (!value) return "Debe ingresar un ID";
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

  if (error) {
    return <div>Error al cargar los pedidos.</div>;
  }

  return (
    <div className="pedidosCliente">
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} />
      <Box m={2} p={isMobile ? 2 : 6}>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          gap={2}
        >
          <Header title={`Pedidos del Cliente ${id}`} subtitle="Lista de pedidos" />

          {rol === "Administrador" && (
            <>
              <Button
                onClick={() => navigate("/pedidos/crear")}
                sx={{
                  backgroundColor: "#E7423E",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: "#6E81A4",
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
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
                  "&:hover": {
                    backgroundColor: "#6E81A4",
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <UilFilePlus size={isMobile ? "32" : "40"} />
                  Editar Pedido
                </Box>
              </Button>
            </>
          )}
        </Box>

        <Box mt="10px">
          <Button
            onClick={() => { limpiarCachePedidos(); window.location.reload(); }}
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
            Refrescar Tabla
          </Button>
          <Table rows={rows} columns={columnsPedidos} />
        </Box>
      </Box>
    </div>
  );
};

export default PedidosCliente;