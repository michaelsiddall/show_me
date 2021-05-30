import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./../redux/mapStoreToProps";
import axios from "axios";
import List from "@material-ui/core/List";

import ShowItem from "./ShowItem/ShowItem";
import swal from "sweetalert";

class ShowDetails extends Component {
  state = {
    shows: [],
  };

  componentDidMount = () => {
    this.getShows();
  };

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
    window.location.reload();
  };

  favoriteShow = (event) => {
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
          <h2>SHOW LIST</h2>
          {this.state.shows.map((show) => {
            return (
              <>
                <ShowItem show={show} />

                <button
                  className="button"
                  onClick={() => {
                    this.favoriteShow(show.showId);
                    swal("This show has been added to your Favorites List");
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
