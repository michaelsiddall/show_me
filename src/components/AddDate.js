import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";

class AddDate extends Component {
  onChangeHandler = (event) => {
    console.log("this.props.store.date is", this.props.store.date);
    this.props.dispatch({
      type: "SET_DATE",
      payload: event.target.value,
    });
  };

  submitDate = () => {
    console.log("this.props.store.date is", this.props.store.date);
    this.props.history.push("/addArtist");
  };

  render() {
    return (
      <div>
        <h3>Select Date of the Show You Attended</h3>
        {/* <h3>Date of the show: {this.props.store.date} </h3> */}
        <form>
          <input
            className="input"
            placeholder="Date of Show"
            type="date"
            value={this.props.store.date}
            onChange={(event) => this.onChangeHandler(event)}
          ></input>
          <button className="venueBtn" onClick={this.submitDate}>
            Submit Date
          </button>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddDate));
