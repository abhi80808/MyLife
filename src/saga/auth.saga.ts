import { all, call,  takeEvery } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { ME_LOGIN } from "../actions/actions.constants";
import { login } from "../apis/auth.api";
import { LS_AUTH_TOKEN } from "../constants/constants";
// import { fetchUser } from "../apis/auth.api";

function* meLogin(action: AnyAction): Generator<any> {
    // yield put(meAuthErrorMessageAction(""));
    // yield put(meFormSubmittingStatus(true));
    try {
        const loginResponse: any = yield call(login, action.payload);
        localStorage.setItem(LS_AUTH_TOKEN, loginResponse.data.access_token);
        window.location.href = "/register";
    } catch (error) {
        // yield put(meAuthErrorMessageAction("Invalid Credentials"));
        // yield put(meFormSubmittingStatus(false));
    }
}
export function* watchMeSendingData() {
  yield all([
    takeEvery(ME_LOGIN, meLogin),
    // takeEvery(ME_FETCH_USER, meFetchUser),
  ]);
}