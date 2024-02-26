import {Navbar} from "@components";
import "./styles/home.css";
import {LineChart, DataTable} from "@components";
import {useState} from "react";
import {nextDay, orderDateASC, generateRamdomNumber} from "@utils";

const data = [
  {fecha: "01/01/2024", valor: 29.1},
  {fecha: "02/01/2024", valor: 28.5},
  {fecha: "03/01/2024", valor: 28.1},
  {fecha: "04/01/2024", valor: 25.6},
  {fecha: "05/01/2024", valor: 24.8},
  {fecha: "06/01/2024", valor: 27.1},
  {fecha: "07/01/2024", valor: 29.9},
];

function Home() {
  const [chartData, setChartData] = useState({
    labels: [
      "01/01/2024",
      "02/01/2024",
      "03/01/2024",
      "04/01/2024",
      "05/01/2024",
      "06/01/2024",
      "07/01/2024",
    ],
    dataToRender: [29.1, 28.5, 28.1, 25.6, 24.8, 27.1, 29.9],
  });

  const [dataTable, setDataTable] = useState(data);

  // here we are adding a new data to the chart and the table
  const handleAddData = () => {
    let dateASC = orderDateASC(chartData.labels);

    let ultimaFecha = dateASC[dateASC.length - 1];

    const newData = {
      fecha: nextDay(ultimaFecha),
      valor: generateRamdomNumber(),
    };
    console.log(newData);
    setChartData({
      labels: [...chartData.labels, newData.fecha],
      dataToRender: [...chartData.dataToRender, newData.valor],
    });

    setDataTable([...dataTable, newData]);
  };

  return (
    <div className="container">
      <Navbar />
      <button id="new-data" onClick={() => handleAddData()}>
        Nuevo Dato
      </button>
      <div className="chart">
        <LineChart
          labels={chartData.labels}
          dataToRender={chartData.dataToRender}
        />
      </div>
      <div className="table-container">
        <DataTable data={dataTable} />
      </div>
    </div>
  );
}

export default Home;
