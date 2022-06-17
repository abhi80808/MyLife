import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { axiosRequest, axiosResponse } from '../axios/axios';
import CreateDailyTask from '../components/CreateDailyTask';
import { BASE_URL } from '../constants/constants';
import { DailyTask } from '../models/DailyTask';
import { getCurrentDate } from '../utils/Dates';
import { GiCrossMark } from 'react-icons/gi';
import { ImBin } from 'react-icons/im';

interface Props { }

const DayManagementPage: FC<Props> = (props) => {

    const [dailyTasks, setDailyTasks] = useState<DailyTask[]>();
    const [createTaskFormDialogBox, setCreateTaskFormDialogBox] = useState(false);
    const [startDate, setStartDate] = useState(getCurrentDate('-'));
    const [endDate, setEndDate] = useState(getCurrentDate('-'));
    const [showSidebar, setShowSidebar] = useState(false);

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

    const handleDeleteDailyTasks = async (dailyTaskId: number, dailyTaskKey: number) => {
        if(!window.confirm("Are you sure you want to delete this goal?")) return;
        if (dailyTasks) {
            dailyTasks.splice(dailyTaskKey, 1);
            setDailyTasks([...dailyTasks]);
        }
        axiosRequest();
        axiosResponse();
        await axios.delete(BASE_URL + "/dailyTasks", { params: { dailyTaskId } }).then((response) => { }).catch((err) => { console.log(err) });
    }

    return (
        <div>
            <button className="border-r p-2 rounded-r-full absolute self-center" onClick={() => setShowSidebar(!showSidebar)}>&gt;</button>
            <div className="flex flex-row min-h-screen max-h-max bg-gradient-to-r from-orange-300 to-pink-300" onClick={() => { setShowSidebar(false) }}>
                <CreateDailyTask className={`${createTaskFormDialogBox ? "absolute" : "hidden"}`} setCreateTaskFormDialogBox={setCreateTaskFormDialogBox}></CreateDailyTask>
                <div className={`${showSidebar ? "flex absolute" : "hidden"} border-2 p-2 rounded-sm flex-col space-y-3 w-3/4 bg-white`} onClick={(event) => event.stopPropagation()}>
                    <button className="justify-self-end self-end" onClick={() => setShowSidebar(false)}><GiCrossMark></GiCrossMark></button>
                    <button type="button" className="border border-black bg-green-400 p-2 rounded-md text-sm" onClick={() => { setShowSidebar(false); setCreateTaskFormDialogBox(true); }}>Create Daily Task</button>
                    <div className="flex flex-col space-y-1.5">
                        {/* <label className="font-bold text-lg">Sort By:</label>
                        <select>
                            <option value="title">Title</option>
                            <option value="date">Date</option>
                            <option value="taskCount">Task Count</option>
                        </select> */}
                        <label className="font-bold text-lg">Filters:</label>
                        <div className="flex flex-col space-y-0.5">
                            <label className="flex flex-row justify-between items-center">
                                <span className="text-sm">Start Date:</span>
                                <input className="outline-none p-0.5" type="date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                            </label>
                            <label className="flex flex-row justify-between items-center">
                                <span className="text-sm">End Date:</span>
                                <input className="outline-none p-0.5" type="date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="border rounded-sm p-2 flex flex-col space-y-2 w-full">
                    {dailyTasks && dailyTasks.map((dailyTask, dailyTaskKey) => {
                        return (
                            <div key={dailyTaskKey} className="border rounded-sm p-1.5 flex flex-col space-y-1">
                                <div className="flex flex-row items-center justify-between space-x-1">
                                    <div className="flex flex-row space-x-3 overflow-y-auto">
                                        <span className="text-xl font-bold overflow-y-auto">{dailyTask.title}</span>
                                        <button onClick={(e) => handleDeleteDailyTasks(dailyTask.id, dailyTaskKey)}><ImBin className="fill-red-700 h-5 w-5"></ImBin></button>
                                    </div>
                                    <span className="text-sm min-w-max">{dailyTask.date.toString().substring(0, 10)}</span>
                                </div>
                                {dailyTask.tasks.map((task, taskKey) => {
                                    return (
                                        <div key={taskKey} className={`rounded-sm px-2 py-0.5 flex flex-col mb:flex-row mb:space-x-1.5 items-start mb:items-center justify-between ${task.completionStatus ? "bg-green-400" : "bg-red-400"}`}>
                                            <div className="flex flex-row items-center justify-center space-x-1 w-full">
                                                <input type="checkbox" defaultChecked={task.completionStatus} onChange={() => handleUpdateCompletionStatus(dailyTask.id, task.sNo, !task.completionStatus, dailyTaskKey, taskKey)} />
                                                <span className="font-medium">{task.sNo}.</span>
                                                <span className="overflow-y-auto w-full">{task.task}</span>
                                            </div>
                                            <div className="flex flex-row justify-between w-full items-center space-x-1 mb:w-1/2">
                                                <textarea className="text-sm h-7 rounded-sm p-0.5 w-full" value={task.remarks} onChange={(e) => updateRemarks(e.target.value, dailyTaskKey, taskKey)} />
                                                <button className="border border-black px-0.5 mb:px-1 rounded-sm text-xs mb:text-sm text-gray-400 bg-yellow-900" onClick={() => handleUpdateRemarks(dailyTask.id, task.sNo, dailyTaskKey, taskKey)}>Save Remarks</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default DayManagementPage;
