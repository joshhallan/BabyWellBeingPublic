import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./modules/actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import { PageView, initGA } from "./components/common/tracking";

// Components - common
import Navbar from "./components/common/navbar/Navbar";

// Components - routes
import Landing from "./components/routes/landing";
import Register from "./components/routes/register";
import Login from "./components/routes/login";
import PrivateRoute from "./components/routes/private-route";
import Dashboard from "./components/routes/dashboard";
import Children from "./components/routes/children";
import Settings from "./components/routes/settings";
import NotFound from "./components/routes/not-found";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;

  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser()); // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  componentDidMount() {
    // Good analytics
    initGA("UA-187444832-1");
    PageView();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/children" component={Children} />
              <PrivateRoute exact path="/settings" component={Settings} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
