import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../../TestUtils/utils";
import Posts, {UnconnectedPosts} from "./";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Posts store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  describe("Fetching the data", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { posts: { loading: true } };
      wrapper = setup(initialState);
    });
    test("should render the component without error", () => {
      const component = findByTestAttr(wrapper, "component-reviews");
      expect(component.length).toBe(0);
    });
    test("should render the loading component", () => {
      const component = findByTestAttr(wrapper, "component-loading");
      expect(component.length).toBe(1);
    });
  });
  describe("Recived the data", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { posts: { loading: false } };
      wrapper = setup(initialState);
    });
    test("should render the component without error", () => {
      const component = findByTestAttr(wrapper, "component-reviews");
      expect(component.length).toBe(1);
    });
    test("should render the reviews DropDown component", () => {
      const component = findByTestAttr(wrapper, "component-DropDown");
      expect(component.length).toBe(1);
    });
    test("should render the reviews StarFilter component", () => {
      const component = findByTestAttr(wrapper, "component-StarFilter");
      expect(component.length).toBe(1);
    });
    test("should render the reviews Button component", () => {
      const component = findByTestAttr(wrapper, "component-button");
      expect(component.length).toBe(1);
    });
    test("should render the reviews Card component", () => {
      const component = findByTestAttr(wrapper, "component-card");
      expect(component.length).toBe(1);
    });
  });
});

describe("redux props", () => {
    describe('Check the state in props', () => {
        const posts = {
            items: { reviews: [] },
            original:{reviews:[]},
            page: 1,
            loading: true,
            order: "new",
            search: "",
            stars: 5, 
            group: "month"
          };
    
     const wrapper = setup({ posts });
    
      test("has loading piece of state as prop", () => {
        const successProp = wrapper.instance().props.posts.loading;
        expect(successProp).toBe(posts.loading);
      });
      test("has items piece of state as prop", () => {
        const wrapper = setup({ posts });
        const successProp = wrapper.instance().props.posts.items;
        expect(successProp).toBe(posts.items);
      });
      test("has page piece of state as prop", () => {
        const wrapper = setup({ posts });
        const successProp = wrapper.instance().props.posts.page;
        expect(successProp).toBe(posts.page);
      });
    })
    
    describe('Check action creators are function props', () => {
        test('`fetchPosts` action creator is a function prop', () => {
            const wrapper = setup();
            const fetchPostsProp = wrapper.instance().props.fetchPosts;
            expect(fetchPostsProp).toBeInstanceOf(Function);
        })

        test('`filterReset` action creator is a function prop', () => {
            const wrapper = setup();
            const filterResetProp = wrapper.instance().props.filterReset;
            expect(filterResetProp).toBeInstanceOf(Function);
        })
        
    })
    
});

describe('life cycle method', () => {
    test('`fetchPosts` runs on Posts mount', () => {
        const fetchPostsMock = jest.fn();

        const props = {
            fetchPosts: fetchPostsMock,
            posts:{
                loading:true
            }
        }

        const wrapper = shallow(<UnconnectedPosts {...props} />);
     
        expect(wrapper).toBeDefined();
        expect(fetchPostsMock).toHaveBeenCalled();
    })
    
})
