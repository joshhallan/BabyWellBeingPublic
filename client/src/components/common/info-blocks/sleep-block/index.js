import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { editSleep, deleteSleep } from "../../../../modules/actions/sleepActions";
import M from "materialize-css";
import "./style.css";

class SleepInfo extends Component {
  constructor() {
    super();
    this.state = {
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
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

  deleteSleep = e => {
    e.preventDefault();
    this.props.deleteSleep(this.props.childFilter, this.props._id);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  editSleep = e => {
    e.preventDefault();
    const editedSleep = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      additionalInfo: this.state.additionalInfo
    };

    this.props
      .editSleep(this.props.childFilter, this.props._id, editedSleep)
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
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
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
                <i className="material-icons right card-icon--sleep">hotel</i>
                <div className="card-content">
                  <span className="card-title">
                    Sleep:{" "}
                    {this.props.startDate
                      .split("-")
                      .reverse()
                      .join("-")}{" "}
                    @ {this.props.startTime}
                  </span>
                  <div className="row">
                    <p className="col s12">
                      <span>Start time:</span> {this.props.startTime}
                    </p>
                    <p className="col s12">
                      <span>End time:</span> {this.props.endTime}
                    </p>
                    <p className="col s12">
                      <span>Start date:</span>{" "}
                      {this.props.startDate
                        .split("-")
                        .reverse()
                        .join("-")}
                    </p>
                    <p className="col s12">
                      <span>End date:</span>{" "}
                      {this.props.endDate !== null
                        ? this.props.endDate
                            .split("-")
                            .reverse()
                            .join("-")
                        : ""}
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
                      onClick={this.deleteSleep}
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
                  <span className="card-title">Edit sleep</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.startTime}
                        id="startTime"
                        type="time"
                        error={errors.startTimeSleep}
                        className={classnames("validate", {
                          invalid: errors.startTimeSleep
                        })}
                      />
                      <label htmlFor="startTime" className="active">
                        Start time
                      </label>
                      <span className="red-text">{errors.startTimeSleep}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.endTime}
                        id="endTime"
                        type="time"
                        error={errors.endTimeSleep}
                        className={classnames("validate", {
                          invalid: errors.endTimeSleep
                        })}
                      />
                      <label htmlFor="endTime" className="active">
                        End time
                      </label>
                      <span className="red-text">{errors.endTimeSleep}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.startDateSleep}
                        id="startDate"
                        type="date"
                        error={errors.startDateSleep}
                        className={classnames("validate", {
                          invalid: errors.startDateSleep
                        })}
                      />
                      <label htmlFor="startDate" className="active">
                        Start date
                      </label>
                      <span className="red-text">{errors.startDateSleep}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.endDate}
                        id="endDate"
                        type="date"
                        error={errors.endDateSleep}
                        className={classnames("validate", {
                          invalid: errors.endDateSleep
                        })}
                      />
                      <label htmlFor="endDate" className="active">
                        End date
                      </label>
                      <span className="red-text">{errors.endDateSleep}</span>
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
                      onClick={this.editSleep}
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
  sleep: state.child.sleep
});

export default connect(
  mapStateToProps,
  { editSleep, deleteSleep }
)(SleepInfo);
