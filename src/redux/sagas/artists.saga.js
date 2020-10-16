import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addArtist(action) {
  console.log("in addArtist Saga", action.payload);
  yield axios({
    method: "POST",
    url: "/search",
    data: action.payload,
  });
}

function* searchArtist(action) {
  console.log("in searchArtist Saga");
  // get request to server to search artist on Spotify
  let response = yield axios({
    method: "GET",
    url: "/search",
    params: { q: action.payload.search },
  });
  //Sending to reducer we will create
  yield put({
    type: "SET_ARTIST",
    payload: response.data,
  });
}

function* artistsSaga() {
  yield takeLatest("SEARCH_ARTIST", searchArtist);
  yield takeLatest("ADD_ARTIST", addArtist);
}

export default artistsSaga;
