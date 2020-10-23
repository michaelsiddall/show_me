import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";
import axios from "axios";
import swal from "sweetalert";

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
        swal({ text: "Your show has been saved!" });
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
        <h3>Save Your Show</h3>

        <button class="venueBtn" onClick={this.onSubmit}>
          Save
        </button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddShow));
