import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addVenues(action) {
  // console.log("in addVenues Saga", action.payload);
  yield axios({
    method: "POST",
    url: "/venues",
    data: action.payload,
  });
}

function* searchVenues(action) {
  // get request to server to search venue on SongKick
  let response = yield axios({
    method: "GET",
    url: "/venues",
    params: { query: action.payload.search },
  });

  //Sending to reducer we will create
  yield put({
    type: "SET_VENUE",
    payload: response.data,
  });
}

function* fetchVenues(action) {
  let response = yield axios({
    method: "GET",
    url: "/venuesList",
  });
  yield put({
    type: "GET_VENUES",
    payload: response.data,
  });
}

function* venuesSaga() {
  yield takeLatest("SEARCH_VENUE", searchVenues);
  yield takeLatest("ADD_VENUE", addVenues);
  yield takeLatest("FETCH_VENUES", fetchVenues);
}

export default venuesSaga;
