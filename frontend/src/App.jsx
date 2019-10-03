import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "components/Home";
import LoginPage from "components/LoginPage";
import RegisterPage from "components/RegisterPage";
import NotFound404Page from "components/NotFound404Page";

import { Provider } from "react-redux";
import store from "state-store/store";

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route component={NotFound404Page} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
