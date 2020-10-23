import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./../redux/mapStoreToProps";
import axios from "axios";
import List from "@material-ui/core/List";

import ShowItem from "./ShowItem/ShowItem";

class ShowDetails extends Component {
  state = {
    shows: [],
  };

  componentDidMount = () => {
    console.log("in componentDidMount");
    this.getShows();
  };

  //   componentDidUpdate = (prevState) => {
  //     if (prevState.shows.length !== this.state.shows.length) {
  //       this.getShows();
  //     }
  //     return;
  //   };

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
    // window.location.reload();
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
            // const labelId = `checkbox-list-secondary-label-${show.showId}`;
            return (
              <>
                <ShowItem show={show} />

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
              </>
            );
          })}
        </List>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ShowDetails);
