import { Fund } from "./Fund";

export interface Finance {
    funds: Fund[];
    createdAt: Date;
    updatedAt: Date;
    id: number;
}

export interface NetWorthResponse {
    net_worth: string;
    funds: Fund[];
}