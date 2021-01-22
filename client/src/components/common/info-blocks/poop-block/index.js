import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { editPoop, deletePoop } from "../../../../modules/actions/poopActions";
import M from "materialize-css";
import "./style.css";

class PoopInfo extends Component {
  constructor() {
    super();
    this.state = {
      time: "",
      date: "",
      additionalInfo: "",
      errors: {},
      editMode: false
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.errors) {
      return {
        errors: props.errors
      };
    }
  }

  deletePoop = e => {
    e.preventDefault();
    this.props.deletePoop(this.props.childFilter, this.props._id);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  editPoop = e => {
    e.preventDefault();
    const editedPoop = {
      time: this.state.time,
      date: this.state.date,
      additionalInfo: this.state.additionalInfo
    };

    this.props
      .editPoop(this.props.childFilter, this.props._id, editedPoop)
      .then(response => {
        if (response === true) {
          this.editMode();
        }
      });
  };

  editMode = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      editMode: !this.state.editMode
    });
  };

  componentDidMount() {
    this.setState({
      time: this.props.time,
      date: this.props.date,
      additionalInfo: this.props.additionalInfo
    });
    M.updateTextFields();
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col s12">
            {this.state.editMode === false ? (
              // Display info box
              <div className="card">
                <i className="material-icons right card-icon--poop">
                  baby_changing_station
                </i>
                <div className="card-content">
                  <span className="card-title">
                    Poop:{" "}
                    {this.props.date
                      .split("-")
                      .reverse()
                      .join("-")}{" "}
                    @ {this.props.time}
                  </span>
                  <div className="row">
                    <p className="col s12">
                      <span>Time:</span> {this.props.time}
                    </p>
                    <p className="col s12">
                      <span>Date:</span>{" "}
                      {this.props.date
                        .split("-")
                        .reverse()
                        .join("-")}
                    </p>
                    <p className="col s12">
                      <span>Additional information:</span>{" "}
                      {this.props.additionalInfo
                        ? this.props.additionalInfo
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="card-action">
                  <div className="row">
                    <button
                      className="btn btn-large waves-effect hoverable amber black-text col s12"
                      onClick={this.editMode}
                      style={{ margin: "0 0 20px 0" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-large waves-effect hoverable red col s12"
                      onClick={this.deletePoop}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Box
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Edit poop</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.time}
                        id="time"
                        type="time"
                        error={errors.timePoop}
                        className={classnames("validate", {
                          invalid: errors.timePoop
                        })}
                      />
                      <label htmlFor="time" className="active">
                        Time
                      </label>
                      <span className="red-text">{errors.timePoop}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.date}
                        id="date"
                        type="date"
                        error={errors.datePoop}
                        className={classnames("validate", {
                          invalid: errors.datePoop
                        })}
                      />
                      <label htmlFor="date" className="active">
                        Date
                      </label>
                      <span className="red-text">{errors.datePoop}</span>
                    </div>
                    <div className="input-field col s12">
                      <textarea
                        onChange={this.onChange}
                        defaultValue={this.props.additionalInfo}
                        id="additionalInfo"
                        className="materialize-textarea"
                      ></textarea>
                      <label htmlFor="additionalInfo" className="active">
                        Additional Information
                      </label>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <div className="row">
                    <button
                      className="btn btn-large waves-effect hoverable teal accent-4 col s12"
                      onClick={this.editPoop}
                      style={{ margin: "0 0 20px 0" }}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn btn-large waves-effect hoverable red col s12"
                      onClick={this.editMode}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  children: state.child.children,
  poops: state.child.poops
});

export default connect(
  mapStateToProps,
  { editPoop, deletePoop }
)(PoopInfo);
