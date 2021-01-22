import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../modules/actions/authActions";
import M from "materialize-css";
import "./navbar.css";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "./login";
  };

  componentDidMount() {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, { edge: "right" });
  }

  render() {
    let token = localStorage.jwtToken;
    
    return (
      <div>
        <nav>
          <div className="nav-wrapper amber darken-2">
            <div className="row">
              <div className="col s12">
                <Link to="/" className="brand-logo left">
                  Baby Wellbeing
                </Link>
                <a
                  href="#openMenu"
                  data-target="slide-out"
                  className="sidenav-trigger show-on-large right"
                >
                  <span className="hide-on-med-and-down">Menu</span>
                  <i className="material-icons right">menu</i>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Slide out nav */}
        <ul className="sidenav" id="slide-out">
          {token
            ? [
                <li key="userView">
                  <div className="user-view cyan">
                  </div>
                </li>,
                <li key="dashboard">
                  <Link to="/dashboard" className="sidenav-close">
                    <i className="material-icons">dashboard</i>Dashboard
                  </Link>
                </li>,
                <li key="children">
                  <Link to="/children" className="sidenav-close">
                    <i className="material-icons">child_care</i>Children
                  </Link>
                </li>,
                <li key="settings">
                  <Link to="/settings" className="sidenav-close">
                    <i className="material-icons">settings</i>User settings
                  </Link>
                </li>,
                <li key="logout">
                  <a
                    href="#logout"
                    className="sidenav-close"
                    onClick={this.onLogoutClick}
                  >
                    <i className="material-icons">lock_outline</i>Log out
                  </a>
                </li>
              ]
            : [
                <li key="register">
                  <Link to="/register" className="sidenav-close">
                    <i className="material-icons">assignment</i>Register
                  </Link>
                </li>,
                <li key="login">
                  <Link to="/login" className="sidenav-close">
                    <i className="material-icons">lock_open</i>Login
                  </Link>
                </li>
              ]}
          <li key="divider">
            <div className="divider"></div>
          </li>
          <li key="feedback">
            <a href="mailto:joshuaallan@live.co.uk">
              <i className="material-icons">feedback</i>Feedback
            </a>
          </li>
        </ul>

        {/* Drop Down Menu Options */}
        <ul id="dropdown1" className="dropdown-content">
          <li key="logout">
            <a
              href="#logout"
              className="sidenav-close"
              onClick={this.onLogoutClick}
            >
              <i className="material-icons">lock_outline</i>Log out
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
