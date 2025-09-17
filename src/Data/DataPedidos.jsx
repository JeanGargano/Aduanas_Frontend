import { Link } from "react-router-dom";

const gridColumnsSmall = 24;

export const FieldsData = [
    {
        name: "fecha_creacion",
        label: "Fecha de Creación del Pedido",
        type: "date",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "id_cliente",
        label: "ID Cliente",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "do",
        label: "D.O",
        type: "string",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "numero_contrato",
        label: "Número Contrato",
        type: "string",
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
    { name: "sticker", label: "Sticker", type: "number", gridColumn: gridColumnsSmall },
    { name: "dec_valor", label: "DEC Valor", type: "string", gridColumn: gridColumnsSmall },
    { name: "proveedor", label: "Proveedor", type: "string", gridColumn: gridColumnsSmall },
    { name: "producto", label: "Producto", type: "string", gridColumn: gridColumnsSmall },
    {
        name: "numero_factura",
        label: "Número Factura",
        type: "string",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "fecha_factura",
        label: "Fecha Factura",
        type: "date",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "numero_lista_empaque",
        label: "Número Lista Empaque",
        type: "string",
        gridColumn: gridColumnsSmall,
    },
    { name: "tipo_empaque", label: "Tipo Empaque", type: "string", gridColumn: gridColumnsSmall },
    {
        name: "certificado_sanitario",
        label: "Certificado Sanitario",
        type: "string",
        gridColumn: gridColumnsSmall,
    },
    { name: "lote", label: "Lote", type: "string", gridColumn: gridColumnsSmall },
    {
        name: "fecha_vencimiento",
        label: "Fecha Vencimiento",
        type: "date",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "radicado_invima",
        label: "Radicado Invima",
        type: "number",
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
        type: "string",
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
        type: "string",
        gridColumn: gridColumnsSmall,
    },
    { name: "fecha", label: "Fecha", type: "date", gridColumn: gridColumnsSmall },
    { name: "bl", label: "BL", type: "string", gridColumn: gridColumnsSmall },
    { name: "naviera", label: "Naviera", type: "string", gridColumn: gridColumnsSmall },
    { name: "moto_nave", label: "Moto Nave", type: "string", gridColumn: gridColumnsSmall },
    { name: "bandera", label: "Bandera", type: "string", gridColumn: gridColumnsSmall },
    { name: "viaje", label: "Viaje", type: "string", gridColumn: gridColumnsSmall },
    { name: "contenedor", label: "Contenedor", type: "string", gridColumn: gridColumnsSmall },
    { name: "peso", label: "Peso", type: "string", gridColumn: gridColumnsSmall },
    {
        name: "manifiesto",
        label: "Manifiesto",
        type: "number",
        gridColumn: gridColumnsSmall,
    },
    {
        name: "fecha_llegada",
        label: "Fecha Arribo",
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
    width: 150,
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
        field: "do",
        headerName: "D.O",
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
        field: "fecha_creacion",
        headerName: "Fecha de Creación",
        type: "date",
        valueGetter: (params) => {
            if (!params) return null; // si no hay valor, devuelve null
            const fecha = new Date(params + ' 00:00:00');
            return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
        },
        ...columStyle,
    },
    {
        field: "fecha_arribo",
        headerName: "Fecha de Arribo",
        type: "date",
        valueGetter: (params) => {
            if (!params) return null; // si no hay valor, devuelve null
            const fecha = new Date(params + ' 00:00:00');
            return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
        },
        ...columStyle,
    },
    {
        field: "fecha_entrega_transporte",
        headerName: "Fecha de Entrega Transporte",
        type: "date",
        valueGetter: (params) => {
            if (!params) return null; // si no hay valor, devuelve null
            const fecha = new Date(params + ' 00:00:00');
            return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
        },
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
        valueGetter: (params) => {
            if (!params) return null; // si no hay valor, devuelve null
            const fecha = new Date(params + ' 00:00:00');
            return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
        },
        ...columStyle,
    },
    { field: "sticker", headerName: "Sticker", ...columStyle },
    { field: "dec_valor", headerName: "DEC Valor", ...columStyle },
    { field: "proveedor", headerName: "Proveedor", ...columStyle },
    {
        field: "numero_contrato", headerName: "Número Contrato", renderCell: (params) => (
            <Link
                to={`https://drive.google.com/drive/u/0/folders/1KkHNZXXJpwcvkwJg0SiHFHjn3a7WRM2p`}
                style={{ color: "#E7423E", textDecoration: "none", fontWeight: "bold" }}
            >
                {params.value}
            </Link>
        ),
        ...columStyle
    },

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
        valueGetter: (params) => {
            if (!params) return null; // si no hay valor, devuelve null
            const fecha = new Date(params + ' 00:00:00');
            return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
        },
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
        valueGetter: (params) => {
            if (!params) return null; // si no hay valor, devuelve null
            const fecha = new Date(params + ' 00:00:00');
            return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
        },
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
        valueGetter: (params) => {
            if (!params) return null; // si no hay valor, devuelve null
            const fecha = new Date(params + ' 00:00:00');
            return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
        },
        ...columStyle,
    },
    {
        field: "registro_de_importacion",
        headerName: "Registro de Importación",
        ...columStyle,
    },
    {
        field: "fecha", headerName: "Fecha", type: "date", valueGetter: (params) => {
            if (!params) return null; // si no hay valor, devuelve null
            const fecha = new Date(params + ' 00:00:00');
            return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
        }, ...columStyle
    },
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
        valueGetter: (params) => {
            if (!params) return null; // si no hay valor, devuelve null
            const fecha = new Date(params + ' 00:00:00');
            return isNaN(fecha.getTime()) ? null : fecha; // si no es fecha válida, null
        },
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