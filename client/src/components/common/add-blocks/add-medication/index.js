import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { addMedication } from "../../../../modules/actions/medicationActions";
import M from "materialize-css";

class AddMedication extends Component {
  constructor() {
    super();
    this.state = {
      selectedChildMedication: "",
      timeMedication: "",
      amountMedication: "",
      dateMedication: "",
      typeMedication: "",
      additionalInfoMedication: "",
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

  addMedication = e => {
    e.preventDefault();
    const newMedication = {
      time: this.state.timeMedication,
      date: this.state.dateMedication,
      type: this.state.typeMedication,
      amount: this.state.amountMedication,
      additionalInfo: this.state.additionalInfoMedication
    };

    this.props.addMedication(newMedication, this.state.selectedChildMedication);
  };

  componentDidMount() {
    M.updateTextFields();
  }

  render() {
    const { errors } = this.state;
    const { children } = this.props;

    return (
      <div>
        <div className="row">
          <div className="input-field col s12">
            <select
              id="selectedChildMedication"
              value={this.state.selectedChildMedication}
              onChange={this.onChange}
            >
              <option value="">Select a child</option>
              {children.map((child, key) => (
                <option key={key} value={child._id}>
                  {child.fName} {child.lName}
                </option>
              ))}
            </select>
            <label htmlFor="selectedChildMedication">Select a child</label>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.timeMedication}
              id="timeMedication"
              type="time"
              placeholder="00:00"
              error={errors.timeMedication}
              className={classnames("validate", {
                invalid: errors.timeMedication
              })}
            />
            <label htmlFor="timeMedication">Time</label>
            <span className="red-text">{errors.timeMedication}</span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.dateMedication}
              id="dateMedication"
              type="date"
              placeholder="dd/mm/yyyy"
              error={errors.dateMedication}
              className={classnames("validate", {
                invalid: errors.dateMedication
              })}
            />
            <label htmlFor="dateMedication">Date</label>
            <span className="red-text">{errors.dateMedication}</span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.typeMedication}
              id="typeMedication"
              type="text"
              error={errors.typeMedication}
              className={classnames("validate", {
                invalid: errors.typeMedication
              })}
            />
            <label htmlFor="typeMedication">Type</label>
            <span className="red-text">{errors.typeMedication}</span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.amountMedication}
              id="amountMedication"
              type="text"
              error={errors.amountMedication}
              className={classnames("validate", {
                invalid: errors.amountMedication
              })}
            />
            <label htmlFor="amountMedication">Amount</label>
            <span className="red-text">{errors.amountMedication}</span>
          </div>
          <div className="input-field col s12">
            <textarea
              onChange={this.onChange}
              value={this.state.additionalInfoMedication}
              id="additionalInfoMedication"
              className="materialize-textarea"
            ></textarea>
            <label htmlFor="additionalInfoMedication">
              Additional Information
            </label>
          </div>
        </div>
        <div className="row">
          <button
            className="btn btn-large waves-effect hoverable teal accent-4 col s12"
            onClick={this.addMedication}
          >
            Submit
          </button>
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
  { addMedication }
)(AddMedication);
