import { data } from "../../Data/DataAnalytics"
import { BarChart, Bar, Tooltip } from 'recharts';
import './BarChartCard.css';

const BarChartCard = ({ title, counter, fill }) => {
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
                        <BarChart width={166} height={70} data={data}>
                            <Tooltip />
                            <Bar dataKey="uv" fill={fill} />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BarChartCard
