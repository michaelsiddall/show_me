import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* searchVenue(action) {
  console.log("in searchVenue Saga");
  console.log(JSON.stringify(action));

  // get request to server to search venue on SongKick
  let response = yield axios({
    method: "GET",
    url: "/venue",
    params: { query: action.payload.search },
  });
  // http://localhost:5000/search?q=deerhunter

  //Sending to reducer we will create
  yield put({
    type: "SET_VENUE",
    payload: response.data,
  });
}
function* venuesSaga() {
  yield takeLatest("SEARCH_VENUE", searchVenue);
}

export default venuesSaga;
