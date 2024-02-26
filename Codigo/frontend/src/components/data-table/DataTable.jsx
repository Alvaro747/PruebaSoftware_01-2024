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
          <th>Fecha</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {dataToRender.map((row, index) => (
          <tr key={index}>
            <td>{row.fecha}</td>
            <td>{row.valor}</td>
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
