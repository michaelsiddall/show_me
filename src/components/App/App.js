import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import AddArtist from "../AddArtist";
import AddVenue from "../AddVenue";
import AddShow from "../AddShow";
import AddDate from "../AddDate";
import AddReview from "../AddReview";
import FavoriteList from "../FavoriteList";
import ShowDetails from "../ShowDetails";
import "fontsource-roboto";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/showDetails" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/showDetails"
              component={ShowDetails}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/showDetails"
            />
            <ProtectedRoute
              exact
              path="/home"
              component={LandingPage}
              authRedirect="/user"
            />

            <ProtectedRoute exact path="/addArtist" component={AddArtist} />
            <ProtectedRoute exact path="/addVenue" component={AddVenue} />
            <ProtectedRoute exact path="/addShow" component={AddShow} />
            <ProtectedRoute exact path="/addDate" component={AddDate} />
            <ProtectedRoute exact path="/showDetails" component={ShowDetails} />
            <ProtectedRoute exact path="/addReview" component={AddReview} />
            <ProtectedRoute exact path="/favorite" component={FavoriteList} />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
