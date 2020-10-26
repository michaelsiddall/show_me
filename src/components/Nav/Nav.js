import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";
import "fontsource-roboto";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Nav = (props) => {
  let loginLinkData = {
    path: "/login",
    text: "Login / Register",
  };

  if (props.store.user.id != null) {
    loginLinkData.path = "/login";

    // loginLinkData.text = "Home";
  }

  return (
    <div className="nav">
      <Link to="/showDetails">
        <h2 className="nav-title">Show Me!</h2>
      </Link>

      <div className="nav-right">
        <Link className="nav-link" to="/favorite">
          Favorites
        </Link>
        <Link className="nav-link" to="/showDetails">
          Shows
        </Link>
        <Link className="nav-link" to="/addDate">
          Add Show
        </Link>

        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            {/* <Link className="nav-link" to="/info">
              Info Page
            </Link> */}
            <LogOutButton className="nav-link" />
          </>
        )}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
