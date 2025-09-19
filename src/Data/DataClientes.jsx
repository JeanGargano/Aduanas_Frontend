import { Link } from "react-router-dom";

const columStyle = {
    flex: "auto",
    width: 260,
};
// Columns for the usuarios table
export const columnsUsuarios = [
    {
        field: "identificacion",
        headerName: "Identificación",
        type: "string",
        align: "left",
        headerAlign: "left",
        cellClassName: "id_cliente-column--cell",
        renderCell: (params) => (
            <Link
                to={`/pedidos/cliente/${params.value}`}
                style={{ color: "#E7423E", textDecoration: "none", fontWeight: "bold" }}
            >
                {params.value}
            </Link>
        ),
        ...columStyle,

    },
    {
        field: "nombre",
        headerName: "Nombre",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
    {
        field: "correo",
        headerName: "Correo",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
    {
        field: "celular",
        headerName: "Celular",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
    {
        field: "rol",
        headerName: "Rol",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
];

const gridColumnsSmall = "span 4";

export const FieldsDataClientes = [
    {
        name: "identificacion",
        label: "Identificación",
        type: "number",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "nombre",
        label: "Nombre",
        type: "text",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "correo",
        label: "Correo",
        type: "email",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "celular",
        label: "Celular",
        type: "number",
        gridColumn: gridColumnsSmall,
    },
];
