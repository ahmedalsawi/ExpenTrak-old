import React from "react";
import PropTypes from "prop-types";

function AlertFlash({ message, onClick }) {
  return (
    <div>
      {message && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>{message}</strong>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={onClick}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
}
AlertFlash.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
// Specifies the default values for props:
AlertFlash.defaultProps = {
  message: "Error"
};
export default AlertFlash;
