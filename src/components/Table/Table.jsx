import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Table = ({ rows, columns, title }) => {
    return (
        <Box m="20px">
            <h1>{title}</h1>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
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
                />
            </Box>
        </Box >
    );
};

export default Table;
