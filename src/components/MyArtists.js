import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./../redux/mapStoreToProps";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class MyArtists extends Component {
  state = {
    heading: "Class Component",
  };

  render() {
    return (
      <div>
        <List>
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
        </List>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MyArtists);
