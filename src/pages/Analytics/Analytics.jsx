import Header from "../../components/Header/Header.jsx";
import BarChartCard from "../../components/BarChartCard/BarChartCard";
import LineChart from "../../components/LineChart/LineChart.jsx";
import { BarChart, Bar, Tooltip, XAxis, YAxis } from 'recharts';
import { data } from "../../Data/DataAnalytics.jsx"
import { useWindowWidth } from "../../hooks/useWindowWidth";
import './Analytics.css';

const Analytics = () => {
    const width = useWindowWidth();

    const options = {
        chart: {
            id: "basic-line",
        },
        colors: ['#052462', '#E7423E'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19T00:00:00.000Z",
                "2018-09-19T01:30:00.000Z",
                "2018-09-19T02:30:00.000Z",
                "2018-09-19T03:30:00.000Z",
                "2018-09-19T04:30:00.000Z",
                "2018-09-19T05:30:00.000Z",
                "2018-09-19T06:30:00.000Z",
            ],
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
    };

    const series = [
        {
            name: "Clientes",
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: "Pedidos",
            data: [11, 32, 45, 32, 34, 52, 41],
        },
    ];

    return (
        <div className="analytics">
            <Header title="Analytics" subtitle="Visión General de Analytics" />
            <div>
                <div className="ChartItems">
                    <BarChartCard title="Pedidos En Progreso" counter={211} fill="#052462" month="Mes Actual" />
                    <BarChartCard title="Pedidos Completados" counter={212} fill="#6E81A4" month="Mes Actual" />
                    <BarChartCard title="Pedidos Entregados" counter={213} fill="#E7423E" month="Mes Actual" />
                </div>
                <div className="MiddleTaskChart">
                    <p className="ChartText">Pedidos Creados vs Pedidos Completados </p>
                    <div className="LineChartVS">
                        <LineChart options={options} series={series} />
                    </div>
                </div>
                <div className="DobleCard">
                    <div className="column">
                        <p className="ChartText">Clientes</p>
                        <div className="BarChartClientes">
                            <BarChart width={width * 0.4} height={350} data={data}
                                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <Tooltip />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar dataKey="uv" fill="#052462" />
                            </BarChart>
                        </div>
                    </div>
                    <div className="column">
                        <p className="ChartText">Pedidos</p>
                        <div className="BarChartPedidos">
                            <BarChart width={width * 0.4} height={350} data={data}
                                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <Tooltip />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar dataKey="uv" fill="#E7423E" />
                            </BarChart>
                        </div>
                    </div>
                </div>
                {/* <div className="ClientesBarChart">
                    <p className="ChartText">Clientes</p>
                    <BarChart width={width * 0.80} height={350} data={data}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <Tooltip />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="uv" fill="#6E81A4" />
                    </BarChart>
                </div> */}
            </div>
        </div >
    )
}

export default Analytics
