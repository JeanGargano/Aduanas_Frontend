import Table from '../Table/Table.jsx';
import Header from '../Header/Header.jsx';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useMediaQuery, Backdrop, CircularProgress } from "@mui/material";
import { UilFilePlus } from '@iconscout/react-unicons';
import { columnsPedidos } from '../../Data/Data.jsx';
import { usePedidos } from '../../hooks/usePedidos.js';
import Swal from "sweetalert2";

const Pedidos = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");

    const { rows, loading, error } = usePedidos();

    // if (loading) return <p>Cargando pedidos...</p>;
    if (error) return <p>Error al cargar pedidos</p>;

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
                        rows={rows}
                        columns={columnsPedidos}
                        loading={loading}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default Pedidos;
