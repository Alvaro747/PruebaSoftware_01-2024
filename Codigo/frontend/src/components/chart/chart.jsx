import Chart from "chart.js/auto";
import {useEffect, useRef} from "react";
import PropTypes from "prop-types";

import "./styles/chart.css";

const adapterData = (labels, data) => {
  return {
    labels,
    datasets: [
      {
        label: "Valor",
        data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
};

const LineChart = ({labels, dataToRender}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Nueva referencia para la instancia del gráfico
  const data = adapterData(labels, dataToRender);

  useEffect(() => {
    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext("2d");

      // Si ya existe una instancia del gráfico, la destruimos
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Creamos una nueva instancia del gráfico y la guardamos en la referencia
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas className="chart-container" ref={chartRef} />;
};


LineChart.propTypes = {
  labels: PropTypes.array.isRequired,
  dataToRender: PropTypes.array.isRequired,
};

export default LineChart;
