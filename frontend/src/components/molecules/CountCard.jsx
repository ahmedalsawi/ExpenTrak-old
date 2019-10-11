import React from "react";
import PropTypes from "prop-types";

function CountCard(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.count}</p>
      </div>
    </div>
  );
}

CountCard.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};
export default CountCard;
