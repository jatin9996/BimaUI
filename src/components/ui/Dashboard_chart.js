import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { useInView } from "react-intersection-observer";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TotalSupplyChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartWidth, setChartWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(false); // Control re-rendering
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the chart container is visible
    triggerOnce: true, // Trigger only once
  });

  // Detect dark mode and adjust chart width dynamically
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    const updateChartWidth = () => {
      setChartWidth(window.innerWidth);
    };

    checkDarkMode();
    updateChartWidth();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", updateChartWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateChartWidth);
    };
  }, []);

  // Trigger re-render when the chart becomes visible
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Dynamic styles based on dark mode and responsiveness
  const chartBgColor = isDarkMode ? "#1A1A1A" : "#ffffff";
  const labelColor = isDarkMode ? "#B2B1B0" : "#666D80";

  const titleFontSize = chartWidth <= 768 ? 16 : 20;
  const labelFontSize = chartWidth <= 768 ? 12 : 14;
  const legendFontSize = chartWidth <= 768 ? 12 : 14;

  const options = {
    animationEnabled: true, // Always enable animations when visible
    title: {
      text: "Overview",
      fontFamily: "Arial, sans-serif",
      fontSize: titleFontSize,
      horizontalAlign: "left",
      fontWeight: "bold",
      fontColor: isDarkMode ? "#FFFFFF" : "#252423",
    },
    backgroundColor: chartBgColor,
    axisY: {
      minimum: 0,
      maximum: 2450,
      prefix: "$",
      suffix: "k",
      interval: 450,
      labelFontSize: labelFontSize,
      labelFontColor: labelColor,
      gridColor: "#3A3B40",
      gridDashType: "dot",
      lineThickness: 0,
      tickLength: 0,
    },
    axisX: {
      minimum: new Date(2024, 9, 19),
      maximum: new Date(2024, 10, 31),
      labelFontSize: labelFontSize,
      labelFontColor: labelColor,
      lineThickness: 0,
      tickLength: 0,
      interval: 7,
      intervalType: "day",
      labelFormatter: function (e) {
        const options = { month: "short", day: "numeric" };
        return e.value.toLocaleDateString(undefined, options);
      },
    },
    legend: {
      verticalAlign: "top",
      horizontalAlign: chartWidth <= 768 ? "center" : "right",
      fontSize: legendFontSize,
      fontColor: isDarkMode ? "#B2B1B0" : "#666D80",
    },
    data: [
      {
        type: "area",
        name: "Active Vaults",
        showInLegend: true,
        legendMarkerType: "square",
        markerType: "none",
        lineColor: "#F74A17",
        fillOpacity: 0.1,
        color: "rgba(247, 74, 23, 1)",
        dataPoints: [
          { x: new Date(2024, 9, 19), y: 0 },
          { x: new Date(2024, 9, 24), y: 600 },
          { x: new Date(2024, 9, 31), y: 700 },
          { x: new Date(2024, 10, 9), y: 800 },
          { x: new Date(2024, 10, 12), y: 900 },
          { x: new Date(2024, 10, 21), y: 1100 },
          { x: new Date(2024, 10, 31), y: 1250 },
        ],
      },
      {
        type: "area",
        name: "Total Supply",
        showInLegend: true,
        legendMarkerType: "square",
        markerType: "none",
        lineColor: "#978FED",
        fillOpacity: 0.1,
        color: "rgba(151, 143, 237, 1)",
        dataPoints: [
          { x: new Date(2024, 9, 19), y: 0 },
          { x: new Date(2024, 9, 24), y: 1200 },
          { x: new Date(2024, 9, 31), y: 1350 },
          { x: new Date(2024, 10, 9), y: 1450 },
          { x: new Date(2024, 10, 12), y: 1600 },
          { x: new Date(2024, 10, 21), y: 2000 },
          { x: new Date(2024, 10, 31), y: 2450 },
        ],
      },
    ],
  };

  return (
    <div
      ref={ref} // Attach the ref to track visibility
      style={{
        width: "100%",
        maxWidth: chartWidth <= 768 ? `${chartWidth - 40}px` : "87%",
      }}
    >
      {isVisible && <CanvasJSChart options={options} />}
    </div>
  );
};

export default TotalSupplyChart;
