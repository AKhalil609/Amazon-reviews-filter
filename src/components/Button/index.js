import React from "react";
import "./Button.css";

/**
 * Functional react component for Refresh button.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component.
 */

export default (props) => {
  return (
    <div className="btnArea" data-test="component-button">
      <button className="btn shoadow-eff" data-test="btn" onClick={props.refresh}>Reset Filter</button>
    </div>
  );
};
