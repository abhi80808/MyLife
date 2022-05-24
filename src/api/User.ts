import axios from "axios";
import { axiosRequest, axiosResponse } from "../axios/axios";
import { BASE_URL, LS_AUTH_TOKEN } from "../constants/constants";

axiosRequest();
axiosResponse();

export const login = async (values: any) => {
    await axios.post(BASE_URL + "/login", values).then((response) => {
        localStorage.setItem(LS_AUTH_TOKEN, response.data.token);
        window.location.href = "/dashboard";
    }).catch((err) => {
        console.log(err);
    });
}

export const signup = async (values: any) => {
    axios.post(BASE_URL + "/signup", values).then((response) => {
        // localStorage.setItem('auth_token', response.data.token);
        // console.log(response);
        window.location.href = "/login";
      }).catch((err) => {
        console.log(err);
      });
}

export const me = async () => {
    return await axios.get(BASE_URL + "/me").then((response) => {
        return response.data;
    }).catch((err) => {
        console.log(err);
    });
}