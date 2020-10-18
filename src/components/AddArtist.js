import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";
// import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

class AddArtist extends Component {
  state = {
    search: "",
  };
  // componentDidMount = () => {
  //   console.log("in componentDidMount");

  //   this.getArtist();
  // };

  searchArtist = () => {
    console.log("Current State:", this.state);
    this.props.dispatch({
      type: "SEARCH_ARTIST",
      payload: this.state,
    });
  };

  onChange = (event, propertyName) => {
    console.log("we are changing", propertyName);
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  addArtist = (artist) => {
    console.log("this is the payload", artist);
    console.log("this.props.store.artists", this.props.store.artists);

    alert(`You selected ${artist.name}`);
    this.props.dispatch({
      type: "ADD_ARTIST",
      payload: artist,
    });
    // this.getArtist();
  };

  // getArtist = () => {
  //   this.props.dispatch({
  //     type: "FETCH_ARTIST",
  //   });
  // };

  onNext = () => {
    console.log("this.props.history", this.props.history);
    if (this.props.store.artists === "") {
      alert("Please select an ARTIST");
    } else {
      this.props.history.push("/addVenue");
    }
  };

  render() {
    console.log("state", this.props.store);

    return (
      // Can also just use <> </> instead of divs

      <div>
        {/* <List>
          <h1>My Saved Artists</h1>
          {this.props.store.getArtists.map((artist) => {
            const labelId = `checkbox-list-secondary-label-${artist.spotifyId}`;
            return (
              <ListItem
                key={labelId}
                button
                // onClick={() => this.addArtist(artist)}
              >
                <ListItemAvatar>
                  <Avatar alt="band" src={artist.image} />
                </ListItemAvatar>
                <ListItemText id={artist.spotifyId} primary={artist.name} />
                <ListItemText primary={artist.genre} />
              </ListItem>
            );
          })}
        </List> */}
        <h1>Artist Search</h1>
        <input
          placeholder="Search Artist on Spotify"
          type="text"
          value={this.state.search}
          onChange={(event) => this.onChange(event, "search")}
        ></input>
        <button onClick={this.searchArtist}>Search </button>
        <List>
          <h3>Click on an Artist to Add</h3>
          {this.props.store.artists.map((artist) => {
            const labelId = `checkbox-list-secondary-label-${artist.spotifyId}`;
            return (
              <ListItem
                key={labelId}
                button
                onClick={() => this.addArtist(artist)}
              >
                <ListItemAvatar>
                  <Avatar alt="band" src={artist.image} />
                </ListItemAvatar>
                <ListItemText id={artist.spotifyId} primary={artist.name} />
                <ListItemText primary={artist.genre} />
              </ListItem>
            );
          })}
        </List>

        <button onClick={this.onNext}>Submit Artist</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddArtist));

// Don't forget to import Component into parent Component
