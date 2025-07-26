import { Box, Button, MenuItem } from "@mui/material";
import { Formik } from "formik";
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
import { listarUsuarios } from "../../Services/usuariosApi.js";


const PedidoNuevo = () => {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
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
                        popup: "swal2-rounded",
                        confirmButton: "swal2-confirm-custom",
                    },
                });
            }
        };
        fetchClientes();
    }, []);

    const handleFormSubmit = async (values, actions) => {
        try {
            const resultado = await crearPedido(values);
            await crearCarpetasDrive(values.numero_contrato, values.id_cliente);

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
        }
    };

    const initialValues = FieldsData.reduce((acc, campo) => {
        acc[campo.name] = "";
        return acc;
    }, {});

    const validationSchema = yup.object(
        FieldsData.reduce((acc, campo) => {
            acc[campo.name] = yup.string().nullable();
            return acc;
        }, {})
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
                                value={values.estado}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!touched.estado && !!errors.estado}
                                helperText={touched.estado && errors.estado}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="EN PUERTO">En Puerto</MenuItem>
                                <MenuItem value="ENTREGADO">Entregado</MenuItem>
                                <MenuItem value="EN PROCESO">En Proceso</MenuItem>
                            </CustomTextField>
                        </>
                    )} />
            </Box>
        </div>
    );
};

export default PedidoNuevo;
