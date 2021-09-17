import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";
import { Box, Button } from '@material-ui/core';
class AddDate extends Component {
  onChangeHandler = (event) => {
    this.props.dispatch({
      type: "SET_DATE",
      payload: event.target.value,
    });
  };

  submitDate = () => {
    this.props.history.push("/addArtist");
  };

  render() {
    return (
      <div>
        <h3>Select Date of the Show You Attended</h3>
        <form>
          <input
            id="dateID"
            className="input"
            placeholder="Date of Show"
            type="date"
            value={this.props.store.date}
            onChange={(event) => this.onChangeHandler(event)}
           
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
                  onClick={this.submitDate} >
          Submit Date
        </Button>
      </div>
    </Box> 
   
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddDate));
