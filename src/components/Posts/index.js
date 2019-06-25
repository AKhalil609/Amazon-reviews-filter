import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts, filterReset } from "../../actions/postActions";
import BottomScrollListener from "react-bottom-scroll-listener";
import Card from "../Card";
import DropDown from "../DropDown";
import Button from "../Button";
import Loading from "../Loading";
import StarFilter from "../StarFilter";
import moment from "moment";

export class UnconnectedPosts extends Component {
  
  // life cycle method runs `fetchPosts`
  // I would prefer using componentDidMount() just using this testing with

  /**
   * life cycle method runs `fetchPosts`
   * I would prefer using componentDidMount() since componentWillMount()
   * is considered legacy, however using this for testing with jest
   */
  componentWillMount() {
    this.props.fetchPosts();
  }

  // checks if there is still more data to request from the server
  getPosts = () => {
    if (this.props.posts.items.hasMore) this.props.fetchPosts();
  };

  // runs `filterReset` action when the reset button is clicked
  refresh = () => {
    this.props.filterReset();
  };

  /**
 * Takes reviews and returns an object which has the reviews grouped based on
 * the selected grouping type
 * @param {Array} reviews - amazon reviews provided from the api.
 * @param {string} groupType - the type of grouping that was seleted ("day","week","month").
 * @returns {object} - returns an object of grouped arrays
 */

  groupReviews = (reviews, groupType) => {
    return reviews.reduce(function(val, obj) {

      // Groups reviews by month
      if (groupType === "month") {
        let groups = moment(new Date(obj["reviewCreated"])).format("MMMM");
        (val[groups] = val[groups] || []).push(obj);
      }
      // Groups reviews by week
      if (groupType === "week") {
        let groupTitle;
        let groups = moment(new Date(obj["reviewCreated"])).format("w");
        groups = moment().isoWeek(groups)._d;
        groups = moment(new Date(groups));

        let startDate = groups.clone().format("DD.MM");
        let endDate = groups
          .clone()
          .add(6, "days")
          .format("DD.MM");

        groupTitle = `${startDate} - ${endDate}`;

        (val[groupTitle] = val[groupTitle] || []).push(obj);
      }
      // Groups reviews by day
      if (groupType === "day") {
        let groups;
        groups = moment(new Date(obj["reviewCreated"])).format("DD.MM");
        (val[groups] = val[groups] || []).push(obj);
      }
      return val;
    }, {});
  };

  render() {
    if (this.props.posts.loading){
      return <Loading data-test="component-loading" />;
    }else{
      let { items, group } = this.props.posts;
      let groups = this.groupReviews(items.reviews, group);
      let groupTitle;
      return (
        <div data-test="component-reviews">
          <div>
            <DropDown methods={this.props} data-test="component-DropDown" />
            <StarFilter data-test="component-StarFilter" />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                data-test="component-button"
                red={this.props}
                refresh={this.refresh}
              />
            </div>
          </div>
          <div data-test="component-card">
            {Object.keys(groups).map((key)=>{
              groupTitle = key;
              return groups[key].map(review=>{
                let passedTitle = groupTitle;
                groupTitle = null;
                return <Card key={review.reviewId} group={passedTitle} Info={review} methods={this.props} />
              })
            })}
          </div>
          <BottomScrollListener onBottom={this.getPosts} />
        </div>
      );

    }

    
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
