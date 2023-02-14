import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.onMouseClick}
      className="btn btn-primary"
      type="button"
    >
      SEARCH
    </button>
  );
};

export default Button;
