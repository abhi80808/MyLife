import { Finance } from "./Finance";

export interface User {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    email: string; 
    finance: Finance;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    me: User;
}