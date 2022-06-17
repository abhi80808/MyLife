import { Goal } from "./Goal";

export interface GoalManagement {
    id: number;
    shortTerm: Goal[],
    midTerm: Goal[],
    longTerm: Goal[]
}