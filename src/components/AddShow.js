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
        review: this.props.store.review,
      },
    })
      .then((response) => {
        console.log("back from POST with:", response);
        alert("Your Show Has Been Saved");
        this.props.history.push("/showDetails");
      })
      .catch((err) => {
        console.log(err);
        alert("problem...");
      });
  }; //end function
  render() {
    return (
      <div>
        <h1>Save Your Show</h1>

        <button class="venueBtn" onClick={this.onSubmit}>
          Save
        </button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddShow));
