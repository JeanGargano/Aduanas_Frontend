import Table from '../../components/Table/Table.jsx';
import Header from '../../components/Header/Header.jsx';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useMediaQuery, Backdrop, CircularProgress } from "@mui/material";
import { UilFilePlus } from '@iconscout/react-unicons';
import { columnsPedidos } from '../../Data/DataPedidos.jsx';
import { usePedidosRol } from '../../hooks/usePedidosRol.js';
import { useAuth } from '../../Context/AuthContext.jsx';
import { enviarMensaje } from '../../Services/twilioApi.js';
import { obtenerUsuarioPorId } from '../../Services/usuariosApi.js';
import Swal from "sweetalert2";
import './Pedidos.css';

const Pedidos = () => {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");

    const rol = usuario?.rol;

    const { rows, loading, error } = usePedidosRol();

    if (loading) return <p>Cargando pedidos...</p>;
    if (error) return <p>Error al cargar pedidos</p>;

    const limpiarCachePedidos = () => {
        localStorage.removeItem("pedidos");
        localStorage.removeItem("pedidos_cache_time");
    };

    const mostrarPopupNotificacion = async (rows) => {
        try {
            const cliente = await obtenerUsuarioPorId(rows.id_cliente);

            const result = await Swal.fire({
                title: `Notificar a ${cliente[0].nombre}`,
                icon: "warning",
                html: `
                <p><strong>Nombre:</strong> ${cliente[0].nombre}</p>
                <p><strong>Teléfono:</strong> ${cliente[0].celular}</p>
                <p><strong>Correo:</strong> ${cliente[0].correo}</p>
                <p>¿Deseas notificar por WhatsApp?</p>
            `,
                showCancelButton: true,
                confirmButtonColor: "#E7423E",
                cancelButtonColor: "#6E81A4",
                confirmButtonText: "Enviar Notificación",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                await enviarMensaje(cliente[0].celular, cliente[0].nombre, rows.estado);

                await Swal.fire({
                    title: "Notificación Enviada",
                    text: `Se ha enviado una notificación a ${cliente[0].nombre}`,
                    icon: "success",
                    confirmButtonColor: "#E7423E",
                    background: "#fff",
                    customClass: {
                        popup: "swal2-rounded",
                        confirmButton: "swal2-confirm-custom",
                    },
                });
            }
        } catch (error) {
            console.error("Error al obtener usuario:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo obtener la información del usuario.",
                icon: "error",
                confirmButtonColor: "#E7423E",
            });
        }
    };

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

    const rowsConHandler = rows.map((pedido) => ({
        ...pedido,
        handleNotificar: () => mostrarPopupNotificacion(pedido),
    }));

    // Si es admin, incluye la columna de notificar
    const columnas = rol === "Administrador"
        ? [
            {
                field: "notificar",
                headerName: "Notificar",
                width: 150,
                renderCell: (params) => (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => mostrarPopupNotificacion(params.row)}
                        sx={{
                            backgroundColor: "#E7423E",
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#6E81A4",
                            },
                        }}
                    >
                        Notificar
                    </Button>
                ),
            },
            ...columnsPedidos,
        ]
        : columnsPedidos;


    return (
        <div className="Pedidos">
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box m={2} p={isMobile ? 2 : 6}>
                <Box
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                    justifyContent="space-between"
                    alignItems={isMobile ? "flex-start" : "center"}
                    gap={2}
                >
                    <Header title="Pedidos" subtitle="Gestión y seguimiento de pedidos" />

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
                    <Table
                        rows={rowsConHandler} // Limitar a 100 filas para evitar problemas de rendimiento
                        columns={columnas}
                        loading={loading}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default Pedidos;
