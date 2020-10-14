import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* searchArtist(action) {
  console.log("in searchArtist Saga");
  console.log(JSON.stringify(action));

  // get request to server to search artist on Spotify
  let response = yield axios({
    method: "GET",
    url: "/search",
    params: { q: action.payload.search },
  });
  // http://localhost:5000/search?q=deerhunter

  //Sending to reducer we will create
  yield put({
    type: "SET_ARTIST",
    payload: response.data,
  });
}
function* artistSaga() {
  yield takeLatest("SEARCH_ARTIST", searchArtist);
}

export default artistSaga;
