import { useState } from 'react';
import Table from '../../components/Table/Table.jsx';
import Header from '../../components/Header/Header.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useMediaQuery } from "@mui/material";
import { UilFilePlus } from '@iconscout/react-unicons';
import { columnsPedidos } from '../../Data/DataPedidos.jsx';
import { usePedidosRol } from '../../hooks/usePedidosRol.js';
import { useAuth } from '../../Context/AuthContext.jsx';
import { enviarMensaje } from '../../Services/twilioApi.js';
import { obtenerUsuarioPorId } from '../../Services/usuariosApi.js';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import './Pedidos.css';

const Pedidos = () => {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    const rol = usuario?.usuario?.rol;

    const token_type = usuario?.token_type;
    const access_token = usuario?.access_token;

    const { rows, error } = usePedidosRol();

    if (loading) return <Loading open={loading} />;


    const limpiarCachePedidos = () => {
        if (rol === 'Administrador') {
            localStorage.removeItem("pedidos");
            localStorage.removeItem("pedidos_cache_time");
        } else {
            localStorage.removeItem("usuario_pedidos");
            localStorage.removeItem("usuario_pedidos_cache_time");
        }
    }
    const mostrarPopupNotificacion = async (rows) => {
        try {
            setLoading(true);
            const cliente = await obtenerUsuarioPorId(rows.id_cliente);

            const result = await Swal.fire({
                title: `Notificar a ${cliente[0].nombre}`,
                icon: "warning",
                html: `
                <div class="swal2-content-group">
                    <p><strong>Nombre:</strong> ${cliente[0].nombre}</p>
                    <p><strong>Teléfono:</strong> ${cliente[0].celular}</p>
                    <p><strong>Correo:</strong> ${cliente[0].correo}</p>
                    <p style="margin-top: 1em;">¿Deseas notificar por <strong>WhatsApp</strong>?</p>
                </div>
            `,
                background: "#fff",
                showCancelButton: true,
                confirmButtonText: "Enviar Notificación",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#E7423E",
                cancelButtonColor: "#6E81A4",
                customClass: {
                    popup: "swal2-montserrat swal2-rounded",
                    confirmButton: "swal2-confirm-custom",
                    cancelButton: "swal2-cancel-custom",
                },
            });

            if (result.isConfirmed) {
                await enviarMensaje(cliente[0].celular, cliente[0].nombre, rows.estado, token_type, access_token);

                await Swal.fire({
                    title: "Notificación Enviada",
                    text: `Se ha enviado una notificación a ${cliente[0].nombre}`,
                    icon: "success",
                    confirmButtonColor: "#E7423E",
                    background: "#fff",
                    customClass: {
                        popup: "swal2-montserrat swal2-rounded",
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
                background: "#fff",
                customClass: {
                    popup: "swal2-montserrat swal2-rounded",
                    confirmButton: "swal2-confirm-custom",
                },
            });
        } finally {
            setLoading(false);
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
            icon: "info",
            iconColor: "#E7423E",
            inputAttributes: {
                autocapitalize: "off",
            },
            customClass: {
                popup: "swal2-montserrat swal2-rounded",
                confirmButton: "swal2-confirm-custom",
                cancelButton: "swal2-cancel-custom",
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

    const columStyle = {
        flex: "auto",
        width: 150,
    };

    // columnas especiales para usuarios que no son admin
    const columnasNoAdmin = [
        {
            field: "fecha_creacion",
            headerName: "Fecha de Registro",
            type: "date",
            valueGetter: (params) => {
                if (!params) return null; // si no hay valor, devuelve null
                const fecha = new Date(params);
                return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
            },
            ...columStyle,
        },
        {
            field: "fecha_arribo",
            headerName: "Fecha de Arribo",
            type: "date",
            valueGetter: (params) => {
                if (!params?.value) return null;
                const fecha = new Date(params.value);
                return isNaN(fecha.getTime()) ? null : fecha;
            },
            ...columStyle,
        },
        {
            field: "fecha_entrega_transporte",
            headerName: "Fecha de Entrega Transporte",
            type: "date",
            valueGetter: (params) => {
                if (!params?.value) return null;
                const fecha = new Date(params.value);
                return isNaN(fecha.getTime()) ? null : fecha;
            },
            ...columStyle,
        },
        { field: "proveedor", headerName: "Proveedor", ...columStyle },
        {
            field: "numero_contrato",
            headerName: "Número Contrato",
            renderCell: (params) => (
                <Link
                    to="https://drive.google.com/drive/u/0/folders/1KkHNZXXJpwcvkwJg0SiHFHjn3a7WRM2p"
                    style={{ color: "#E7423E", textDecoration: "none", fontWeight: "bold" }}
                >
                    {params.value}
                </Link>
            ),
            ...columStyle,
        },
        { field: "producto", headerName: "Producto", ...columStyle },
        { field: "bl", headerName: "BL", ...columStyle },
        { field: "naviera", headerName: "Naviera", ...columStyle },
        { field: "contenedor", headerName: "Contenedor", ...columStyle },
        {
            field: "peso",
            headerName: "Peso",
            type: "string",
            align: "left",
            headerAlign: "left",
            ...columStyle,
        },
        {
            field: "dias_libres",
            headerName: "Días Libres",
            type: "string",
            align: "left",
            headerAlign: "left",
            ...columStyle,
        },
        { field: "observaciones", headerName: "Observaciones", ...columStyle },
        { field: "entrega_transporte", headerName: "Entrega Transporte", ...columStyle },
    ];

    // definición final de columnas
    const columnas =
        rol === "Administrador"
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
                ...columnsPedidos, // columnas normales para admin
            ]
            : columnasNoAdmin; // columnas restringidas


    return (
        <div className="Pedidos">
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
            <Loading open={loading} />
        </div>
    );
};

export default Pedidos;
