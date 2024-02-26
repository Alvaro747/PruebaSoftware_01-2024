import {Navbar} from "@components";
import {LineChart, DataTable} from "@components";
import {useEffect, useState} from "react";
import {nextDay, orderDateASC, generateRamdomNumber} from "@utils";
import {DataService} from "@services";
import "./styles/home.css";

async function getEntity(payload, entity) {
  const entityService = new entity();
  const entityResponse = await entityService.get(payload);

  if (!entityResponse) {
    return null;
  }

  return entityResponse;
}

async function createData(payload, Entity) {
  const entityService = new Entity();
  const entityResponse = await entityService.create(payload);

  if (!entityResponse) {
    return null;
  }

  return entityResponse;
}

const adapterDataToChart = (data) => {
  const adapterDataToChartLabels = data?.map((item) => item.date);
  const adapterDataToChartValues = data?.map((item) => item.value);

  return {
    labels: adapterDataToChartLabels,
    dataToRender: adapterDataToChartValues,
  };
};

function Home() {
  const [chartData, setChartData] = useState({
    labels: [],
    dataToRender: [],
  });

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const entityResponse = await getEntity(
        {queryselector: "all"},
        DataService
      );

      if (!entityResponse.success) {
        alert(entityResponse.message);
        return;
      }

      const {labels, dataToRender} = adapterDataToChart(entityResponse?.result);

      const adapterDataToDataTable = entityResponse?.result.map((item) => {
        return {
          date: item.date,
          value: item.value,
        };
      });
      setChartData({
        labels,
        dataToRender,
      });

      setDataTable(adapterDataToDataTable);
    };

    fetchData();
  }, []);

  // here we are adding a new data to the chart and the table
  const handleAddData = async() => {
    let dateASC = orderDateASC(chartData.labels);

    let lastDate = dateASC[dateASC.length - 1];

    const newData = {
      date: nextDay(lastDate),
      value: generateRamdomNumber(),
    };

    const entityResponse = await createData(newData, DataService);
 
    if (!entityResponse.success) {
      alert(entityResponse.message);
      return;
    }

    setChartData({
      labels: [...chartData.labels, newData.date],
      dataToRender: [...chartData.dataToRender, newData.value],
    });

    setDataTable([...dataTable, newData]);
  };

  return (
    <div className="container">
      <Navbar />
      <button id="new-data" onClick={() => handleAddData()}>
        New Data
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
