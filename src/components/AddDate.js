import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";

class AddDate extends Component {
  state = {
    date: "",
  };

  onChange = (event) => {
    console.log("payload is", event.target.value);
    console.log("this.props.store.date is", this.props.store.date);
    this.props.dispatch({
      type: "SET_DATE",
      payload: event.target.value,
    });
  };
  // onChangeHandler = (event) => {
  //   console.log("event.target.value is", event.target.value);

  //   this.setState({
  //     value: event.target.value,
  //   });
  // };

  submitDate = () => {
    console.log("this.props.store.date is", this.props.store.date);
    console.log("clicked submitDate");

    console.log("this.props.history", this.props.history);
    if (this.props.store.date === "") {
      alert("Please select a date");
    } else {
      this.props.history.push("/addArtist");
    }
  };

  // onChange = (date) => this.setState({ date });

  render() {
    return (
      <div>
        <h1>Date of the show: {this.state.value} </h1>
        <form>
          <input
            placeholder="Date of Show"
            type="date"
            value={this.props.store.date}
            onChange={(event) => this.onChange(event)}
          ></input>
          <button onClick={this.submitDate}>Submit Date</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddDate));
