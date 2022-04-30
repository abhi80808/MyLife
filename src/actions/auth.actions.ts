import { LoginRequest } from "../models/User";
import {
    ME_LOGIN
} from "./actions.constants";

// export const meFetchUserAction = () => ({
//   type: ME_FETCH_USER,
// });

export const meLoginAction = (data: LoginRequest) => ({ type: ME_LOGIN, payload: data });


// export const meIsLoading = (status: boolean) => ({
//   type: ME_LOADING,
//   payload: status,
// });

// export const meLoadingError = (message: string) => ({
//   type: ME_LOADING_ERROR,
//   payload: message,
// });