import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./../redux/mapStoreToProps";

class AddVenue extends Component {
  state = {
    search: "",
  };

  searchVenue = () => {
    console.log("Current State:", this.state);
    this.props.dispatch({
      type: "SEARCH_VENUE",
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
    // console.log("this.props.store.artist is", this.props.store.artist);

    return (
      // Can also just use <> </> instead of divs
      <div>
        <input
          placeholder="Search Venue on SongKick"
          type="text"
          value={this.state.search}
          onChange={(event) => this.onChangeHandler(event, "search")}
        ></input>
        {"   "}
        <button onClick={this.searchVenue}>Search Venue</button>

        <h1>Venue: {this.props.store.venue.name}</h1>
        <h1>City: {this.props.store.venue.city}</h1>
        <h1>State: {this.props.store.venue.state}</h1>

        <h1>Song Kick ID: {this.props.store.venue.songKickId}</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddVenue);
