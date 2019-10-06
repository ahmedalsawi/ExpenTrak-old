import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "components/pages/Home";
import LoginPage from "components/pages/LoginPage";
import RegisterPage from "components/pages/RegisterPage";

import { Provider } from "react-redux";
import store from "state-store/store";

import { loadUser } from "state-store/actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

// bootswatch theme cosmo
import "assets/css/bootstrap.min.css";

import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/login" component={LoginPage} exact />
              <Route path="/register" component={RegisterPage} exact />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
