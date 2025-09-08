import { useState } from 'react';
import './MainDash.css';
import Cards from '../../components/Cards/Cards.jsx';
import Table from '../../components/Table/Table.jsx';
import { useAuth } from '../../Context/AuthContext.jsx';
import { columnsPedidos } from '../../Data/DataPedidos.jsx';
import { usePedidosRol } from '../../hooks/usePedidosRol.js';
import { Link } from "react-router-dom";
import Loading from '../../components/Loading/Loading.jsx';

const MainDash = () => {
    const { rows, resumen, error } = usePedidosRol();
    const { usuario } = useAuth();
    const [loading] = useState(false);

    const rol = usuario?.usuario?.rol;

    const ultimosPedidos = [...rows]
        .sort((a, b) => b.id_pedido - a.id_pedido)
        .slice(0, 5);

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
                ...columnsPedidos, // columnas normales para admin
            ]
            : columnasNoAdmin; // columnas restringidas

    return (
        <div className="MainDash">
            <h1>Inicio</h1>
            {loading ? (
                <Loading open={loading} />
            ) : (
                <Cards resumen={resumen} />
            )}
            {error ? (
                <p>Error al cargar pedidos</p>
            ) : (
                <Table
                    rows={ultimosPedidos}
                    columns={columnas}
                    title={"Últimos pedidos"}
                />
            )}
            <Loading open={loading} />
        </div>
    );
};

export default MainDash;