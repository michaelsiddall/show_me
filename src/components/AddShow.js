import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./../redux/mapStoreToProps";

class AddShow extends Component {
  state = {
    search: "",
  };
  onChangeHandler = (event, propertyName) => {
    console.log("we are changing", propertyName);
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };
  addShow = (event) => {
    event.preventDefault();
    console.log("Current State:", this.state);
    this.props.dispatch({
      type: "ADD_SHOW",
      payload: this.state,
    });
  };

  searchArtist = () => {
    console.log("Current State:", this.state);
    this.props.dispatch({
      type: "SEARCH_ARTIST",
      payload: this.state,
    });
  };

  componentDidMount() {
    // this.getShelf()
  }

  render() {
    console.log("Updated state:", this.state);
    return (
      <div>
        <p>Info Page</p>

        <form onSubmit={this.addItem}>
          <input
            placeholder="Date of Show"
            type="date"
            value={this.state.date}
            onChange={(event) => this.onChangeHandler(event, "date")}
          ></input>
          {"   "}
          <br />
          <input
            placeholder="Artist"
            type="text"
            value={this.props.store.artist.name}
            onChange={(event) => this.onChangeHandler(event, "Artist")}
          ></input>
          <button onClick={this.searchArtist}>Search Artist</button>
          {"   "}
          <br />
          <input
            placeholder="Genre"
            type="text"
            value={this.props.store.artist.genre}
            // onChange={(event) => this.onChangeHandler(event, "Artist")}
          ></input>

          <button>Save Item</button>
        </form>

        {/* {this.props.store.shelf.setShelfItem.map((item) => (
            <InfoItem key={item.id} item={item} getShelf={this.getShelf}/>
          ))}
         */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddShow);
