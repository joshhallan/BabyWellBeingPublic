import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Oops...</span>
                <p>Looks like the page you're looking for doesn't exist</p>
                <p>
                  You can return home <Link to="/">here</Link> or use the menu
                  to the right to navigate to where you need to be
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
