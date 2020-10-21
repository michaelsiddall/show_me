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
    console.log("payload is", event.target.value);
    console.log("this.props.store.review is", this.props.store.review);
    this.props.dispatch({
      type: "SET_REVIEW",
      payload: event.target.value,
    });
  };

  onNext = () => {
    console.log("this.props.history", this.props.history);
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
