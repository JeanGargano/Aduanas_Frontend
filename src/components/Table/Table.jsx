import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const Table = ({ rows, columns, title }) => {
    const rowHeight = 52;      // altura por fila
    const headerHeight = 56;   // altura del encabezado
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

    return (
        <Box m="20px">
            <h1>{title}</h1>
            <Box
                m="40px 0 0 0"
                sx={{
                    height: rowHeight * paginationModel.pageSize + headerHeight,
                    minHeight: 450,
                    maxHeight: 836,
                    width: "100%",
                    transition: "height 0.3s ease",
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .id_cliente-column--cell": {
                        color: "#E7423E",
                    },
                    '& .MuiDataGrid-toolbar': { // Selector CSS para el contenedor del toolbar
                        backgroundColor: '#F16862 !important', // Cambia el color de fondo
                        padding: '20px', // Agrega padding
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#f2f0f0",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: "#F16862 !important",
                    },
                    "& .MuiCheckbox-root": {
                        color: "#1e5245!important",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: "#141414!important",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#F16862 !important",
                        borderBottom: "none",
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 15, 30, 50]} // <- renamed prop en v6+
                    showToolbar
                />
            </Box>
        </Box>
    );
};

export default Table;
