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

  searchVenues = () => {
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

  addVenues = (songKickId, name) => {
    console.log("this is the songKickId of selected venue", songKickId);
    // alert(`You selected ${(songKickId, name)}`);
    this.props.dispatch({
      type: "SET_SONGKICK_ID",
      payload: songKickId,
    });

    this.props.history.push("/addReview");
  };

  // onNext = () => {
  //   console.log("this.props.history", this.props.history);

  //   }
  // };

  render() {
    return (
      <div>
        <img
          className="songkick"
          src="/images/sk-badge-black.png"
          alt="songkick"
          height="50px"
          width="50px"
        ></img>
        <h4>powered by SongKick</h4>
        <div></div>
        <h3>Venue Search</h3>

        <input
          className="input"
          placeholder="Enter the venue to search"
          type="text"
          value={this.state.search}
          onChange={(event) => this.onChangeHandler(event, "search")}
        ></input>
        {"   "}
        <button className="venueBtn" onClick={this.searchVenues}>
          Search
        </button>

        <List>
          <h3>Click on a Venue to Submit</h3>
          {this.props.store.venues.map((venue) => {
            const labelId = `checkbox-list-secondary-label-${venue.songKickId}`;
            return (
              <ListItem
                key={labelId}
                button
                onClick={() => this.addVenues(venue.songKickId, venue.name)}
              >
                <ListItemText id={venue.songKickId} primary={venue.name} />
                <ListItemText primary={venue.address} />
                <ListItemText primary={venue.city} />
                <ListItemText primary={venue.songKickId} />
              </ListItem>
            );
          })}
        </List>
        {/* <button onClick={this.onNext}>Submit Venue and Proceed</button> */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddVenue));
