import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { updateUser } from "../../../modules/actions/authActions";
import M from "materialize-css";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      errors: {}
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.errors) {
      return {
        errors: props.errors
      };
    } else {
      return null;
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  updateUser = e => {
    e.preventDefault();
    const userId = this.props.auth.user.id;
    const updatedUser = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password
    };
    this.props.updateUser(userId, updatedUser);
  };

  componentDidMount() {
    const { user } = this.props.auth;

    this.setState({
      fname: user.fname,
      lname: user.lname,
      email: user.email
    });
  }

  componentDidUpdate() {
    M.updateTextFields();
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Update user settings</span>
              </div>
              <form>
                <div className="card-content">
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          defaultValue={this.state.fname}
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
                            invalid: errors.password || errors.passwordincorrect
                          })}
                        />
                        <label htmlFor="password">Password</label>
                        <span className="red-text">
                          {errors.password}
                          {errors.passwordincorrect}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <div className="row">
                    <div className="col s12">
                      <button
                        className="btn btn-large waves-effect hoverable teal accent-4 right"
                        onClick={this.updateUser}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateUser }
)(Settings);
