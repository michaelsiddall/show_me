import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";
import { Box, Button } from '@material-ui/core';
class Reviews extends Component {
  state = {
    review: "",
  };

  onChangeHandler = (event) => {
    this.setState({
      review: event.target.value,
    });
  };

  onSubmit = () => {
    this.props.dispatch({
      type: "SET_REVIEW",
      payload: this.state.review,
    });
    this.props.history.push("/addShow");
  };

  render() {
    return (
      <div>
        <div>
          <label>
            <h3>Show Review...</h3>
            <h5>the good, bad, and the ugly</h5>
            <textarea
              style={{ width: 400, height: 200 }}
              onChange={(event) => this.onChangeHandler(event, "review")}
            />
          </label>
        </div>
        <div>
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
       Submit
        </Button>
      </div>
    </Box>
    
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(Reviews));
