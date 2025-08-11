import Chart from "react-apexcharts";
import { useWindowWidth } from "../../hooks/useWindowWidth";

const LineChart = ({ options, series, Owidth }) => {
    const width = useWindowWidth();

    return (
        <div className='LineChartContainer'>
            <Chart
                options={options}
                series={series}
                type="area"
                width={Owidth || width * 0.8}
                height={315}
            />
        </div>
    )
}

export default LineChart
