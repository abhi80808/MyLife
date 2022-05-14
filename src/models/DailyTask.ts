import { Task } from "./Task";

export interface DailyTask {
    title:     string;
    date:      Date;
    tasks:     Task[];
    createdAt: Date;
    updatedAt: Date;
    id:        number;
}