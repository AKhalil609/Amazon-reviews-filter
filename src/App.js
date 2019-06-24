import React from "react";
import "./App.css";
import Posts from "./components/Posts";
import { Provider } from "react-redux";
import store from './store'

function App() {
  return (
    <Provider store={store}>
    <div className="App" data-test="component-app">
      <Posts />
    </div>
    </Provider>
  );
}

export default App;
