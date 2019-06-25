import React from "react";
import "./Card.css";
import StarPreview from "../StarPreview";
import {formatDate, formatTitle } from "./utils";


/**
 * Functional react component for the review card.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component.
 */

export default props => {
  const { Info, group } = props;
  
  return (
    <div>
      <div><h4>{group}</h4></div>
      <div className="Card">
        {/* Top Card section */}
        <div className="quickInfo">
          {/* Product Image */}
          <span>
            {" "}
            <img
              src={`http://ecx.images-amazon.com/images/I/${Info.productImg}._SL160_.jpg`}
              alt=""
            />
          </span>
          {/* Review created date */}
          <span>
            <div>
              <h4>date</h4>
              <h3>{formatDate(Info.reviewCreated)}</h3>
            </div>
          </span>
          {/* Product Rating */}
          <span>
            <div>
              <h4>stars</h4>
              <StarPreview stars={Info.stars} />
            </div>
          </span>
          {/* Product ID and title */}
          <span title={Info.productTitle}>
            {" "}
            {/**Show full title on hover */}
            <h4>{Info.childAsin}</h4>
            <h3>{formatTitle(Info.productTitle)}</h3>{" "}
            {/**Show shortened title */}
          </span>
        </div>
        <div>
          <h4>{Info.title}</h4>
          <p className="content">{Info.content}</p>
        </div>
      </div>
    </div>
  );
};


