import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerUsuarioPorId, actualizarUsuarioPorId } from "../../Services/usuariosApi.js";
import Form from "../../components/Form/Form.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import * as yup from "yup";
import { CircularProgress, Box } from "@mui/material";
import { FieldsDataClientes } from "../../Data/DataClientes.jsx";
import Header from "../../components/Header/Header.jsx";
import "./ClientesEditar.css";
import Swal from "sweetalert2";


const generarValoresIniciales = (cliente) => {
    const valores = {};
    FieldsDataClientes.forEach((campo) => {
        valores[campo.name] = cliente[campo.name] || null;
    });
    return valores;
};

const generarValidationSchema = () => {
    const schema = {};
    FieldsDataClientes.forEach((campo) => {
        schema[campo.name] = yup.string().nullable();
    });
    return yup.object().shape(schema);
};



const ClientesEditar = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                setLoading(true);
                const data = await obtenerUsuarioPorId(id);
                setCliente(data[0]); // asumiendo que devuelve un array
            } catch (error) {
                console.error("Error al obtener cliente:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCliente();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            if (!id) throw new Error("ID de cliente no proporcionado");

            const datosLimpios = {};
            Object.entries(values).forEach(([key, value]) => {
                datosLimpios[key] = value === "" ? null : value;
            });

            console.log("Datos limpios:", datosLimpios);
            console.log("ID del cliente:", id);

            await actualizarUsuarioPorId(id, datosLimpios);

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

    if (!cliente) {
        return <div>No se pudo cargar el cliente.</div>;
    }

    // Asegúrate de generar los valores solo cuando `cliente` ya esté disponible
    const initialValues = {
        ...generarValoresIniciales(cliente),
        // estado: cliente.estado || "", // <- esto asegura que sí esté
    };
    const validationSchema = generarValidationSchema();

    return (
        <div className="clientesEditar">
            <Box m="20px">
                <Header title="Editar Cliente" subtitle={`Editando Cliente: ${cliente.id}`} />
                <Form
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    btnText="Actualizar Cliente"
                    FieldsData={FieldsDataClientes}
                    extraFields={null}
                />
            </Box>
            <Loading open={loading} />
        </div>
    )

}

export default ClientesEditar
