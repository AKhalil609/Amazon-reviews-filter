import {
  FETCH_POSTS,
  ADD_PAGE,
  FILTER_REVIEWS,
  GROUP_REVIEWS,
  FILTER_STARS,
  RESET_FILTER
} from "./types";
import store from "../store";
import axios from "axios";

/**
 * Returns Redux Thunk function that initiates an axios request 
 * and dispatches the response as a 'FETCH_POSTS' action and
 * @method fetchPosts
 * @returns {function} - Redux Thunk function
 */

export const fetchPosts = () => async dispatch => {

  let reviews = await axios.get(`http://localhost:8010/proxy/reviews/${store.getState().posts.page}`)
  reviews = reviews.data;

  // save a copy of the prefiltered data
  let originalReviews = {...reviews}
  let sortedReviews;

  // saving a copy of the old reviews (if any) plus the new recived one
  let fullReviews = [...store.getState().posts.original.reviews, ...originalReviews.reviews]
  
  // check and sort according to the state of the order
  if (store.getState().posts.order === "old") {
    fullReviews = fullReviews.sort((a,b)=> a.reviewCreated > b.reviewCreated ? 1:-1)
  }else{
    fullReviews = fullReviews.sort((a,b)=> a.reviewCreated < b.reviewCreated ? 1:-1)
  }
  
  // filter reviews by rate according to the using the stars state
  // eslint-disable-next-line
  if (store.getState().posts.stars > 0) fullReviews = fullReviews.filter(e => e.stars == store.getState().posts.stars)

  
  // reviews after begin sorted
  sortedReviews = {...originalReviews, reviews:fullReviews}

  await dispatch({
    type: FETCH_POSTS,
    payload: sortedReviews,
    originalReviews,
    loading:false
  });

  await dispatch({
    type: ADD_PAGE,
    payload: store.getState().posts.page + 1
  });
};


 /**
 * Used to filter the Reviews by rating
 * @method filterStars
 * @param {number} stars - The number of stars.
 */
export const filterStars = (stars) => async dispatch =>{
  
  // Get all reviews from the store
  let fullReviews = [...store.getState().posts.original.reviews];
  
  let sortedReviews;

  // Check and sort based on the order of the reviews
  if (store.getState().posts.order === "old") {
    fullReviews = fullReviews.sort((a,b)=> a.reviewCreated > b.reviewCreated ? 1:-1)
  }else{
    fullReviews = fullReviews.sort((a,b)=> a.reviewCreated < b.reviewCreated ? 1:-1)
  }

  // Filter all reviews based on the number of stars
  fullReviews = fullReviews.filter(e => {
    // eslint-disable-next-line
    return e.stars == stars
  })
  
  sortedReviews = {reviews:fullReviews}

  // Update the number of state of the stars filter and the items showen
  dispatch({
    type: FILTER_STARS,
    payload: sortedReviews,
    stars
  });
}

 /**
 * Groups and rearranges the based on the changes to the dropdown
 * @method filterDrop
 * @param {event} event - onChange event.
 */
export const filterDrop = (event) => async dispatch =>{
  let filter = event.target.value;
  switch (filter) {
    case "old":
    case "new":
      await dispatch({
        type: FILTER_REVIEWS,
        payload: store.getState().posts.items.reviews.reverse(),
        order: filter
      });
      break;
    case "month":
    case "week":
    case "day":
      await dispatch({
        type: GROUP_REVIEWS,
        payload: filter
      })
      break;
    default:
      break;
  }
}

export const filterReset = () => dispatch =>{

  dispatch({
    type: RESET_FILTER
  });
  
}
