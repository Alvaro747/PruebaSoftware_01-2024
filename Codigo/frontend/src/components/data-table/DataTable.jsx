import {useEffect, useState} from "react";
import "./styles/dataTable.css";
import PropTypes from "prop-types";

function DataTable({data}) {
  const [dataToRender, setDataToRender] = useState(data);

  useEffect(() => {
    setDataToRender(data);
  }, [data]);

  return (
    <table id="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {dataToRender.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DataTable;
