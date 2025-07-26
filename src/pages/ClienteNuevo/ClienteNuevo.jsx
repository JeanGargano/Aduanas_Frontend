import { Box, Button, MenuItem } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import { FieldsDataClientes } from "../../Data/DataClientes.jsx";
import Form from "../../components/Form/Form.jsx";
import CustomTextField from "../../components/CustomTextField/CustomTextField.jsx";
import * as yup from "yup";
import Swal from "sweetalert2";
import { crearCliente } from "../../Services/usuariosApi.js";

const ClienteNuevo = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        try {
            const respuesta = await crearCliente(values);
            console.log("Cliente creado:", respuesta);
            actions.resetForm();
            Swal.fire({
                title: "Usuario creado",
                text: "El usuario se ha registrado correctamente.",
                icon: "success",
                background: "#fff",
                iconColor: "#052462",
                confirmButtonColor: "#E7423E",
                confirmButtonText: "Ver clientes",
                customClass: {
                    popup: "swal2-rounded",
                    confirmButton: "swal2-confirm-custom",
                },
            }).then(() => {
                navigate("/clientes");
            });
        } catch (error) {
            console.error("Error al crear cliente:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo registrar el cliente. Intenta nuevamente.",
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

    const initialValues = FieldsDataClientes.reduce((acc, campo) => {
        acc[campo.name] = "";
        return acc;
    }, {});

    const validationSchema = yup.object(
        FieldsDataClientes.reduce((acc, campo) => {
            acc[campo.name] = yup.string().required("Este campo es requerido");
            return acc;
        }, {})
    );

    return (
        <Box m="20px">
            <Header title="Nuevo Cliente" subtitle="Registro de nuevo cliente" />
            <Form
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
                btnText="Crear Cliente"
                extraFields={null}
                FieldsData={FieldsDataClientes}
            />
        </Box>
    );
};

export default ClienteNuevo;