import Table from "../../components/Table/Table.jsx";
import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Loading from '../../components/Loading/Loading.jsx';
import { useNavigate } from "react-router-dom";
import { Box, Button, useMediaQuery } from "@mui/material";
import { UilFilePlus } from '@iconscout/react-unicons';
import { useUsuarios } from "../../hooks/useUsuarios.js";
import { columnsUsuarios } from "../../Data/DataClientes.jsx";
import Swal from "sweetalert2";
import './Clientes.css';



const Clientes = () => {
    const navigate = useNavigate();
    const [loading] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    const { usuarios, error } = useUsuarios();

    if (error) return <p>Error al cargar usuarios</p>;

    const limpiarCacheUsuarios = () => {
        localStorage.removeItem("usuarios");
        localStorage.removeItem("usuarios_cache_time");
    };

    const handleEditarUsuario = async () => {
        const { value: usuarioId } = await Swal.fire({
            title: "Editar Usuario",
            input: "text",
            inputLabel: "ID del Usuario",
            inputPlaceholder: "Ingrese el ID del usuario a editar",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#E7423E",
            cancelButtonColor: "#6E81A4",
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

        if (usuarioId) {
            navigate(`/clientes/editar/${usuarioId}`);
        }
    };

    return (
        <div className="Clientes">
            <Box m={2} p={isMobile ? 2 : 6}>
                <Box
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                    justifyContent="space-between"
                    alignItems={isMobile ? "flex-start" : "center"}
                    gap={2}
                >
                    <Header title="Usuarios" subtitle="Gestión de usuarios registrados" />
                    <Button
                        onClick={() => navigate("/clientes/crear")}
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
                            Crear Usuario
                        </Box>
                    </Button>
                    <Button
                        onClick={handleEditarUsuario}
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
                            Editar Usuario
                        </Box>
                    </Button>
                </Box>
                <Box mt="10px">
                    <Button
                        onClick={() => { limpiarCacheUsuarios(); window.location.reload(); }}
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
                    <div className="table">
                        <Table
                            rows={usuarios}
                            columns={columnsUsuarios}
                            loading={loading}
                        />
                    </div>
                </Box>
            </Box>
            <Loading open={loading} />
        </div>
    );
};
export default Clientes
