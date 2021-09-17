import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";

class Reviews extends Component {
  state = {
    review: "",
  };

  onChangeHandler = (event) => {
    this.setState({
      review: event.target.value,
    });
  };

  onSubmit = () => {
    this.props.dispatch({
      type: "SET_REVIEW",
      payload: this.state.review,
    });
    this.props.history.push("/addShow");
  };

  render() {
    return (
      <div>
        <div>
          <label>
            <h3>Show Review...</h3>
            <h5>the good, bad, and the ugly</h5>
            <textarea
              style={{ width: 400, height: 200 }}
              onChange={(event) => this.onChangeHandler(event, "review")}
            />
          </label>
        </div>
        <div>
          <button className="venueBtn" onClick={this.onSubmit}>
            Submit!
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(Reviews));
