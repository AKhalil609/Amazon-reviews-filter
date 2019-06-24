import React from "react";
import "./SearchBar.css"




export default (props) => {
  return (
    <div >
      <input className="shoadow-eff" disabled={true}  type="text" value={props.search} name="" placeholder="Type to search"/>
    </div>
    
  );
};
