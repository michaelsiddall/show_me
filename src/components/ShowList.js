import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./../redux/mapStoreToProps";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import { response } from "express";

class ShowList extends Component {
  state = {
    shows: [],
  };

  componentDidMount = () => {
    console.log("in componentDidMount");
    this.getShows();
  };

  getShows = () => {
    axios({
      method: "GET",
      url: "/showList",
    })
      .then((response) => {
        console.log("response", response);
        console.log("response.data", response.data);

        this.setState({
          shows: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // deleteShow = () => {
  //   console.log("this show to delete", this.state.show);
  // };

  render() {
    console.log("state is", this.state.shows);
    console.log("showId is", this.state.shows);

    return (
      <div>
        {/* <h1>Show List</h1>
        <ul>
          {this.state.shows.map((show) => (
            <li key={show.showId}>
              <h1>{show.artistName}</h1> <h2>{show.venueName}</h2>{" "}
              <h3>{show.date}</h3>
            </li>
          ))}
        </ul> */}

        <List>
          <h3>Click on an Artist to Add and click Submit</h3>
          {this.state.shows.map((show) => {
            const labelId = `checkbox-list-secondary-label-${show.showId}`;
            return (
              <ListItem
                key={labelId}
                button
                // onClick={() => this.addArtist(artist.spotifyId, artist.name)}
              >
                <ListItemAvatar>
                  <Avatar alt="band" src={show.image} />
                </ListItemAvatar>
                <ListItemText id={show.showId} primary={show.artistName} />
                <ListItemText primary={show.venueName} />
                <ListItemText primary={show.date} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ShowList);
