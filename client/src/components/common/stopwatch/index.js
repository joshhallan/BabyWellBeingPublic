import React, { Component } from "react";
import "./style.css";

class StopWatch extends Component {
  constructor() {
    super();
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0
    };
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    this.props.parentCallback(this.state.timerTime);
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

  render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return (
      <div className="Stopwatch">
        <div className="input-field col s12">
          <p className="stopwatch">
            {hours} : {minutes} : {seconds}
          </p>
          <label className="active">Timer</label>
          {this.state.timerOn === false && this.state.timerTime === 0 && (
            <button
              className="btn btn-small waves-effect hoverable teal accent-4 col s12"
              onClick={this.startTimer}
            >
              Start
            </button>
          )}
          {this.state.timerOn === true && (
            <button
              className="btn btn-small waves-effect hoverable red col s12"
              onClick={this.stopTimer}
            >
              Stop
            </button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button
              className="btn btn-small waves-effect hoverable teal accent-4 col s12"
              style={{ margin: "0 0 20px 0" }}
              onClick={this.startTimer}
            >
              Resume
            </button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button
              className="btn btn-small waves-effect hoverable red col s12"
              onClick={this.resetTimer}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default StopWatch;
