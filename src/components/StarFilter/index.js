
import "./StarFilter.css"
import React, { Component } from 'react'
import { connect } from "react-redux";
import { filterStars } from "../../actions/postActions";
import store from "../../store"

/* eslint-disable */
class StarFilter extends Component {
  handleClick = (event)=>{
    this.props.filterStars(event.target.value)
  }
  
  render() {

    return (
      <div className="starContainer">
      
      <h3>Filter by stars:</h3>
      <div className="rating">
          <input type="radio" name="star" id="star5" value={5} onChange={this.handleClick} checked={store.getState().posts.stars == 5}/><label htmlFor="star5"></label>
          <input type="radio" name="star" id="star4" value={4} onChange={this.handleClick} checked={store.getState().posts.stars == 4}/><label htmlFor="star4"></label>
          <input type="radio" name="star" id="star3" value={3} onChange={this.handleClick} checked={store.getState().posts.stars == 3}/><label htmlFor="star3"></label>
          <input type="radio" name="star" id="star2" value={2} onChange={this.handleClick} checked={store.getState().posts.stars == 2}/><label htmlFor="star2"></label>
          <input type="radio" name="star" id="star1" value={1} onChange={this.handleClick} checked={store.getState().posts.stars == 1}/><label htmlFor="star1"></label>
      </div>
    </div>
    )
  }

  


}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { filterStars }
)(StarFilter);
