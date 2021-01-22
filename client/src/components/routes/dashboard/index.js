import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";

// Actions
import { getChildren } from "../../../modules/actions/childActions";
import { getFeeds } from "../../../modules/actions/feedActions";
import { getPoops } from "../../../modules/actions/poopActions";
import { getSleep } from "../../../modules/actions/sleepActions";
import { getMedication } from "../../../modules/actions/medicationActions";

// Add blocks
import AddFeed from "../../common/add-blocks/add-feed";
import AddPoop from "../../common/add-blocks/add-poop";
import AddSleep from "../../common/add-blocks/add-sleep";
import AddMedication from "../../common/add-blocks/add-medication";

// Info blocks
import FeedInfo from "../../common/info-blocks/feed-block";
import PoopInfo from "../../common/info-blocks/poop-block";
import SleepInfo from "../../common/info-blocks/sleep-block";
import MedicationInfo from "../../common/info-blocks/medication-block";

// Dashboard styling
import "./style.css";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      // Data filters
      childFilter: "",
      dateFilter: "",

      // Arrays
      feeds: [],
      poops: [],
      sleep: [],
      medication: [],
      children: []
    };
  }

  static getDerivedStateFromProps(props) {
    let returnInfo = {};

    returnInfo.feeds = props.feeds;
    returnInfo.poops = props.poops;
    returnInfo.sleep = props.sleep;
    returnInfo.medication = props.medication;

    if (props.children.length !== 0) {
      returnInfo.children = props.children;
    }
    if (props.errors) {
      returnInfo.errors = props.errors;
    }

    return returnInfo;
  }

  componentDidMount() {
    let collapsible = document.querySelectorAll(".collapsible.expandable");
    M.Collapsible.init(collapsible, {
      accordion: false
    });
    let tooltips = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(tooltips);
    let tabs = document.querySelectorAll(".tabs");
    M.Tabs.init(tabs);

    // Get all children
    this.props.getChildren(this.props.auth);
  }

  componentDidUpdate() {
    // Needs to be ran after everything has loaded in
    let selects = document.querySelectorAll("select");
    M.FormSelect.init(selects);
    M.updateTextFields();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  setChildFilter = e => {
    // Get all feeds for the selected child
    this.props.getFeeds(e.target.value);
    // Get poops for the selected child
    this.props.getPoops(e.target.value);
    // Get sleep for the selected child
    this.props.getSleep(e.target.value);
    // Get medication for the selected child
    this.props.getMedication(e.target.value);
    this.setState({
      childFilter: e.target.value
    });
  };

  render() {
    const { children } = this.state;

    // Sort and filter feeds
    let feeds = this.state.feeds
      .filter(feed => feed.date === this.state.dateFilter)
      .sort((a, b) => (a.time < b.time ? 1 : b.time < a.time ? -1 : 0));

    // Sort and filter poops
    let poops = this.state.poops
      .filter(poop => poop.date === this.state.dateFilter)
      .sort((a, b) => (a.time < b.time ? 1 : b.time < a.time ? -1 : 0));

    // Sort and filter sleep
    let sleep = this.state.sleep
      .filter(sleep => sleep.startDate === this.state.dateFilter)
      .sort((a, b) =>
        a.startTime < b.startTime ? 1 : b.startTime < a.startTime ? -1 : 0
      );

    // Sort and filter medication
    let medication = this.state.medication
      .filter(medication => medication.date === this.state.dateFilter)
      .sort((a, b) => (a.time < b.time ? 1 : b.time < a.time ? -1 : 0));

    let totalFeedAmount = 0;

    for (let feed of feeds) {
      if (feed.date === this.state.dateFilter) {
        totalFeedAmount += parseFloat(feed.amount);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 l4">
            <div className="card">
              <ul className="collapsible expandable">
                {/* Add Feed */}
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">fastfood</i>Add feed
                  </div>
                  <div className="collapsible-body">
                    <AddFeed {...children} />
                  </div>
                </li>
                {/* Add poop */}
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">baby_changing_station</i>Add
                    poop
                  </div>
                  <div className="collapsible-body">
                    <AddPoop {...children} />
                  </div>
                </li>
                {/* Add sleep */}
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">hotel</i>Add sleep
                  </div>
                  <div className="collapsible-body">
                    <AddSleep {...children} />
                  </div>
                </li>
                {/* Add medication */}
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">healing</i>Add medication
                  </div>
                  <div className="collapsible-body">
                    <AddMedication {...children} />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col s12 l8">
            <div className="card">
              <ul className="collapsible expandable filters">
                {/* Filters */}
                <li className="active">
                  <div className="collapsible-header">
                    <i className="material-icons">filter_list</i>Filters
                  </div>
                  <div className="collapsible-body">
                    <div className="row">
                      {/* Child select */}
                      <div className="input-field col s12 l6">
                        <select
                          id="childFilter"
                          value={this.state.childFilter}
                          onChange={this.setChildFilter}
                        >
                          <option value={[]}>Select a child</option>
                          {children.map((child, key) => (
                            <option key={key} value={child._id}>
                              {child.fName} {child.lName}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="childFilter">Select a child</label>
                      </div>

                      {/* Date Filter */}
                      <div className="input-field col s12 l6">
                        <input
                          onChange={this.onChange}
                          value={this.dateFilter}
                          type="date"
                          id="dateFilter"
                          className="validate"
                          placeholder="dd/mm/yyyy"
                        />
                        <label htmlFor="dateFilter" className="active">
                          Select a date
                        </label>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Daily information */}
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">information</i>Daily
                    information
                  </div>
                  <div className="collapsible-body">
                    <div className="row">
                      <div className="col s12">
                        <p>
                          <span>Date: </span>
                          {this.state.dateFilter
                            .split("-")
                            .reverse()
                            .join("-")}
                        </p>
                        <p>
                          <span>Total daily amount: </span>
                          {totalFeedAmount} ounces
                        </p>
                        <p>
                          <span>Number of feeds: </span>
                          {feeds.length}
                        </p>
                        <p>
                          <span>Number of poops: </span>
                          {poops.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="tabs tabs-fixed-width">
                <li className="tab">
                  <a href="#feeds" className="active">
                    Feeds <span className="badge">({feeds.length})</span>
                  </a>
                </li>
                <li className="tab">
                  <a href="#poops">
                    Poops <span className="badge">({poops.length})</span>
                  </a>
                </li>
                <li className="tab">
                  <a href="#sleep">
                    Sleep <span className="badge">({sleep.length})</span>
                  </a>
                </li>
                <li className="tab">
                  <a href="#medication">
                    Medication{" "}
                    <span className="badge">({medication.length})</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* List of feeds for the date */}
            <div id="feeds">
              {/* If no feeds are found for that date then show the standard message */}
              {feeds.length === 0 ? (
                <div className="row">
                  <div className="col s12">
                    <div className="card">
                      <div className="card-content">
                        <span className="card-title">No feeds found</span>
                        <div className="row">
                          <p className="col s12">
                            Please add a feed for the selected child and date or
                            refresh the app for the most update information
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                feeds.map((feed, key) => (
                  <FeedInfo
                    key={key}
                    {...feed}
                    childFilter={this.state.childFilter}
                  />
                ))
              )}
            </div>
            {/* List of poops for the date */}
            <div id="poops">
              {/* If no poops are found for that date then show the standard message */}
              {poops.length === 0 ? (
                <div className="row">
                  <div className="col s12">
                    <div className="card">
                      <div className="card-content">
                        <span className="card-title">No poops found</span>
                        <div className="row">
                          <p className="col s12">
                            Please add a poop for the selected child and date or
                            refresh the app for the most update information
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                poops.map((poop, key) => (
                  <PoopInfo
                    key={key}
                    {...poop}
                    childFilter={this.state.childFilter}
                  />
                ))
              )}
            </div>
            {/* List of sleep for the date */}
            <div id="sleep">
              {/* If no poops are found for that date then show the standard message */}
              {sleep.length === 0 ? (
                <div className="row">
                  <div className="col s12">
                    <div className="card">
                      <div className="card-content">
                        <span className="card-title">No sleep found</span>
                        <div className="row">
                          <p className="col s12">
                            Please add a sleep for the selected child and date
                            or refresh the app for the most update information
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                sleep.map((sleep, key) => (
                  <SleepInfo
                    key={key}
                    {...sleep}
                    childFilter={this.state.childFilter}
                  />
                ))
              )}
            </div>
            {/* list of medication for the date */}
            <div id="medication">
              {/* If no medication are found for that date then show the standard message */}
              {medication.length === 0 ? (
                <div className="row">
                  <div className="col s12">
                    <div className="card">
                      <div className="card-content">
                        <span className="card-title">No medication found</span>
                        <div className="row">
                          <p className="col s12">
                            Please add medication for the selected child and
                            date or refresh the app for the most update
                            information
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                medication.map((medication, key) => (
                  <MedicationInfo
                    key={key}
                    {...medication}
                    childFilter={this.state.childFilter}
                  />
                ))
              )}
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
  children: state.child.children,
  feeds: state.feeds.feeds,
  poops: state.poops.poops,
  sleep: state.sleep.sleep,
  medication: state.medication.medication
});

export default connect(
  mapStateToProps,
  {
    getChildren,
    getFeeds,
    getPoops,
    getSleep,
    getMedication
  }
)(Dashboard);
