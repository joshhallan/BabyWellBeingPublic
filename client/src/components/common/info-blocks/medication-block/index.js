import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { editMedication, deleteMedication } from "../../../../modules/actions/medicationActions";
import M from "materialize-css";
import "./style.css";

class MedicationInfo extends Component {
  constructor() {
    super();
    this.state = {
      time: "",
      date: "",
      amount: "",
      type: "",
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

  deleteMedication = e => {
    e.preventDefault();
    this.props.deleteMedication(this.props.childFilter, this.props._id);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  editMedication = e => {
    e.preventDefault();
    const editedMedication = {
      time: this.state.time,
      date: this.state.date,
      amount: this.state.amount,
      type: this.state.type,
      additionalInfo: this.state.additionalInfo
    };

    this.props
      .editMedication(this.props.childFilter, this.props._id, editedMedication)
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
      amount: this.props.amount,
      type: this.props.type,
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
                <i className="material-icons right card-icon--healing">healing</i>
                <div className="card-content">
                  <span className="card-title">
                    Medication:{" "}
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
                      <span>Date:</span> {this.props.Date}
                    </p>
                    <p className="col s12">
                      <span>Type:</span> {this.props.type}
                    </p>
                    <p className="col s12">
                      <span>Amount: </span> {this.props.amount}
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
                      onClick={this.deleteMedication}
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
                  <span className="card-title">Edit medication</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.time}
                        id="time"
                        type="time"
                        error={errors.timeMedication}
                        className={classnames("validate", {
                          invalid: errors.timeMedication
                        })}
                      />
                      <label htmlFor="time" className="active">
                        Time
                      </label>
                      <span className="red-text">{errors.timeMedication}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.date}
                        id="date"
                        type="date"
                        error={errors.dateMedication}
                        className={classnames("validate", {
                          invalid: errors.dateMedication
                        })}
                      />
                      <label htmlFor="date" className="active">
                        Date
                      </label>
                      <span className="red-text">{errors.dateMedication}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.type}
                        id="type"
                        type="text"
                        error={errors.typeMedication}
                        className={classnames("validate", {
                          invalid: errors.typeMedication
                        })}
                      />
                      <label htmlFor="type" className="active">
                        Type
                      </label>
                      <span className="red-text">{errors.endDate}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.amount}
                        id="amount"
                        type="text"
                        error={errors.amountMedication}
                        className={classnames("validate", {
                          invalid: errors.amountMedication
                        })}
                      />
                      <label htmlFor="type" className="active">
                        Type
                      </label>
                      <span className="red-text">{errors.amountMedication}</span>
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
                      onClick={this.editMedication}
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
  medication: state.child.medication
});

export default connect(
  mapStateToProps,
  { editMedication, deleteMedication }
)(MedicationInfo);
