import {
  FETCH_POSTS,
  SET_LOADING,
  ADD_PAGE,
  FILTER_REVIEWS,
  GROUP_REVIEWS,
  FILTER_STARS,
  RESET_FILTER
} from "../actions/types";

const initialState = {
  items: { reviews: [] },
  original: { reviews: [] },
  page: 1,
  loading: true,
  order: "new",
  search: "",
  stars: "5",
  group: "month"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload,
          reviews: [...action.payload.reviews]
        },
        original: {
          ...action.originalReviews,
          reviews: [
            ...state.original.reviews,
            ...action.originalReviews.reviews
          ]
        },
        loading: action.loading
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ADD_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case FILTER_STARS: {
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload,
          reviews: [...action.payload.reviews]
        },
        stars: action.stars
      };
    }
    case FILTER_REVIEWS:
      return {
        ...state,
        items: { ...state.items, reviews: action.payload },
        order: action.order,
        loading: false
      };
    case RESET_FILTER:
      return {
        ...state,
        items: { ...state.original, reviews: [...state.original.reviews] },
        order: "new",
        search: "",
        group: "month",
        stars: 0
      };
    case GROUP_REVIEWS:
      return {
        ...state,
        group: action.payload
      };
    default:
      return state;
  }
}
