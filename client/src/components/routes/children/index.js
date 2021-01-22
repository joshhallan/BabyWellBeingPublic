import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addChild,
  addChildById,
  getChildren,
  removeChild
} from "../../../modules/actions/childActions";
import classnames from "classnames";
import "./style.css";

class Children extends Component {
  constructor() {
    super();
    this.state = {
      fName: "",
      lName: "",
      childId: "",
      errors: {},
      children: []
    };
    this.baseState = this.state;
  }

  newChild = e => {
    e.preventDefault();
    const newChild = {
      fName: this.state.fName,
      lName: this.state.lName
    };
    this.props.addChild(newChild, this.props.auth, this.props.history);
    this.setState(this.baseState);
  };

  exisitingChild = e => {
    e.preventDefault();

    // Look into the returned data from this
    this.props.addChildById(this.props.auth, this.state.childId);
  };

  removeChild = childId => {
    this.props.removeChild(childId, this.props.auth);
  };

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

  componentDidMount() {
    this.props.getChildren(this.props.auth);

    this.setState({
      children: this.props.children
    });
  }

  render() {
    const { errors } = this.state;
    const { children } = this.props;

    return (
      <div className="container">
        <div className="row">
          {/* Add new child */}
          <div className="col s12 l6">
            <div className="card">
              <form>
                <div className="card-content">
                  <span className="card-title">Add new child</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.fName}
                        id="fName"
                        type="text"
                        error={errors.fName}
                        className={classnames("validate", {
                          invalid: errors.fName
                        })}
                      />
                      <label htmlFor="fName">Childs first name</label>
                      <span className="red-text">{errors.fName}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.lName}
                        id="lName"
                        type="text"
                        error={errors.lName}
                        className={classnames("validate", {
                          invalid: errors.lName
                        })}
                      />
                      <label htmlFor="lName">Childs last name</label>
                      <span className="red-text">{errors.lName}</span>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <div className="row">
                    <button
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable teal accent-4 col s12"
                      onClick={this.newChild}
                    >
                      Add new child
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Add existing child */}
          <div className="col s12 l6">
            <div className="card">
              <form>
                <div className="card-content">
                  <span className="card-title">Retrieve exisiting child</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.childId}
                        error={errors.child}
                        className={classnames("validate", {
                          invalid: errors.child
                        })}
                        id="childId"
                        type="text"
                      />
                      <label htmlFor="childId">Unique child id</label>
                      <span className="red-text">{errors.child}</span>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <div className="row">
                    <button
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable teal accent-4 col s12"
                      onClick={this.exisitingChild}
                    >
                      Retrive exisiting child
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          {/* List of children */}
          <div className="col s12 l6">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Children information</span>
                {children.length !== 0 ? (
                  <div>
                    <p>
                      Share a childs id with another user to contribute to their
                      feeding schedule
                    </p>
                    <ul className="collection">
                      {children.map((child, key) => (
                        <li key={key} className="collection-item childInfo">
                          <p>
                            <span className="title">
                              {child.fName} {child.lName}
                            </span>
                          </p>
                          <p>
                            <span>Child id</span> - {child._id}
                          </p>
                          <div className="row">
                            <button
                              className="btn btn-small waves-effect waves-light hoverable red col s12"
                              onClick={this.removeChild.bind(this, child._id)}
                            >
                              Remove child
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>
                    There are no children currently added to the system. Please
                    add a child to begin
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  children: state.child.children
});

export default connect(
  mapStateToProps,
  { addChild, addChildById, getChildren, removeChild }
)(Children);
