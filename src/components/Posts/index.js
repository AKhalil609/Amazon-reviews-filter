import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts, filterReset } from "../../actions/postActions";
import BottomScrollListener from "react-bottom-scroll-listener";
import store from "../../store";
import Card from "../Card";
import SearchBar from "../SearchBar";
import DropDown from "../DropDown";
import Button from "../Button";
import Loading from "../Loading";
import StarFilter from "../StarFilter";

export class UnconnectedPosts extends Component {
  
  componentWillMount() {
    this.props.fetchPosts();
  }

  getPosts = () => {
    if (store.getState().posts.items.hasMore) this.props.fetchPosts();
  };

  refresh = () =>{
    this.props.filterReset()
    
  }

  render() {
    let { reviews } = store.getState().posts.items;
    
    if (this.props.posts.loading)
      return <Loading data-test="component-loading"/>;
      
    return (
      <div data-test="component-reviews">
        <div>
          <SearchBar />
          <DropDown methods={this.props} data-test="component-DropDown"/>
          <StarFilter data-test="component-StarFilter"/>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button data-test="component-button" red={this.props} refresh={this.refresh}/>
          </div>
        </div>
      <div data-test="component-card">
      {reviews.map(review => (
          <Card key={review.reviewId} Info={review} methods={this.props} />
        ))}

      </div>
      <BottomScrollListener  onBottom={this.getPosts} />
        
      </div>
    );
  }
}

UnconnectedPosts.proTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  filterReset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { fetchPosts, filterReset }
)(UnconnectedPosts);
