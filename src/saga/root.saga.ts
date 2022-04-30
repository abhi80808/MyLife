import { all, fork } from "redux-saga/effects";
import { watchMeSendingData } from "./auth.saga";

function* rootSaga() {
  yield all([
    fork(watchMeSendingData),
  ]);
}

export default rootSaga;