import React from "react";

function TableHeader() {
  const boldText = {
    fontWeight: "bold",
    fontSize: "18px", // Tamaño de fuente ajustable según necesites
  };

  return (
    <tbody>
      <tr>
        <td className="w-40 h-fit text-center">
          <span style={boldText}>TIME OF THE DAY</span>
        </td>
        <td className="w-40 h-fit text-center">
          <span style={boldText}>MEDICATIONS</span>
        </td>
        <td className="w-40 h-fit text-center">
          <span style={boldText}>DOSAGE</span>
        </td>
        <td className="w-40 h-fit text-center">
          <span style={boldText}>TIME</span>
        </td>
        <td className="w-40 h-fit text-center">
          <span style={boldText}>DATE</span>
        </td>
        <td className="w-60 h-fit text-center">
          <span style={boldText}>COMMENTS</span>
        </td>
        <td className="w-40 h-fit text-center">
          <span style={boldText}>ACTIONS</span>
        </td>
      </tr>
    </tbody>
  );
}

export default TableHeader;
