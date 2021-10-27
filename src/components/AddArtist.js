import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Box, Button } from '@material-ui/core';
class AddArtist extends Component {
  state = {
    search: "",
  };

  searchArtist = () => {
    this.props.dispatch({
      type: "SEARCH_ARTIST",
      payload: this.state,
    });
  };

  onChange = (event, propertyName) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  addArtist = (spotifyId, name) => {
    this.props.dispatch({
      type: "SET_SPOTIFY_ID",
      payload: spotifyId,name
    });
    this.props.history.push("/addVenue");
  };

  onNext = () => {
    this.props.history.push("/addVenue");
  };

  render() {
    return (
      <div>
        <img
          className="spotify"
          src="images/Spotify_Icon_CMYK_Green.png"
          alt="spotify"
          height="50px"
          width="50px"
        ></img>
        <h4>powered by Spotify</h4>

        <h3>Artist Search</h3>
        <input
          className="input"
          placeholder="Enter artist to search"
          type="text"
          value={this.state.search}
          onChange={(event) => this.onChange(event, "search")}
        ></input>
         <Box  sx={{'& button': { m: 1 } }}>
      <div>
        <Button size="large" 
                variant="contained" 
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:"center",
                    margin: '0 auto'
                    }} 
                onClick={this.searchArtist} >
           Search{" "}
        </Button>
      </div>
    </Box> 
    
        <List>
          <h3>Click on an Artist to Submit</h3>
          {this.props.store.artists.map((artist) => {
            const labelId = `checkbox-list-secondary-label-${artist.spotifyId}`;
            return (
              <ListItem
                key={labelId}
                button
                onClick={() => this.addArtist(artist.spotifyId, artist.name)}
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

export default connect(mapStoreToProps)(withRouter(AddArtist));
