import { Finance } from "./Finance";

export interface User {
    username:   string;
    email:      string;
    firstName:  string;
    middleName: string;
    lastName:   string;
    finance:    Finance;
    createdAt:  Date;
    updatedAt:  Date;
    id:         number;
}