import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Reviews extends Component {
  state = {
    review: "",
  };

  onChangeHandler = (event) => {
    console.log("e.t.v is", event.target.value);
    console.log("this.state.review", this.state.review);
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
            <div>Show Review...the good, bad, and the ugly</div>

            <textarea
              style={{ width: 300, height: 150 }}
              onChange={(event) => this.onChangeHandler(event, "review")}
            />
          </label>
        </div>
        <div>
          <button onClick={this.onSubmit}>Submit!</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(Reviews));
