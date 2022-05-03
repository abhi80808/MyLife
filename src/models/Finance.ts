import { Fund } from "./Fund";

export interface Finance {
    funds:     Fund[];
    createdAt: Date;
    updatedAt: Date;
    id:        number;
}
