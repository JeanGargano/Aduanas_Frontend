import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerPedidoPorId, actualizarPedidoPorId } from "../../Services/pedidosApi.js";
import Form from "../../components/Form/Form.jsx";
import * as yup from "yup";
import { Box, MenuItem } from "@mui/material";
import { FieldsData } from "../../Data/DataPedidos.jsx";
import CustomTextField from "../../components/CustomTextField/CustomTextField.jsx";
import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { crearCorreo } from "../../Services/SmtpApi.js";
import { crearNotificacion, obtenerFechaLocal } from "../../Services/notificacionesApi.js";
import { obtenerUsuarioPorId } from "../../Services/usuariosApi.js";
import { useToken } from "../../hooks/useToken.js";
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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { token_type, access_token } = useToken();

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                setLoading(true);
                const data = await obtenerPedidoPorId(id, token_type, access_token);
                setPedido(data[0]);
            } catch (error) {
                console.error("Error al obtener pedido:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPedido();
    }, [id, token_type, access_token]);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            if (!id) {
                throw new Error("ID del pedido no está presente.");
            }

            //convertir "" en null antes de enviar
            const datosLimpios = {};
            Object.entries(values).forEach(([key, value]) => {
                datosLimpios[key] = value === "" ? null : value;
            });

            await actualizarPedidoPorId(id, datosLimpios, token_type, access_token);

            const usuario = await obtenerUsuarioPorId(datosLimpios.id_cliente);

            const nuevaNotificacion = {
                usuario_id: datosLimpios.id_cliente,
                pedido_id: id,
                mensaje: `Señor/a ${usuario[0].nombre} el estado de su pedido ${datosLimpios.numero_contrato} ha sido actualizado a ${datosLimpios.estado}.`,
                fecha: obtenerFechaLocal()
            };

            const nuevoCorreo = {
                destinatario: usuario[0].correo,
                asunto: `Cambio de estado a ${datosLimpios.estado}`,
                numero_contrato: datosLimpios.numero_contrato,
                producto: datosLimpios.producto,
                contender: datosLimpios.contenedor,
                puerto: datosLimpios.puerto_arribo,
                dias_libres: `${datosLimpios.dias_libres}`
            };

            await crearNotificacion(nuevaNotificacion, token_type, access_token);
            await crearCorreo(nuevoCorreo);

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
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading open={loading} />;
    }

    if (!pedido) {
        return <div>No se pudo cargar el pedido.</div>;
    }

    // Asegúrate de generar los valores solo cuando `pedido` ya esté disponible
    const initialValues = {
        ...generarValoresIniciales(pedido),
        estado: pedido.estado || "", // <- esto asegura que sí esté
        puerto_arribo: pedido.puerto_arribo || "",
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
                        <>
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
                                <MenuItem value="REGISTRADO">Registrado</MenuItem>
                                <MenuItem value="EN PUERTO">En Puerto</MenuItem>
                                <MenuItem value="ENTREGADO">Entregado</MenuItem>
                                <MenuItem value="EN PROCESO">En Proceso</MenuItem>
                            </CustomTextField>
                            <CustomTextField
                                name="puerto_arribo"
                                label="Puerto"
                                select
                                value={values.puerto_arribo}
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
                    )}
                />
            </Box>
            <Loading open={loading} />
        </div>
    );
};

export default PedidoEditar;
