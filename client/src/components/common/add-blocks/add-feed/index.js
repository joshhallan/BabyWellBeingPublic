import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { addFeed } from "../../../../modules/actions/feedActions";
import M from "materialize-css";

class AddFeed extends Component {
  constructor() {
    super();
    this.state = {
      selectedChildFeed: "",

      // Bottle input
      feederFeed: "",
      amountFeed: "",
      timeFeed: "",
      dateFeed: "",
      additionalInfoFeed: "",

      // Breast input
      // sideFeed: "",
      // timeSpentFeed: "",

      // misc
      switch: false,
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
    e.target.id === "switch"
      ? this.setState({ [e.target.id]: e.target.checked })
      : this.setState({ [e.target.id]: e.target.value });
  };

  addFeed = e => {
    e.preventDefault();
    const newFeed = {
      feeder: this.state.feederFeed,
      amount: this.state.amountFeed,
      time: this.state.timeFeed,
      date: this.state.dateFeed,
      additionalInfo: this.state.additionalInfoFeed
    };

    this.props.addFeed(newFeed, this.state.selectedChildFeed);
  };

  // addBreastFeed = e => {
  //   e.preventDefault();
  // };

  // callBackFunction = data => {
  //   this.setState({ timeSpentFeed: data });
  // };

  componentDidMount() {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }

  componentDidUpdate() {
    M.updateTextFields();
  }

  render() {
    const { errors } = this.state;
    const { children } = this.props;

    return (
      <div>
        <div>
          <div className="row">
            <div className="input-field col s12">
              <select
                id="selectedChildFeed"
                value={this.state.selectedChildFeed}
                onChange={this.onChange}
              >
                <option value="">Select a child</option>
                {children.map((child, key) => (
                  <option key={key} value={child._id}>
                    {child.fName} {child.lName}
                  </option>
                ))}
              </select>
              <label htmlFor="selectedChildFeed">Select a child</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.feederFeed}
                id="feederFeed"
                type="text"
                error={errors.feederFeed}
                className={classnames("validate", {
                  invalid: errors.feederFeed
                })}
              />
              <label htmlFor="feederFeed">Feeder</label>
              <span className="red-text">{errors.feederFeed}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.amountFeed}
                id="amountFeed"
                type="number"
                error={errors.amountFeed}
                className={classnames("validate", {
                  invalid: errors.amountFeed
                })}
              />
              <label htmlFor="amountFeed">Amount</label>
              <span className="red-text">{errors.amountFeed}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.timeFeed}
                id="timeFeed"
                type="time"
                placeholder="00:00"
                error={errors.timeFeed}
                className={classnames("validate", {
                  invalid: errors.timeFeed
                })}
              />
              <label htmlFor="timeFeed">Time</label>
              <span className="red-text">{errors.timeFeed}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.dateFeed}
                id="dateFeed"
                type="date"
                placeholder="dd/mm/yyyy"
                error={errors.dateFeed}
                className={classnames("validate", {
                  invalid: errors.dateFeed
                })}
              />
              <label htmlFor="dateFeed">Date</label>
              <span className="red-text">{errors.dateFeed}</span>
            </div>
            <div className="input-field col s12">
              <textarea
                onChange={this.onChange}
                value={this.state.additionalInfoFeed}
                id="additionalInfoFeed"
                className="materialize-textarea"
              ></textarea>
              <label htmlFor="additionalInfoFeed">Additional Information</label>
            </div>
          </div>
          <div className="row">
            <button
              className="btn btn-large waves-effect hoverable teal accent-4 col s12"
              onClick={this.addFeed}
            >
              Submit
            </button>
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
  feeds: state.child.feeds
});

export default connect(
  mapStateToProps,
  { addFeed }
)(AddFeed);
