import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

class LandingPage extends Component {
  state = {
    // heading: "Class Component",
  };

  onLogin = (event) => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <p>
              <h3>Why Don't You Show Me?</h3>
            </p>
            <p>
              <bold>Show Me</bold> is an app designed for fans of live music.
              Whether it’s a local band in a tiny dive bar or a sold out 40,000
              seat arena concert, Show Me allows users to document and organize
              their live music experiences. Registered users have the ability to
              write reviews of their concert experiences: Who were you with? How
              was the sound at the veue? Did the artist play your favorite song?
              Maybe something personally memorable happened that night? With the
              power of Spotify’s artist AP and SongKick’s venue APII, users can
              quickly and easily add their favorite bands and capture not only
              their musical memories, but the life that was lived inside them.
            </p>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
