import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class AddVenue extends Component {
  state = {
    search: "",
  };

  // componentDidMount = () => {
  //   console.log("in componentDidMount");

  //   this.getVenues();
  // };

  searchVenues = () => {
    console.log("Current State:", this.state);
    this.props.dispatch({
      type: "SEARCH_VENUE",
      payload: this.state,
    });
  };

  onChangeHandler = (event, propertyName) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  addVenues = (venue) => {
    console.log("this is the venues payload", venue);
    alert(`You selected ${venue.name}`);
    this.props.dispatch({
      type: "ADD_VENUE",
      payload: venue,
    });
    // this.getVenues();
  };

  onNext = () => {
    console.log("this.props.history", this.props.history);
    if (this.props.store.venues === "") {
      alert("Please select an VENUE");
    } else {
      this.props.history.push("/addShow");
    }
  };

  // th

  // getVenues = () => {
  //   this.props.dispatch({
  //     type: "FETCH_VENUES",
  //   });
  // };

  render() {
    return (
      // Can also just use <> </> instead of divs

      <div>
        {/* <List>
          <h1>My Saved Venues</h1>
          {this.props.store.getVenues.map((venue) => {
            const labelId = `checkbox-list-secondary-label-${venue.songKickId}`;
            return (
              <ListItem key={labelId} button>
                <ListItemText id={venue.songKickId} primary={venue.name} />
                <ListItemText primary={venue.address} />
                <ListItemText primary={venue.city} />
                <ListItemText primary={venue.songKickId} />
              </ListItem>
            );
          })}
        </List> */}
        <h1>Search Venues</h1>
        <input
          placeholder="Search Venue on SongKick"
          type="text"
          value={this.state.search}
          onChange={(event) => this.onChangeHandler(event, "search")}
        ></input>
        {"   "}
        <button onClick={this.searchVenues}>Search Venue</button>

        {/* <h1>Venue: {this.props.store.venue.name}</h1>
        <h1>City: {this.props.store.venue.city}</h1>
        <h1>State: {this.props.store.venue.state}</h1>

        <h1>Song Kick ID: {this.props.store.venue.songKickId}</h1> */}

        <List>
          <h3>Click on a Venue to Add"</h3>
          {this.props.store.venues.map((venue) => {
            const labelId = `checkbox-list-secondary-label-${venue.songKickId}`;
            return (
              <ListItem
                key={labelId}
                button
                onClick={() => this.addVenues(venue)}
              >
                {/* <ListItemAvatar>
                  <Avatar alt="band" src={artist.image} />
                </ListItemAvatar> */}
                <ListItemText id={venue.songKickId} primary={venue.name} />
                <ListItemText primary={venue.address} />
                <ListItemText primary={venue.city} />
                <ListItemText primary={venue.songKickId} />
              </ListItem>
            );
          })}
        </List>
        <button onClick={this.onNext}>Submit Venue and Proceed</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddVenue));
