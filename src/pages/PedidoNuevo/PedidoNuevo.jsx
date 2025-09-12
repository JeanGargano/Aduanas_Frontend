import { Box, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import { FieldsData } from "../../Data/DataPedidos.jsx";
import Form from "../../components/Form/Form.jsx";
import CustomTextField from "../../components/CustomTextField/CustomTextField.jsx";
import * as yup from "yup";
import Swal from "sweetalert2";
import "./PedidoNuevo.css";
import { crearPedido } from "../../Services/pedidosApi.js";
import { crearCarpetasDrive } from "../../Services/driveApi.js";
import { listarUsuarios, obtenerUsuarioPorId } from "../../Services/usuariosApi.js";
import { crearNotificacion, obtenerFechaLocal } from "../../Services/notificacionesApi.js";
import { useToken } from "../../hooks/useToken.js";
import Loading from "../../components/Loading/Loading.jsx";

const PedidoNuevo = () => {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { token_type, access_token } = useToken();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                setLoading(true);
                const data = await listarUsuarios();
                setClientes(data);
            } catch (error) {
                console.error("Error al obtener clientes:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron cargar los clientes. Intente nuevamente.",
                    icon: "error",
                    background: "#fff",
                    iconColor: "#E7423E",
                    confirmButtonColor: "#052462",
                    confirmButtonText: "Cerrar",
                    customClass: {
                        popup: "swal2-montserrat swal2-rounded",
                        confirmButton: "swal2-confirm-custom",
                    },
                });
            } finally {
                setLoading(false);
            }
        };
        fetchClientes();
    }, []);

    const handleFormSubmit = async (values, actions) => {
        try {
            setLoading(true);
            const resultado = await crearPedido(values, token_type, access_token);
            await crearCarpetasDrive(values.numero_contrato, values.id_cliente, token_type, access_token);
            const usuario = await obtenerUsuarioPorId(values.id_cliente);

            const nuevaNotificacion = {
                usuario_id: values.id_cliente,
                pedido_id: resultado,
                mensaje: `Señor/a ${usuario[0].nombre} el estado de su pedido ${values.numero_contrato} ha sido actualizado a ${values.estado}.`,
                fecha: obtenerFechaLocal()
            };

            await crearNotificacion(nuevaNotificacion, token_type, access_token);


            actions.resetForm();

            Swal.fire({
                title: "Pedido creado",
                text: "El pedido se ha registrado correctamente.",
                icon: "success",
                background: "#fff",
                iconColor: "#052462",
                confirmButtonColor: "#E7423E",
                confirmButtonText: "Ver pedidos",
                customClass: {
                    popup: "swal2-rounded",
                    confirmButton: "swal2-confirm-custom",
                },
            }).then(() => {
                navigate("/pedidos");
            });

        } catch (error) {
            console.error("Fallo al crear pedido:", error);

            Swal.fire({
                title: "Error",
                text: "No se pudo registrar el pedido. Intenta nuevamente.",
                icon: "error",
                background: "#fff",
                iconColor: "#E7423E",
                confirmButtonColor: "#052462",
                confirmButtonText: "Cerrar",
                customClass: {
                    popup: "swal2-rounded",
                    confirmButton: "swal2-confirm-custom",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    const initialValues = FieldsData.reduce((acc, campo) => {
        acc[campo.name] = "";
        return acc;
    }, {
        id_cliente: "",
        estado: "",
        puerto_arribo: "",
    });


    const camposRequeridos = [
        "fecha_creacion",
        "numero_contrato",
        "producto",
        "contenedor",
        "dias_libres",
    ];

    const validationSchema = yup.object(
        FieldsData.reduce((acc, campo) => {
            if (camposRequeridos.includes(campo.name)) {
                acc[campo.name] = yup
                    .string()
                    .required("Este campo es obligatorio");
            } else {
                acc[campo.name] = yup.string().nullable();
            }
            return acc;
        }, {
            id_cliente: yup.string().required("Debe seleccionar un cliente"),
            estado: yup.string().required("Debe seleccionar un estado"),
            puerto_arribo: yup.string().required("Debe seleccionar un puerto"),
        })
    );


    return (
        <div className="pedidosNuevo">
            <Box m="20px">
                <Header title="Crear Nuevo Pedido" subtitle="Crear un Nuevo Pedido" />
                <Form onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={validationSchema} btnText={"Crear Pedido"}
                    FieldsData={FieldsData}
                    extraFields={({ values, errors, touched, handleChange, handleBlur }) => (
                        <>
                            <CustomTextField
                                name="id_cliente"
                                label="Cliente"
                                select
                                value={values.id_cliente}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!touched.id_cliente && !!errors.id_cliente}
                                helperText={touched.id_cliente && errors.id_cliente}
                                sx={{ gridColumn: "span 2" }}
                            >
                                {clientes.map((cliente) => (
                                    <MenuItem key={cliente.identificacion} value={cliente.identificacion}>
                                        {cliente.nombre}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                            <CustomTextField
                                name="estado"
                                label="Estado"
                                select
                                value={values.estado || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!touched.estado && !!errors.estado}
                                helperText={touched.estado && errors.estado}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="REGISTRADO">Registrado</MenuItem>
                                <MenuItem value="EN PUERTO">En Puerto</MenuItem>
                                <MenuItem value="ENTREGADO">Entregado</MenuItem>
                                <MenuItem value="EN PROCESO">En Proceso</MenuItem>
                            </CustomTextField>
                            <CustomTextField
                                name="puerto_arribo"
                                label="Puerto"
                                select
                                value={values.puerto_arribo || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!touched.puerto_arribo && !!errors.puerto_arribo}
                                helperText={touched.puerto_arribo && errors.puerto_arribo}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="SOC. PORTUARIA REGIONAL BTURA">SOC. PORTUARIA REGIONAL BTURA</MenuItem>
                                <MenuItem value="SOC. PUERTO INDUSTRIAL AGUADULCE">SOC. PUERTO INDUSTRIAL AGUADULCE</MenuItem>
                                <MenuItem value="SOC. PORTUARIA TERMINAL DE CONTENEDORES">SOC. PORTUARIA TERMINAL DE CONTENEDORES</MenuItem>
                            </CustomTextField>
                        </>
                    )} />
            </Box>
            <Loading open={loading} />
        </div>
    );
};

export default PedidoNuevo;
