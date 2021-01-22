import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { editFeed, deleteFeed } from "../../../../modules/actions/feedActions";
import M from "materialize-css";
import "./style.css";

class FeedInfo extends Component {
  constructor() {
    super();
    this.state = {
      feeder: "",
      amount: "",
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

  deleteFeed = e => {
    e.preventDefault();
    this.props.deleteFeed(this.props.childFilter, this.props._id);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  editFeed = e => {
    e.preventDefault();
    const editedFeed = {
      feeder: this.state.feeder,
      amount: this.state.amount,
      time: this.state.time,
      date: this.state.date,
      additionalInfo: this.state.additionalInfo
    };

    this.props
      .editFeed(this.props.childFilter, this.props._id, editedFeed)
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
      feeder: this.props.feeder,
      amount: this.props.amount,
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
        <div className="row feed-block">
          <div className="col s12">
            {this.state.editMode === false ? (
              // Display info box
              <div className="card">
              <i className="material-icons right card-icon--feed">
                  fastfood
                </i>
                <div className="card-content">
                  <span className="card-title">
                    Feed:{" "}
                    {this.props.date
                      .split("-")
                      .reverse()
                      .join("-")}{" "}
                    @ {this.props.time}
                  </span>
                  <div className="row">
                    <p className="col s12">
                      <span>Feeder:</span> {this.props.feeder}
                    </p>
                    <p className="col s12">
                      <span>Amount:</span> {this.props.amount} ounces
                    </p>
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
                      onClick={this.deleteFeed}
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
                  <span className="card-title">Edit feed</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.feeder}
                        id="feeder"
                        type="text"
                        error={errors.feederFeed}
                        className={classnames("validate", {
                          invalid: errors.feederFeed
                        })}
                      />
                      <label htmlFor="feeder" className="active">
                        Feeder
                      </label>
                      <span className="red-text">{errors.feederFeed}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.amount}
                        id="amount"
                        type="number"
                        error={errors.amountFeed}
                        className={classnames("validate", {
                          invalid: errors.amountFeed
                        })}
                      />
                      <label htmlFor="amount" className="active">
                        Amount
                      </label>
                      <span className="red-text">{errors.amountFeed}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.time}
                        id="time"
                        type="time"
                        error={errors.timeFeed}
                        className={classnames("validate", {
                          invalid: errors.timeFeed
                        })}
                      />
                      <label htmlFor="time" className="active">
                        Time
                      </label>
                      <span className="red-text">{errors.timeFeed}</span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        defaultValue={this.props.date}
                        id="date"
                        type="date"
                        error={errors.dateFeed}
                        className={classnames("validate", {
                          invalid: errors.dateFeed
                        })}
                      />
                      <label htmlFor="date" className="active">
                        Date
                      </label>
                      <span className="red-text">{errors.dateFeed}</span>
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
                      onClick={this.editFeed}
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
  feeds: state.child.feeds
});

export default connect(
  mapStateToProps,
  { editFeed, deleteFeed }
)(FeedInfo);
