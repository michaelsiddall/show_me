import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from './../redux/mapStoreToProps';
import axios from 'axios';
import List from '@material-ui/core/List';

import ShowItem from './ShowItem/ShowItem';

class FavoriteList extends Component {
  state = {
    shows: [],
  };

  componentDidMount = () => {
    console.log('in componentDidMount');
    this.getShows();
  };

  getShows = () => {
    axios({
      method: 'GET',
      url: '/showList',
      params: {
        favorite: true,
      },
    })
      .then((response) => {
        console.log('response.data', response.data);

        this.setState({
          shows: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  deleteShow = (event) => {
    axios({
      method: 'DELETE',
      url: `/showList/${event}`,
    });
    this.getShows();
  };

  render() {
    return (
      <div>
        <List>
          <h3>FAVORITE LIST</h3>
          {this.state.shows.map((show) => {
            const labelId = `checkbox-list-secondary-label-${show.showId}`;
            return (
              <>
                <ShowItem show={show} />

                <button
                  className='button'
                  onClick={() => this.deleteShow(show.showId)}
                >
                  Delete
                </button>
              </>
            );
          })}
        </List>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(FavoriteList);
