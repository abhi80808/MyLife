import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { axiosRequest, axiosResponse } from '../axios/axios';
import { BASE_URL } from '../constants/constants';
import { getCurrentDate } from '../utils/Dates';
import { GiCrossMark } from 'react-icons/gi';
import { GoalManagement } from '../models/GoalManagement';
import { Goal } from '../models/Goal';
import { ImBin } from 'react-icons/im';
import CreateGoal from '../components/CreateGoal';

interface Props { }

const GoalManagementPage: FC<Props> = (props) => {

    const [goalManagement, setGoalManagement] = useState<GoalManagement>();
    const [createGoalFormDialogBox, setCreateGoalFormDialogBox] = useState(false);
    const [startDate, setStartDate] = useState(getCurrentDate('-'));
    const [endDate, setEndDate] = useState(getCurrentDate('-'));
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            axiosRequest();
            axiosResponse();
            await axios.get(BASE_URL + "/goals").then((response) => {
                setGoalManagement(response.data);
            }).catch((err) => {
                console.log(err);
            });
        }

        getUser();
    }, [startDate, endDate]);

    const handleUpdateCompletionStatus = async (goalId: Number, completionStatus: boolean, goalType: string, goalKey: number) => {
        if (goalManagement) {
            ((goalManagement[goalType as keyof typeof goalManagement] as Goal[])[goalKey]).completionStatus = completionStatus;
            setGoalManagement({ ...goalManagement })
        }
        axiosRequest();
        axiosResponse();
        await axios.put(BASE_URL + "/goals/updateCompletionStatus", null, {
            params: {
                goalId,
                completionStatus
            }
        }).then((response) => {
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateRemarks = async (remarks: string, goalType: string, goalKey: number) => {
        if (goalManagement) {
            (goalManagement[goalType as keyof typeof goalManagement] as Goal[])[goalKey].remarks = remarks;
            setGoalManagement({ ...goalManagement });
        }
    }

    const handleUpdateRemarks = async (goalId: Number, goalType: string, goalKey: number) => {
        const remarks = (goalManagement![goalType as keyof typeof goalManagement] as Goal[])[goalKey].remarks;
        axiosRequest();
        axiosResponse();
        await axios.put(BASE_URL + "/goals/updateRemarks", null, {
            params: {
                goalId,
                remarks
            }
        }).then((response) => { }).catch((err) => { console.log(err) });
    }

    const handleDeleteGoals = async (goalId: Number, goalType: string, goalKey: number) => {
        if(!window.confirm("Are you sure you want to delete this goal?")) return;
        if (goalManagement) {
            (goalManagement[goalType as keyof typeof goalManagement] as Goal[]).splice(goalKey, 1);
            setGoalManagement({ ...goalManagement });
        }
        axiosRequest();
        axiosResponse();
        await axios.delete(BASE_URL + "/goals", {
            params: { goalId, goalType }
        }).then((response) => { }).catch((err) => { console.log(err) });
    }

    return (
        <div>
            <button className="border-r p-2 rounded-r-full absolute self-center" onClick={() => setShowSidebar(!showSidebar)}>&gt;</button>
            <div className="flex flex-row min-h-screen max-h-max bg-gradient-to-r from-orange-300 to-pink-300" onClick={() => { setShowSidebar(false) }}>
                <CreateGoal className={`${createGoalFormDialogBox ? "absolute" : "hidden"}`} setCreateGoalFormDialogBox={setCreateGoalFormDialogBox}></CreateGoal>
                <div className={`${showSidebar ? "flex absolute" : "hidden"} border-2 p-2 rounded-sm flex-col space-y-3 w-3/4 bg-white`} onClick={(event) => event.stopPropagation()}>
                    <button className="justify-self-end self-end" onClick={() => setShowSidebar(false)}><GiCrossMark></GiCrossMark></button>
                    <button type="button" className="border border-black bg-green-400 p-2 rounded-md text-sm" onClick={() => { setShowSidebar(false); setCreateGoalFormDialogBox(true); }}>Create Goal</button>
                    <div className="flex flex-col space-y-1.5">
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
                    <span className='font-extrabold text-lg'>Short-Term Goals</span>
                    {goalManagement && goalManagement.shortTerm.map((shortTerm, shortTermKey) => {
                        return (
                            <div key={shortTermKey} className={`${shortTerm.completionStatus ? "bg-green-400" : ""} border rounded-sm p-1.5 flex flex-row items-center justify-between space-x-1`}>
                                <div className='flex flex-row space-x-3 items-center'>
                                    <input type="checkbox" defaultChecked={shortTerm.completionStatus} onChange={() => handleUpdateCompletionStatus(shortTerm.id, !shortTerm.completionStatus, "shortTerm", shortTermKey)} />
                                    <div className='flex flex-col'>
                                        <span className="text-xl font-bold overflow-y-auto">{shortTerm.title}</span>
                                        <span className="text-sm min-w-max">{shortTerm.deadline.toString().substring(0, 10)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-full items-center space-x-1 mb:w-1/2">
                                    <textarea className="text-sm h-7 rounded-sm p-0.5 w-full" value={shortTerm.remarks} onChange={(e) => updateRemarks(e.target.value, "shortTerm", shortTermKey)} />
                                    <button className="border border-black px-0.5 mb:px-1 rounded-sm text-xs mb:text-sm text-gray-400 bg-yellow-900" onClick={() => handleUpdateRemarks(shortTerm.id, "shortTerm", shortTermKey)}>Save Remarks</button>
                                    <button onClick={(e) => { handleDeleteGoals(shortTerm.id, "shortTerm", shortTermKey) }}><ImBin className="fill-red-700 h-5 w-10"></ImBin></button>
                                </div>
                            </div>
                        );
                    })}

                    <span className='font-extrabold text-lg'>Mid-Term Goals</span>
                    {goalManagement && goalManagement.midTerm.map((midTerm, midTermKey) => {
                        return (
                            <div key={midTermKey} className={`${midTerm.completionStatus ? "bg-green-400" : ""} border rounded-sm p-1.5 flex flex-row items-center justify-between space-x-1`}>
                                <div className='flex flex-row space-x-3 items-center'>
                                    <input type="checkbox" defaultChecked={midTerm.completionStatus} onChange={() => handleUpdateCompletionStatus(midTerm.id, !midTerm.completionStatus, "midTerm", midTermKey)} />
                                    <div className='flex flex-col'>
                                        <span className="text-xl font-bold overflow-y-auto">{midTerm.title}</span>
                                        <span className="text-sm min-w-max">{midTerm.deadline.toString().substring(0, 10)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-full items-center space-x-1 mb:w-1/2">
                                    <textarea className="text-sm h-7 rounded-sm p-0.5 w-full" value={midTerm.remarks} onChange={(e) => updateRemarks(e.target.value, "midTerm", midTermKey)} />
                                    <button className="border border-black px-0.5 mb:px-1 rounded-sm text-xs mb:text-sm text-gray-400 bg-yellow-900" onClick={() => handleUpdateRemarks(midTerm.id, "midTerm", midTermKey)}>Save Remarks</button>
                                    <button onClick={(e) => { handleDeleteGoals(midTerm.id, "midTerm", midTermKey) }}><ImBin className="fill-red-700 h-5 w-10"></ImBin></button>
                                </div>
                            </div>
                        );
                    })}

                    <span className='font-extrabold text-lg'>Long-Term Goals</span>
                    {goalManagement && goalManagement.longTerm.map((longTerm, longTermKey) => {
                        return (
                            <div key={longTermKey} className={`${longTerm.completionStatus ? "bg-green-400" : ""} border rounded-sm p-1.5 flex flex-row items-center justify-between space-x-1`}>
                                <div className='flex flex-row space-x-3 items-center'>
                                    <input type="checkbox" defaultChecked={longTerm.completionStatus} onChange={() => handleUpdateCompletionStatus(longTerm.id, !longTerm.completionStatus, "longTerm", longTermKey)} />
                                    <div className='flex flex-col'>
                                        <span className="text-xl font-bold overflow-y-auto">{longTerm.title}</span>
                                        <span className="text-sm min-w-max">{longTerm.deadline.toString().substring(0, 10)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-full items-center space-x-1 mb:w-1/2">
                                    <textarea className="text-sm h-7 rounded-sm p-0.5 w-full" value={longTerm.remarks} onChange={(e) => updateRemarks(e.target.value, "longTerm", longTermKey)} />
                                    <button className="border border-black px-0.5 mb:px-1 rounded-sm text-xs mb:text-sm text-gray-400 bg-yellow-900" onClick={() => handleUpdateRemarks(longTerm.id, "longTerm", longTermKey)}>Save Remarks</button>
                                    <button onClick={(e) => { handleDeleteGoals(longTerm.id, "longTerm", longTermKey) }}><ImBin className="fill-red-700 h-5 w-10"></ImBin></button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default GoalManagementPage;
