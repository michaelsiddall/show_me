import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";
import axios from "axios";
import swal from "sweetalert";
import { Box, Button } from '@material-ui/core';
class AddShow extends Component {
  onSubmit = () => {
    axios({
      method: "POST",
      url: "/saveConcert",
      data: {
        date: this.props.store.date,
        spotifyId: this.props.store.spotifyId,
        songKickId: this.props.store.songKickId,
        review: this.props.store.review,
      },
    })
      .then((response) => {
        swal({
          text: "Your show has been saved!",
          button: { className: "sweet-warning" },
        });
        this.props.history.push("/showDetails");
      })
      .catch((err) => {
        console.log(err);
        swal({ text: "Your show failed to save.  Please start over" });
      });
      console.log('artist name', this.props.store.artists);
      
  }; //end function


  
  render() {
    return (
      <div>
      {Date(this.props.store.date)}
      {this.props.store.name}
      {this.props.store.review}
        <Box sx={{ '& button': { m: 1 } }}>
      <div>
      
        <Button size="large" 
                variant="contained" 
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:"center",
                    margin: '0 auto'
                    }} 
                  onClick={this.onSubmit} >
     Save Your Show!
        </Button>
      </div>
    </Box>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddShow));
