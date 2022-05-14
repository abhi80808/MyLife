import { DailyTask } from "./DailyTask";

export interface DayManagement {
    dailyTasks: DailyTask[];
    createdAt: Date;
    updatedAt: Date;
    id: number;
}