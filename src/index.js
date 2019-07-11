import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import indexRoutes from "routes/index.jsx";
import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";

import appReducer from "./store/reducers";
//import initialState from "./store/initialState.json";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import "./firebase/config";
var initialState = {};
// if (
//   localStorage["redux-store"] !== null &&
//   localStorage["redux-store"] !== undefined
// ) {
//   initialState = JSON.parse(localStorage["redux-store"]);
// }
// const hist = createBrowserHistory({
//   basename: "/app"
// });
//in json  "homepage": "http://35.190.159.138/development/build/",
const hist = createBrowserHistory();
const store = applyMiddleware(thunk)(createStore)(appReducer, initialState);
store.subscribe(() => {
  const state = JSON.stringify(store.getState());
  localStorage["redux-store"] = state;
});

//window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
