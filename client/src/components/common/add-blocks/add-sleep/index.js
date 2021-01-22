import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { addSleep } from "../../../../modules/actions/sleepActions";
import M from "materialize-css";

class AddSleep extends Component {
  constructor() {
    super();
    this.state = {
      selectedChildSleep: "",
      startTimeSleep: "",
      endTimeSleep: "",
      startDateSleep: "",
      endDateSleep: "",
      additionalInfoSleep: "",
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

  addSleep = e => {
    e.preventDefault();
    const newSleep = {
      startTime: this.state.startTimeSleep,
      endTime: this.state.endTimeSleep,
      startDate: this.state.startDateSleep,
      endDate: this.state.endDateSleep,
      additionalInfo: this.state.additionalInfoSleep
    };

    this.props.addSleep(newSleep, this.state.selectedChildSleep);
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
              id="selectedChildSleep"
              value={this.state.selectedChildSleep}
              onChange={this.onChange}
            >
              <option value="">Select a child</option>
              {children.map((child, key) => (
                <option key={key} value={child._id}>
                  {child.fName} {child.lName}
                </option>
              ))}
            </select>
            <label htmlFor="selectedChildSleep">Select a child</label>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.startTimeSleep}
              id="startTimeSleep"
              type="time"
              placeholder="00:00"
              error={errors.startTimeSleep}
              className={classnames("validate", {
                invalid: errors.startTimeSleep
              })}
            />
            <label htmlFor="startTimeSleep">Start time</label>
            <span className="red-text">{errors.startTimeSleep}</span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.endTimeSleep}
              id="endTimeSleep"
              type="time"
              placeholder="00:00"
              error={errors.endTimeSleep}
              className={classnames("validate tooltipped", {
                invalid: errors.endTimeSleep
              })}
              data-position="bottom"
              data-tooltip="Don't worry, you can always fill this in when they wake up"
            />
            <label htmlFor="endTimeSleep">End time</label>
            <span className="red-text">{errors.endTimeSleep}</span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.startDateSleep}
              id="startDateSleep"
              type="date"
              placeholder="dd/mm/yyyy"
              error={errors.startDateSleep}
              className={classnames("validate", {
                invalid: errors.startDateSleep
              })}
            />
            <label htmlFor="startDateSleep">Start date</label>
            <span className="red-text">{errors.startDateSleep}</span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.endDateSleep}
              id="endDateSleep"
              type="date"
              placeholder="dd/mm/yyyy"
              error={errors.endDateSleep}
              className={classnames("validate tooltipped", {
                invalid: errors.endDateSleep
              })}
              data-position="bottom"
              data-tooltip="Don't worry, you can always fill this in when they wake up"
            />
            <label htmlFor="endDateSleep">End date</label>
            <span className="red-text">{errors.endDateSleep}</span>
          </div>
          <div className="input-field col s12">
            <textarea
              onChange={this.onChange}
              value={this.state.additionalInfoPoop}
              id="additionalInfoSleep"
              className="materialize-textarea"
            ></textarea>
            <label htmlFor="additionalInfoSleep">Additional Information</label>
          </div>
        </div>
        <div className="row">
          <button
            className="btn btn-large waves-effect hoverable teal accent-4 col s12"
            onClick={this.addSleep}
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
  sleep: state.child.sleep
});

export default connect(
  mapStateToProps,
  { addSleep }
)(AddSleep);
