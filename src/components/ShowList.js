import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./../redux/mapStoreToProps";
import axios from "axios";

class ShowList extends Component {
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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return <div></div>;
  }
}

export default connect(mapStoreToProps)(ShowList);
