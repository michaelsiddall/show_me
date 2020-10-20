import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./../redux/mapStoreToProps";
import axios from "axios";
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

  render() {
    console.log(this.state.shows);

    return (
      <div>
        <h1>Show List</h1>
        <ul>
          {this.state.shows.map((show, i) => (
            <li key={i}>{show}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ShowList);
