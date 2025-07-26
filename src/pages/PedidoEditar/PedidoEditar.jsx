import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerPedidoPorId, actualizarPedidoPorId } from "../../Services/pedidosApi.js";
import Form from "../../components/Form/Form.jsx";
import * as yup from "yup";
import { CircularProgress, Box, MenuItem } from "@mui/material";
import { FieldsData } from "../../Data/DataPedidos.jsx";
import CustomTextField from "../../components/CustomTextField/CustomTextField.jsx";
import Header from "../../components/Header/Header.jsx";
import "./PedidoEditar.css";
import Swal from "sweetalert2";

// Generar valores iniciales desde los campos
const generarValoresIniciales = (pedido) => {
    const valores = {};
    FieldsData.forEach((campo) => {
        valores[campo.name] = pedido[campo.name] || null;
    });
    return valores;
};

// Validación dinámica (opcional, personaliza según tus necesidades)
const generarValidationSchema = () => {
    const schema = {};
    FieldsData.forEach((campo) => {
        if (campo.type === "number") {
            schema[campo.name] = yup.number().nullable();
        } else if (campo.type === "date") {
            schema[campo.name] = yup.date().nullable();
        } else {
            schema[campo.name] = yup.string().nullable();
        }
    });
    return yup.object().shape(schema);
};


const PedidoEditar = () => {
    const { id } = useParams();
    const [pedido, setPedido] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const data = await obtenerPedidoPorId(id);
                setPedido(data[0]);
            } catch (error) {
                console.error("Error al obtener pedido:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPedido();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            if (!id) {
                throw new Error("ID del pedido no está presente.");
            }

            //convertir "" en null antes de enviar
            const datosLimpios = {};
            Object.entries(values).forEach(([key, value]) => {
                datosLimpios[key] = value === "" ? null : value;
            });

            const resultado = await actualizarPedidoPorId(id, datosLimpios);

            Swal.fire({
                title: "Pedido actualizado",
                text: "El pedido se ha actualizado correctamente.",
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
            console.error("Fallo al actualizar pedido:", error);

            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el pedido. Intenta nuevamente.",
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

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (!pedido) {
        return <div>No se pudo cargar el pedido.</div>;
    }

    // Asegúrate de generar los valores solo cuando `pedido` ya esté disponible
    const initialValues = {
        ...generarValoresIniciales(pedido),
        estado: pedido.estado || "", // <- esto asegura que sí esté
    };
    const validationSchema = generarValidationSchema();

    return (
        <div className="pedidosEditar">
            <Box m="20px">
                <Header title="Editar Pedido" subtitle={`Editando Pedido: ${pedido.id_pedido}`} />
                <Form
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    btnText="Actualizar Pedido"
                    FieldsData={FieldsData}
                    extraFields={({ values, errors, touched, handleChange, handleBlur }) => (
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
                    )}
                />
            </Box>
        </div>
    );
};

export default PedidoEditar;
