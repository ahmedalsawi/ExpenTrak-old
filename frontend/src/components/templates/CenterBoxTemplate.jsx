import React from "react";

function CenterBoxTemplate(props) {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">{props.children}</div>
    </div>
  );
}

export default CenterBoxTemplate;
