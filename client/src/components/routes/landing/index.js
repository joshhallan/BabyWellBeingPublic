import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Sign up or login</span>
              </div>
              <div className="card-action">
                <div className="row">
                  <div className="col s6">
                    <Link
                      to="/register"
                      className="btn btn-large waves-effect waves-light hoverable blue darken-1"
                    >
                      Register
                    </Link>
                  </div>
                  <div className="col s6">
                    <Link
                      to="/login"
                      className="btn btn-large waves-effect waves-light hoverable teal accent-4"
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
