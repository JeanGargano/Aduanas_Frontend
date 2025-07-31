import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";

const Table = ({ rows, columns, title }) => {
    const rowHeight = 52;      // altura por fila
    const headerHeight = 56;   // altura del encabezado
    const [pageSize, setPageSize] = useState(5); // valor inicial

    return (
        <Box m="20px">
            <h1>{title}</h1>
            <Box
                m="40px 0 0 0"
                sx={{
                    height: rowHeight * pageSize + headerHeight,
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
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#F16862",
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#f2f0f0",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: "#F16862",
                    },
                    "& .MuiCheckbox-root": {
                        color: "#1e5245!important",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: "#141414!important",
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    pageSize={pageSize}
                    onPageSizeChange={(newSize) => setPageSize(newSize)}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </Box>
        </Box>
    );
};

export default Table;
