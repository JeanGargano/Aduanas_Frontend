import './MainDash.css';
import Cards from '../Cards/Cards.jsx';
import Table from '../Table/Table.jsx';
import RightSide from '../RightSide/RightSide.jsx';
import { columnsPedidos } from '../../Data/Data.jsx';
import { usePedidos } from '../../hooks/usePedidos.js';

const MainDash = () => {
    const { rows, loading, error } = usePedidos();

    const ultimosPedidos = [...rows]
        .sort((a, b) => b.id_pedido - a.id_pedido) // orden descendente
        .slice(0, 5); // tomar los primeros 5

    return (
        <div className="MainDash">
            <h1>Dashboard</h1>
            <Cards />

            {loading ? (
                <p>Cargando pedidos...</p>
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