// src/components/FinisherBackground.jsx
import { useEffect } from "react";

const FinisherBackground = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./finisher-header.es5.min.js";
        script.async = true;

        script.onload = () => {
            if (window.FinisherHeader) {
                new window.FinisherHeader({
                    "count": 100,
                    "size": {
                        "min": 30,
                        "max": 40,
                        "pulse": 0
                    },
                    "speed": {
                        "x": {
                            "min": 0,
                            "max": 0.4
                        },
                        "y": {
                            "min": 0,
                            "max": 0.1
                        }
                    },
                    "colors": {
                        "background": "#052462",
                        "particles": [
                            "#E7423E",
                            "#E7423E",
                            "#E7423E",
                            "#E7423E",
                            "#E7423E"
                        ]
                    },
                    "blending": "screen",
                    "opacity": {
                        "center": 0.5,
                        "edge": 1
                    },
                    "skew": 0,
                    "shapes": [
                        "c",
                        "t",
                        "s"
                    ]
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="finisher-header"
            style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: -1,
                pointerEvents: "none",
            }}
        />
    );
};

export default FinisherBackground;
