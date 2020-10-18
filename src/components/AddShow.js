import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";

class AddShow extends Component {
  onChangeHandler = (event, propertyName) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  render() {
    console.log("this.props.store.artists:", this.props.store.artists);
    console.log("this.props.store.date:", this.props.store.date);
    console.log("this.props.store.venues:", this.props.store.venues.name);
    return (
      <div>
        <h1>Review Your Feedback</h1>

        <h2>Date: {this.props.store.date}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddShow));
