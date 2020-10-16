import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ArtistItem extends Component {
  state = {
    heading: "Class Component",
  };

  render() {
    return (
      <div>
        <h1>
          Artist:
          {this.props.store.artistname}
        </h1>
        <h1>Genre: {this.props.store.artist.genre}</h1>
        <img
          height="400px"
          width="400px"
          alt=" "
          src={this.props.store.artist.image}
        ></img>

        <h1>Spotify Id: {this.props.store.artist.spotifyId}</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ArtistItem);
