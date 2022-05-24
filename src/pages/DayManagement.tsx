import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { axiosRequest, axiosResponse } from '../axios/axios';
import CreateDailyTask from '../components/CreateDailyTask';
import { BASE_URL } from '../constants/constants';
import { DailyTask } from '../models/DailyTask';
import { getCurrentDate } from '../utils/Dates';

interface Props { }

const DayManagementPage: FC<Props> = (props) => {

    const [dailyTasks, setDailyTasks] = useState<DailyTask[]>();
    const [createTaskFormDialogBox, setCreateTaskFormDialogBox] = useState(false);
    const [startDate, setStartDate] = useState(getCurrentDate('-'));
    const [endDate, setEndDate] = useState(getCurrentDate('-'));

    useEffect(() => {
        const getUser = async () => {
            axiosRequest();
            axiosResponse();
            await axios.get(BASE_URL + "/dailyTasks", { params: { startDate: startDate, endDate: endDate } }).then((response) => {
                setDailyTasks(response.data);
            }).catch((err) => {
                console.log(err);
            });
        }

        getUser();
    }, [startDate, endDate]);

    const handleUpdateCompletionStatus = async (dailyTaskId: Number, taskSNo: Number, completionStatus: boolean, dailyTaskKey: number, taskKey: number) => {
        if (dailyTasks) {
            dailyTasks[dailyTaskKey].tasks[taskKey].completionStatus = completionStatus
            setDailyTasks([...dailyTasks]);
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

    const updateRemarks = async (remarks: string, dailyTaskKey: number, taskKey: number) => {
        if (dailyTasks) {
            dailyTasks[dailyTaskKey].tasks[taskKey].remarks = remarks;
            setDailyTasks([...dailyTasks]);
        }
    }

    const handleUpdateRemarks = async (dailyTaskId: Number, taskSNo: Number, dailyTaskKey: number, taskKey: number) => {
        const remarks = dailyTasks![dailyTaskKey].tasks[taskKey].remarks;
        axiosRequest();
        axiosResponse();
        await axios.put(BASE_URL + "/dailyTask/updateRemarks", null, {
            params: {
                dailyTaskId,
                taskSNo,
                remarks
            }
        }).then((response) => { }).catch((err) => { console.log(err) });
    }

    return (
        <div className="p-2 flex flex-row space-x-2 min-h-screen max-h-max justify-center bg-gradient-to-r from-orange-300 to-pink-300">
            <CreateDailyTask className={`${createTaskFormDialogBox ? "absolute self-center" : "hidden"}`} setCreateTaskFormDialogBox={setCreateTaskFormDialogBox}></CreateDailyTask>
            <div className="border-2 p-2 rounded-sm flex flex-col space-y-3 w-1/4">
                <button type="button" className="border border-black bg-green-400 p-2 rounded-md text-sm" onClick={() => setCreateTaskFormDialogBox(true)}>Create Daily Task</button>
                <div className="flex flex-col space-y-1.5">
                    <label className="font-bold text-lg">Filters:</label>
                    <div className="flex flex-col space-y-0.5">
                        <input className="outline-none p-0.5" type="date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                        <input className="outline-none p-0.5" type="date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                    </div>
                </div>
            </div>
            <div className="w-3/4 border rounded-sm p-2 flex flex-col space-y-2">
                {dailyTasks && dailyTasks.map((dailyTask, dailyTaskKey) => {
                    return (
                        <div key={dailyTaskKey} className="border rounded-sm px-1.5 pb-1.5 flex flex-col space-y-1">
                            <div className="flex flex-row items-center justify-between">
                                <span className="text-xl font-bold">{dailyTask.title}</span>
                                <span className="text-sm">{dailyTask.date.toString().substring(0, 10)}</span>
                            </div>
                            {dailyTask.tasks.map((task, taskKey) => {
                                return (
                                    <div key={taskKey} className={`rounded-sm px-2 py-0.5 flex flex-row items-center justify-between ${task.completionStatus ? "bg-green-400" : "bg-red-400"}`}>
                                        <div className="flex flex-row items-center space-x-1">
                                            <input type="checkbox" defaultChecked={task.completionStatus} onChange={() => handleUpdateCompletionStatus(dailyTask.id, task.sNo, !task.completionStatus, dailyTaskKey, taskKey)} />
                                            <span className="font-medium">{task.sNo}.</span>
                                            <span>{task.task}</span>
                                        </div>
                                        <div className="flex flex-row items-center space-x-1">
                                            <textarea className="text-sm h-7 rounded-sm p-0.5" value={task.remarks} onChange={(e) => updateRemarks(e.target.value, dailyTaskKey, taskKey)} />
                                            <button className="border border-black px-1 rounded-sm text-sm text-gray-400 bg-yellow-900" onClick={() => handleUpdateRemarks(dailyTask.id, task.sNo, dailyTaskKey, taskKey)}>Save Remarks</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DayManagementPage;
