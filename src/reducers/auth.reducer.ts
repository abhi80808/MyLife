import { Reducer } from "redux";
import { ME_LOGIN } from "../actions/actions.constants";
import { User } from "../models/User";
import { EntityState, initialEntityState } from "./entity.reducer";

export interface AuthState extends EntityState<User> {
    id?: number;
}

const initialState = {
    ...initialEntityState
}

export const authReducer: Reducer<AuthState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ME_LOGIN: return state;
        default:
            return state;
    }
}