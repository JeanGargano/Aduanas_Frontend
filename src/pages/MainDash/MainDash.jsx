import './MainDash.css';
import Cards from '../../components/Cards/Cards.jsx';
import Table from '../../components/Table/Table.jsx';
import { columnsPedidos } from '../../Data/DataPedidos.jsx';
import { usePedidosRol } from '../../hooks/usePedidosRol.js';
import { Box, Button, useMediaQuery, Backdrop, CircularProgress } from "@mui/material";

const MainDash = () => {
    const { rows, loading, error } = usePedidosRol();

    const ultimosPedidos = [...rows]
        .sort((a, b) => b.id_pedido - a.id_pedido)
        .slice(0, 5);

    return (
        <div className="MainDash">
            <h1>Dashboard</h1>
            <Cards />

            {loading ? (
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

            ) : error ? (
                <p>Error al cargar pedidos</p>
            ) : (
                <Table
                    rows={ultimosPedidos}
                    columns={columnsPedidos}
                    title={"Últimos pedidos"}
                />
            )}
        </div>
    );
};

export default MainDash;