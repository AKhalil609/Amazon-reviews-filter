import { SET_LOADING, ADD_PAGE } from '../actions/types';
import postReducer from './postReducer';


  
  describe('postReducer', () => {
    const initialState = {
        items: { reviews: [] },
        original:{reviews:[]},
        page: 1,
        loading: true,
        order: "new",
        search: "",
        stars: "5", 
        group: "month"
    };
    test('returns default initial state of when no action is passed', () => {
        const newState = postReducer(undefined, {});
        expect(newState).toEqual(initialState);
      });

     test('returns loading state of false upon receiving an action of type `SET_LOADING`', () => {
        const newState = postReducer(initialState, { type: SET_LOADING, payload: false });
        expect(newState.loading).toBe(false);
      });

      test('returns page state of the payload value upon receiving an action of type `ADD_PAGE`', () => {
        const newState = postReducer(initialState, { type: ADD_PAGE, payload: 3 });
        expect(newState.page).toBe(3);
      });
  })
  
