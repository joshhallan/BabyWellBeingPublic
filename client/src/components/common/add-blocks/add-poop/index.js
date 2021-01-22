import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { addPoop } from "../../../../modules/actions/poopActions";
import M from "materialize-css";

class AddPoop extends Component {
  constructor() {
    super();
    this.state = {
      selectedChildPoop: "",
      timePoop: "",
      datePoop: "",
      additionalInfoPoop: "",
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

  addPoop = e => {
    e.preventDefault();
    const newPoop = {
      time: this.state.timePoop,
      date: this.state.datePoop,
      additionalInfo: this.state.additionalInfoPoop
    };

    this.props.addPoop(newPoop, this.state.selectedChildPoop);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
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
              id="selectedChildPoop"
              value={this.state.selectedChildPoop}
              onChange={this.onChange}
            >
              <option value="">Select a child</option>
              {children.map((child, key) => (
                <option key={key} value={child._id}>
                  {child.fName} {child.lName}
                </option>
              ))}
            </select>
            <label htmlFor="selectedChildPoop">Select a child</label>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.timePoop}
              id="timePoop"
              type="time"
              placeholder="00:00"
              error={errors.timePoop}
              className={classnames("validate", {
                invalid: errors.timePoop
              })}
            />
            <label htmlFor="timePoop">Time</label>
            <span className="red-text">{errors.timePoop}</span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.datePoop}
              id="datePoop"
              type="date"
              placeholder="dd/mm/yyyy"
              error={errors.datePoop}
              className={classnames("validate", {
                invalid: errors.datePoop
              })}
            />
            <label htmlFor="datePoop">Date</label>
            <span className="red-text">{errors.datePoop}</span>
          </div>
          <div className="input-field col s12">
            <textarea
              onChange={this.onChange}
              value={this.state.additionalInfoPoop}
              id="additionalInfoPoop"
              className="materialize-textarea"
            ></textarea>
            <label htmlFor="additionalInfoPoop">Additional Information</label>
          </div>
        </div>
        <div className="row">
          <button
            className="btn btn-large waves-effect hoverable teal accent-4 col s12"
            onClick={this.addPoop}
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
  poops: state.child.poops
});

export default connect(
  mapStateToProps,
  { addPoop }
)(AddPoop);
