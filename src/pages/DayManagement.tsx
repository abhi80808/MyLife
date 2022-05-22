import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { axiosRequest, axiosResponse } from '../axios/axios';
import { BASE_URL } from '../constants/constants';
import { DayManagement } from '../models/DayManagement';

interface Props { }

const DayManagementPage: FC<Props> = (props) => {

    const [dayManagement, setDayManagement] = useState<DayManagement>();

    useEffect(() => {
        const getUser = async () => {
            axiosRequest();
            axiosResponse();
            await axios.get(BASE_URL + "/dayManagement").then((response) => {
                setDayManagement(response.data);
            }).catch((err) => {
                console.log(err);
            });
        }

        getUser();
    }, []);

    const handleUpdateCompletionStatus = async (dailyTaskId: Number, taskSNo: Number, completionStatus: boolean, dailyTaskKey: number, taskKey: number) => {
        if (dayManagement) {
            dayManagement.dailyTasks[dailyTaskKey].tasks[taskKey].completionStatus = completionStatus
            setDayManagement({ ...dayManagement });
        }
        axiosRequest();
        axiosResponse();
        await axios.put(BASE_URL + "/dailytask/updateCompletionStatus", null, {
            params: {
                dailyTaskId,
                taskSNo,
                completionStatus
            }
        }).then((response) => {
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateRemarks = async(remarks: string, dailyTaskKey: number, taskKey: number) => {
        if(dayManagement) {
            dayManagement.dailyTasks[dailyTaskKey].tasks[taskKey].remarks = remarks;
            setDayManagement({ ...dayManagement });
        }
    }

    const handleUpdateRemarks = async(dailyTaskId: Number, taskSNo: Number, dailyTaskKey: number, taskKey: number) => {
        const remarks = dayManagement?.dailyTasks[dailyTaskKey].tasks[taskKey].remarks;
        axiosRequest();
        axiosResponse();
        await axios.put(BASE_URL + "/dailyTask/updateRemarks", null, {
            params: {
                dailyTaskId,
                taskSNo,
                remarks
            }
        }).then((response) => {}).catch((err) => {console.log(err)});
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-orange-300 to-pink-300">
            {dayManagement?.dailyTasks.map((dailyTask, dailyTaskKey) => {
                return (
                    <div key={dailyTaskKey} className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <span className="text-xl font-bold">{dailyTask.title}</span>
                            <span className="text-sm">{dailyTask.date.toString().substring(0, 10)}</span>
                        </div>
                        {dailyTask.tasks.map((task, taskKey) => {
                            return (
                                <div key={taskKey} className={`flex flex-row items-center justify-center ${task.completionStatus ? "bg-green-400" : "bg-red-400"}`}>
                                    <input type="checkbox" defaultChecked={task.completionStatus} onChange={() => handleUpdateCompletionStatus(dailyTask.id, task.sNo, !task.completionStatus, dailyTaskKey, taskKey)} />
                                    <span>{task.sNo}</span>
                                    <span>{task.task}</span>
                                    <textarea value={task.remarks} onChange={(e) => updateRemarks(e.target.value, dailyTaskKey, taskKey)} />
                                    <button className="border border-black px-1" onClick={() => handleUpdateRemarks(dailyTask.id, task.sNo, dailyTaskKey, taskKey)}>Save Remarks</button>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default DayManagementPage;