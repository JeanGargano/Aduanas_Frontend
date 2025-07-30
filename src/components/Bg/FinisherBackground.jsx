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
                    "count": 5,
                    "size": {
                        "min": 900,
                        "max": 1500,
                        "pulse": 0
                    },
                    "speed": {
                        "x": {
                            "min": 0,
                            "max": 0.3
                        },
                        "y": {
                            "min": 0,
                            "max": 0
                        }
                    },
                    "colors": {
                        "background": "#052462",
                        "particles": [
                            "#E7423E"
                        ]
                    },
                    "blending": "lighten",
                    "opacity": {
                        "center": 0.15,
                        "edge": 0.4
                    },
                    "skew": 0,
                    "shapes": [
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
