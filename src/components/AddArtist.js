import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./../redux/mapStoreToProps";

class AddArtist extends Component {
  state = {
    search: "",
  };

  searchArtist = () => {
    console.log("Current State:", this.state);
    this.props.dispatch({
      type: "SEARCH_ARTIST",
      payload: this.state,
    });
  };

  onChangeHandler = (event, propertyName) => {
    console.log("we are changing", propertyName);
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  render() {
    console.log("this.props.store.artist is", this.props.store.artist);

    return (
      // Can also just use <> </> instead of divs
      <div>
        <input
          placeholder="Search Artist on Spotify"
          type="text"
          value={this.state.search}
          onChange={(event) => this.onChangeHandler(event, "search")}
        ></input>
        {"   "}
        <button onClick={this.searchArtist}>Search Artist on Spotify</button>

        <h1>Artist: {this.props.store.artist.name}</h1>
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

export default connect(mapStoreToProps)(AddArtist);

// Don't forget to import Component into parent Component
