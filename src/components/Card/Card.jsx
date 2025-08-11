import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

const Card = (props) => {
    const [expanded, setExpanded] = useState(false);
    const layoutId = `expandableCard-${props.id}`; // ID único por tarjeta

    return (
        <LayoutGroup>
            <AnimatePresence initial={false} mode="wait">
                {expanded ? (
                    <ExpandedCard
                        key={`${props.id}-expanded`}
                        param={props}
                        setExpanded={() => setExpanded(false)}
                        layoutId={layoutId}
                    />
                ) : (
                    <CompactCard
                        key={`${props.id}-compact`}
                        param={props}
                        setExpanded={() => setExpanded(true)}
                        layoutId={layoutId}
                    />
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
};

// Compact Card
function CompactCard({ param, setExpanded, layoutId }) {
    const Png = param.png;
    return (
        <motion.div
            layoutId={layoutId}
            className="CompactCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            onClick={setExpanded}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <div className="radialBar">
                <CircularProgressbar
                    value={param.barValue}
                    text={`${param.barValue}%`}
                />
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <Png />
                <span>{param.value}</span>
                <span>Último mes</span>
            </div>
        </motion.div>
    );
}

// Expanded Card
function ExpandedCard({ param, setExpanded, layoutId }) {
    const data = {
        options: {
            chart: { type: "area", height: "auto" },
            dropShadow: { enabled: false },
            fill: { colors: ["#fff"], type: "gradient" },
            dataLabels: { enabled: false },
            stroke: { curve: "smooth", colors: ["white"] },
            tooltip: { x: { format: "dd/MM/yy HH:mm" } },
            grid: { show: true },
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
        },
    };

    return (
        <motion.div
            layoutId={layoutId}
            className="ExpandedCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
                <UilTimes onClick={setExpanded} />
            </div>
            <span>{param.title}</span>
            <div className="chartContainer">
                <Chart options={data.options} series={param.series} type="area" />
            </div>
            <span>Último mes</span>
        </motion.div>
    );
}

export default Card;
