import React from "react";
import "./StarPreview.css";

export default props => {
  let seeRate = value => {
    let rate = value;
    // Data validation
    if (rate > 5) rate = 5;
    if (rate < 0) rate = 0;
    let stars = [];
    for (let index = 0; index < rate; index++) {
      stars.push(<i className="fas fa-star star" key={index} />);
    }
    if (5 - rate > 0) {
      for (let index = 0; index < 5 - rate; index++) {
        stars.push(<i className="far fa-star star" key={index + 5} />);
      }
    }
    return stars;
  };

  return <div>{seeRate(props.stars)}</div>;
};
