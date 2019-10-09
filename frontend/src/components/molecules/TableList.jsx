import React from "react";

function TableList(props) {
  const renderTableHeader = () => {
    const header = props.header.map((hdr, index) => {
      return <th key={index}>{hdr.toUpperCase()}</th>;
    });
    return (
      <React.Fragment>
        <tr>
          {props.showHeader && header}
          {props.onEdit && <th />}
          {props.onDelete && <th />}
        </tr>
      </React.Fragment>
    );
  };

  const renderTableRows = () => {
    return props.data.map((obj, index) => {
      const dataRows = props.header.map((hdr, index) => {
        return <td key={index}>{obj[hdr]}</td>;
      });

      return (
        <tr key={index}>
          {dataRows}
          {props.onEdit && (
            <td>
              <button onClick={() => props.onEdit(obj)}>Edit</button>
            </td>
          )}
          {props.onDelete && (
            <td>
              <button onClick={() => props.onDelete(obj)}>Delete</button>
            </td>
          )}
        </tr>
      );
    });
  };

  return (
    <div>
      <table>
        <tbody>
          {renderTableHeader()}
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;
