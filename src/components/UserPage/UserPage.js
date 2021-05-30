import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";

class UserPage extends Component {
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
