import { BarChart, Bar, Tooltip, XAxis } from 'recharts';
import './BarChartCard.css';

const BarChartCard = ({ title, counter, fill, data }) => {
    return (
        <div>
            <div className="ItemContainer">
                <div className="ItemContainer1">
                    <div className="Content">
                        <p className="taskProgress">{title}</p>
                        <p className="taskCounter" style={{ color: fill }}>{counter}</p>
                        <p className="currentMonth1">Mes actual</p>
                    </div>
                    <div className="BarChartContainer">
                        <BarChart width={260} height={120} data={data}>
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 8, angle: -90, textAnchor: "end" }}
                                interval={3}
                            />
                            <Tooltip />
                            <Bar dataKey="cantidad" fill={fill} />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BarChartCard;
