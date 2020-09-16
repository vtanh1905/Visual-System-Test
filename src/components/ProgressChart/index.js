import React, { useState, useEffect } from "react";

import * as d3 from "d3";
import { Box } from "@material-ui/core";
function useColorIndication(progressPercentage) {
    const [colorIndicator, setColorIndicator] = useState("red");
    useEffect(() => {
        progressPercentage > 70
            ? setColorIndicator("red")
            : progressPercentage > 50
                ? setColorIndicator("orange")
                : progressPercentage > 30
                    ? setColorIndicator("yellow")
                    : setColorIndicator("green");
    }, [progressPercentage]);
    return colorIndicator;
}

function ProgressArc(props) {
    const { svgWidth, arcWidth, progressPercentage, colorIndicator } = props;
    const svgHeight = svgWidth;
    const arcOuterRadius = svgWidth / 2;
    const arcInnerRadius = svgWidth / 2 - arcWidth;
    const arcGenerator = d3
        .arc()
        .innerRadius(arcInnerRadius)
        .outerRadius(arcOuterRadius)
        .startAngle(0)
        .cornerRadius(5);
    const progressArc = value =>
        arcGenerator({
            endAngle: 2 * Math.PI * value
        });

    return (
        <div>
            <svg height={svgHeight} width={svgWidth}>
                <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
                    <path d={progressArc(1)} opacity="0.2" fill="gray" />
                </g>
                <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
                    <path
                        d={progressArc(progressPercentage / 100)}
                        fill={colorIndicator}
                    />
                    <text x="-10" y="5" style={{ fontWeight: "bold", color: colorIndicator }}>
                        {`${progressPercentage}%`}
                    </text>
                </g>
            </svg>
        </div>
    );
}

export function ProgressCircleWrapper(props) {
    const { pct, name, used, free } = props
    const svgWidth = 150;
    const arcWidth = 12;
    const progressPercentage = pct
    const colorIndicator = useColorIndication(progressPercentage);
    return (
        <Box padding="3rem" justifyContent="center" width="fit-content" textAlign="center">
            <ProgressArc
                svgWidth={svgWidth}
                arcWidth={arcWidth}
                progressPercentage={progressPercentage}
                colorIndicator={colorIndicator}
                name={name}
            />
            <Box padding="1rem" textAlign="center">
                {
                    used !== undefined ? <p>USED: {used} bytes</p> : <p></p>
                }
                {
                    free !== undefined ? <p>FREE: {free} bytes</p> : <p></p>
                }

                <p>{name}</p>
            </Box>
        </Box>
    );
}

export default ProgressCircleWrapper
