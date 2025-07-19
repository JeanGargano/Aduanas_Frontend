import { Box, Button, MenuItem } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import { FieldsData } from "../../Data/Data.jsx";
import Form from "../Form/Form.jsx";
import CustomTextField from "../CustomTextField/CustomTextField.jsx";
import * as yup from "yup";
import Swal from "sweetalert2";
import "./PedidoNuevo.css";
import { crearPedido } from "../../Services/pedidosApi.js";


const PedidoNuevo = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async (values, actions) => {
        try {
            console.log("Valores del formulario:", values);
            const resultado = await crearPedido(values);
            console.log("Pedido creado:", resultado);
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
        <Box m="20px">
            <Header title="Crear Nuevo Pedido" subtitle="Crear un Nuevo Pedido" />
            <Form onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={validationSchema} btnText={"Crear Pedido"}
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
                )} />
        </Box>
    );
};

export default PedidoNuevo;
