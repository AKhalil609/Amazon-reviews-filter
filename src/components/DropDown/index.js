import React, { Component } from "react";
import { connect } from "react-redux";
import { filterDrop } from "../../actions/postActions";
import "./DropDown.css";
import store from "../../store";

class DropDown extends Component {
  
  render() {
    return (
      <div>
        <span>
        <select className="shoadow-eff" name="Group by" id="123" value={store.getState().posts.group} onChange={this.props.filterDrop}>
          <option value={null} disabled>Group by</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </span>
      <span>
        <select className="shoadow-eff" name="Group" id="123" value={store.getState().posts.order} onChange={this.props.filterDrop}>
          <option value={null} disabled>Order by</option>
          <option value="new">Latest</option>
          <option value="old">Oldest</option>
        </select>
      </span>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { filterDrop }
)(DropDown);