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

  // componentDidUpdate = (prevState) => {
  //   // If our question ID has changed,
  //   // we need to re-fetch data from the server (or reset the form)
  //   if (prevState.shows !== this.state.shows) {
  //     this.getShows();
  //   }
  // };

  getShows = () => {
    axios({
      method: "GET",
      url: "/showList",
      params: {},
    })
      .then((response) => {
        console.log("response.data", response.data);

        this.setState({
          shows: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  deleteShow = (event) => {
    axios({
      method: "DELETE",
      url: `/showList/${event}`,
    });
    this.getShows();
  };

  favoriteShow = (event) => {
    console.log("favorited this id", event);

    axios({
      method: "PUT",
      url: `/showList/${event}`,
    });
    // this.getShows();
  };

  render() {
    return (
      <div>
        <List>
          <h3>SHOW LIST</h3>
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
                {/* <ListItemText primary={show.review} /> */}
                <button
                  className="button"
                  onClick={() => {
                    this.favoriteShow(show.showId);
                  }}
                >
                  Favorite
                </button>

                <button
                  className="button"
                  onClick={() => this.deleteShow(show.showId)}
                >
                  Delete
                </button>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ShowList);
