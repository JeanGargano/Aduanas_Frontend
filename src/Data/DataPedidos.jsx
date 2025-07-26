import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const gridColumnsSmall = "span";

export const FieldsData = [
    {
        name: "numero_contrato",
        label: "Número Contrato",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "fecha_arribo",
        label: "Fecha de Arribo",
        type: "date",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "fecha_entrega_transporte",
        label: "Fecha de Entrega Transporte",
        type: "date",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "radicado_dim",
        label: "Radicado DIM",
        type: "number",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "numero_aceptacion",
        label: "Número Aceptación",
        type: "number",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "fecha_aceptacion",
        label: "Fecha Aceptación",
        type: "date",
        gridColumn: gridColumnsSmall,
    },
    { name: "sticker", label: "Sticker", gridColumn: gridColumnsSmall },
    { name: "dec_valor", label: "DEC Valor", gridColumn: gridColumnsSmall },
    { name: "proveedor", label: "Proveedor", gridColumn: gridColumnsSmall },
    { name: "producto", label: "Producto", gridColumn: gridColumnsSmall },
    {
        name: "numero_factura",
        label: "Número Factura",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "fecha_factura",
        label: "Fecha Factura",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "numero_lista_empaque",
        label: "Número Lista Empaque",
        gridColumn: gridColumnsSmall,
    },
    { name: "tipo_empaque", label: "Tipo Empaque", gridColumn: gridColumnsSmall },
    {
        name: "certificado_sanitario",
        label: "Certificado Sanitario",
        gridColumn: gridColumnsSmall,
    },
    { name: "lote", label: "Lote", gridColumn: gridColumnsSmall },
    {
        name: "fecha_vencimiento",
        label: "Fecha Vencimiento",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "radicado_invima",
        label: "Radicado Invima",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "llave",
        label: "Llave",
        type: "number",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "fecha_radicado_invima",
        label: "Fecha Radicado Invima",
        type: "date",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "numero_solicitud_invima",
        label: "Número Solicitud Invima",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "numero_certificado_invima",
        label: "Número Certificado Invima",
        type: "number",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "fecha_certificado_invima",
        label: "Fecha Certificado Invima",
        type: "date",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "registro_de_importacion",
        label: "Registro de Importación",
        gridColumn: gridColumnsSmall,
    },
    { name: "fecha", label: "Fecha", type: "date", gridColumn: gridColumnsSmall },
    { name: "bl", label: "BL", gridColumn: gridColumnsSmall },
    { name: "naviera", label: "Naviera", gridColumn: gridColumnsSmall },
    { name: "moto_nave", label: "Moto Nave", gridColumn: gridColumnsSmall },
    { name: "bandera", label: "Bandera", gridColumn: gridColumnsSmall },
    { name: "viaje", label: "Viaje", gridColumn: gridColumnsSmall },
    { name: "contenedor", label: "Contenedor", gridColumn: gridColumnsSmall },
    { name: "peso", label: "Peso", type: "number", gridColumn: gridColumnsSmall },
    {
        name: "manifiesto",
        label: "Manifiesto",
        type: "number",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "puerto_arribo",
        label: "Puerto Arribo",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "fecha_llegada",
        label: "Fecha Llegada",
        type: "date",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "dias_libres",
        label: "Días Libres",
        type: "number",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "observaciones",
        label: "Observaciones",
        multiline: true,
        gridColumn: gridColumnsSmall,
    },
    {
        name: "entrega_transporte",
        label: "Entrega Transporte",
        gridColumn: gridColumnsSmall,
    },
];

// Columns for the DataGrid in Pedidos component
// This is used to display the pedidos in a table format
const columStyle = {
    flex: "auto",
    width: 125,
};



// Columns for the pedidos table
export const columnsPedidos = [
    {
        field: "estado",
        headerName: "Estado",
        ...columStyle,
    },
    {
        field: "id_pedido",
        headerName: "ID Pedido",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
    {
        field: "id_cliente",
        headerName: "ID Cliente",
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
        field: "fecha_arribo",
        headerName: "Fecha de Arribo",
        type: "date",
        ...columStyle,
    },
    {
        field: "fecha_entrega_transporte",
        headerName: "Fecha de Entrega Transporte",
        type: "date",
        ...columStyle,
    },
    {
        field: "radicado_dim",
        headerName: "Radicado DIM",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
    {
        field: "numero_aceptacion",
        headerName: "Número Aceptación",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
    {
        field: "fecha_aceptacion",
        headerName: "Fecha Aceptación",
        type: "date",
        ...columStyle,
    },
    { field: "sticker", headerName: "Sticker", ...columStyle },
    { field: "dec_valor", headerName: "DEC Valor", ...columStyle },
    { field: "proveedor", headerName: "Proveedor", ...columStyle },
    { field: "numero_contrato", headerName: "Número Contrato", ...columStyle },
    { field: "producto", headerName: "Producto", ...columStyle },
    { field: "numero_factura", headerName: "Número Factura", ...columStyle },
    { field: "fecha_factura", headerName: "Fecha Factura", ...columStyle },
    {
        field: "numero_lista_empaque",
        headerName: "Número Lista Empaque",
        ...columStyle,
    },
    { field: "tipo_empaque", headerName: "Tipo Empaque", ...columStyle },
    {
        field: "certificado_sanitario",
        headerName: "Certificado Sanitario",
        ...columStyle,
    },
    { field: "lote", headerName: "Lote", ...columStyle },
    {
        field: "fecha_vencimiento",
        headerName: "Fecha Vencimiento",
        type: "date",
        ...columStyle,
    },
    { field: "radicado_invima", headerName: "Radicado Invima", ...columStyle },
    {
        field: "llave",
        headerName: "Llave",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
    {
        field: "fecha_radicado_invima",
        headerName: "Fecha Radicado Invima",
        type: "date",
        ...columStyle,
    },
    {
        field: "numero_solicitud_invima",
        headerName: "Número Solicitud Invima",
        ...columStyle,
    },
    {
        field: "numero_certificado_invima",
        headerName: "Número Certificado Invima",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
    {
        field: "fecha_certificado_invima",
        headerName: "Fecha Certificado Invima",
        type: "date",
        ...columStyle,
    },
    {
        field: "registro_de_importacion",
        headerName: "Registro de Importación",
        ...columStyle,
    },
    { field: "fecha", headerName: "Fecha", type: "date", ...columStyle },
    { field: "bl", headerName: "BL", ...columStyle },
    { field: "naviera", headerName: "Naviera", ...columStyle },
    { field: "moto_nave", headerName: "Moto Nave", ...columStyle },
    { field: "bandera", headerName: "Bandera", ...columStyle },
    { field: "viaje", headerName: "Viaje", ...columStyle },
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
        field: "manifiesto",
        headerName: "Manifiesto",
        type: "string",
        align: "left",
        headerAlign: "left",
        ...columStyle,
    },
    { field: "puerto_arribo", headerName: "Puerto Arribo", ...columStyle },
    {
        field: "fecha_llegada",
        headerName: "Fecha Llegada",
        type: "date",
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
    {
        field: "entrega_transporte",
        headerName: "Entrega Transporte",
        ...columStyle,
    },

];