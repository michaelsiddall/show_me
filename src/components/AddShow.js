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
    console.log("this.props.store:", this.props.store.artists);
    return (
      <div>
        <h1>Review Your Feedback</h1>
        <br />
        <h2>Artist: {this.props.store.artists}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddShow));
