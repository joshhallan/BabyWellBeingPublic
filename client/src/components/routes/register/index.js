import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../modules/actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.errors) {
      return {
        errors: props.errors
      };
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <div className="card">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="card-content">
                  <span className="card-title">Register</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.fname}
                        error={errors.fname}
                        id="fname"
                        type="text"
                        className={classnames("", {
                          invalid: errors.fname
                        })}
                      />
                      <label htmlFor="fname">First name</label>
                      <span className="red-text">{errors.fname}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.lname}
                        error={errors.lname}
                        id="lname"
                        type="text"
                        className={classnames("", {
                          invalid: errors.lname
                        })}
                      />
                      <label htmlFor="lname">Last name</label>
                      <span className="red-text">{errors.lname}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                          invalid: errors.email
                        })}
                      />
                      <label htmlFor="email">Email</label>
                      <span className="red-text">{errors.email}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        autoComplete="on"
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                          invalid: errors.password
                        })}
                      />
                      <label htmlFor="password">Password</label>
                      <span className="red-text">{errors.password}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        autoComplete="on"
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                        className={classnames("", {
                          invalid: errors.password2
                        })}
                      />
                      <label htmlFor="password2">Confirm Password</label>
                      <span className="red-text">{errors.password2}</span>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <div className="row">
                    <button
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable teal accent-4 col s12"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
