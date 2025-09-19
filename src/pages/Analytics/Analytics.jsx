import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import BarChartCard from "../../components/BarChartCard/BarChartCard";
import LineChart from "../../components/LineChart/LineChart.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { BarChart, Bar, Tooltip, XAxis, YAxis } from "recharts";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { useAuth } from "../../Context/AuthContext";
import { useAnalyticsData } from "../../hooks/useDataAnalytics.js";
import { useUsuarios } from "../../hooks/useUsuarios";
import "./Analytics.css";

const Analytics = () => {
    const { isAdmin } = useAuth();
    const [loading] = useState(false);
    const width = useWindowWidth();

    const {
        cantidadRegistrados,
        cantidadEnPuerto,
        cantidadEntregados,
        cantidadEnProceso,
        getDataByEstado,
        series,

    } = useAnalyticsData();

    const { resumen, loading: loadingUsuarios } = useUsuarios();

    // 🔹 Datos de pedidos por estado
    const data = getDataByEstado("series");

    // 🔹 Fechas para el gráfico lineal (CORREGIDO)
    const hoy = new Date();
    const dias = [];
    for (let i = 29; i >= 0; i--) {
        const fecha = new Date();
        fecha.setDate(hoy.getDate() - i);

        // Formatear como fecha local sin conversión UTC
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        const fechaLocal = `${year}-${month}-${day}T00:00:00`;

        dias.push(fechaLocal);
    }

    const options = {
        chart: { id: "basic-line" },
        colors: ["#052462", "#E7423E"],
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        xaxis: {
            type: "datetime",
            categories: dias,
            labels: {
                rotate: -90,
                rotateAlways: true,
                maxHeight: 120,
                offsetY: -10,
            },
        },
        legend: { height: 40 },
        tooltip: {
            x: { format: "dd/MM/yy" },
        },
    };

    const ticks =
        Array.from(
            { length: Math.max(...data.map(d => d.cantidad)) + 1 },
            (_, i) => i
        );

    return (
        <div className="analytics">
            <Header title="Analíticas" subtitle="Visión General de las Analíticas" />

            <div>
                {/* Tarjetas superiores */}
                <div className="DobleCardStart">
                    <BarChartCard
                        title="Pedidos Registrados"
                        counter={cantidadRegistrados}
                        fill="#E7423E"
                        data={data}
                    />
                    <BarChartCard
                        title="Pedidos En Puerto"
                        counter={cantidadEnPuerto}
                        fill="#052462"
                        data={getDataByEstado("EN PUERTO")}
                    />
                    <BarChartCard
                        title="Pedidos En Proceso"
                        counter={cantidadEnProceso}
                        fill="#6E81A4"
                        data={getDataByEstado("EN PROCESO")}
                    />
                    <BarChartCard
                        title="Pedidos Entregados"
                        counter={cantidadEntregados}
                        fill="#6E81A4"
                        data={getDataByEstado("ENTREGADOS")}
                    />
                </div>

                {/* Gráfico de línea */}
                <div className="MiddleTaskChart">
                    <p className="ChartText">Pedidos Creados vs Pedidos Completados</p>
                    <div className="LineChartVS">
                        <LineChart options={options} series={series} />
                    </div>
                </div>

                {/* Gráficos inferiores */}
                <div className={isAdmin ? "DobleCard" : "SingleCard"}>
                    {isAdmin && (
                        <div className="column">
                            <p className="ChartText">Clientes</p>
                            <div className="BarChartClientes">
                                <BarChart
                                    width={width * 0.4}
                                    height={350}
                                    data={[{ name: "Usuarios", cantidad_usuarios: resumen.cantidadTotalUsuarios }]}
                                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                                >
                                    <Tooltip />
                                    <XAxis dataKey="name" />
                                    <YAxis
                                        ticks={ticks}
                                    />
                                    <Bar dataKey="cantidad_usuarios" fill="#052462" barSize={40} />
                                </BarChart>
                            </div>
                        </div>
                    )}

                    <div className="column">
                        <p className="ChartText">Pedidos</p>
                        <div className="BarChartPedidos">
                            <BarChart
                                width={isAdmin ? width * 0.4 : width * 0.8}
                                height={350}
                                data={data}
                                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                            >
                                <Tooltip />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 8, angle: -90, textAnchor: "end" }}
                                />
                                <YAxis
                                    ticks={ticks}
                                />
                                <Bar dataKey="cantidad" fill="#E7423E" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div >

            {/* Loadings */}
            < Loading open={loading || loadingUsuarios} />
        </div >
    );
};

export default Analytics;