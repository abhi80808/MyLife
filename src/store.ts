import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "./reducers/auth.reducer";
import rootSaga from "./saga/root.saga";

const reducer = combineReducers({
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware({});

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(sagaMiddleware)
    : composeWithDevTools(applyMiddleware(sagaMiddleware));

export type AppState = ReturnType<typeof store.getState>;

export const store = createStore(reducer, devTools);

sagaMiddleware.run(rootSaga);

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;