import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";
import axios from "axios";

class AddShow extends Component {
  onSubmit = () => {
    console.log("in onSubmit");
    axios({
      method: "POST",
      url: "/saveConcert",
      data: {
        date: this.props.store.date,
        spotifyId: this.props.store.spotifyId,
        songKickId: this.props.store.songKickId,
      },
    })
      .then((response) => {
        console.log("back from POST with:", response);
      })
      .catch((err) => {
        console.log(err);
        alert("problem...");
      });
  }; //end function
  render() {
    console.log("this.props.store.artists:", this.props.store.artists);
    console.log("this.props.store.date:", this.props.store.date);
    console.log("this.props.store.venues:", this.props.store.venues.name);
    return (
      <div>
        <h1>Review Your Feedback</h1>

        <h2>Date: {this.props.store.date}</h2>
        <button onClick={this.onSubmit}>Save Show</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddShow));
