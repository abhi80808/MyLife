import axios from 'axios';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { axiosRequest, axiosResponse } from '../axios/axios';
import { BASE_URL } from '../constants/constants';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { getTommorowDate } from '../utils/Dates';
import {GrAddCircle} from 'react-icons/gr';

interface Props {
    className: string,
    setCreateTaskFormDialogBox: Dispatch<SetStateAction<boolean>>
}

const CreateDailyTask: FC<Props> = ({ className, setCreateTaskFormDialogBox }) => {

    const [currentTaskSNo, setCurrentTaskSNo] = useState(2);

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(6, ({ min }) => `Cannot be less than ${min}`)
            .required("Title is required field"),
        date: Yup.string().required("Date is required field"),
        tasks: Yup.array().of(
            Yup.object().shape({
                task: Yup.string().required("Task is required field"),
                sNo: Yup.number().required("Serial Number is required field"),
                remarks: Yup.string()
            })
        ),
    });

    return (
        <div className={`bg-white w-full ${className}`}>
            <div className={`m-1 border border-black p-1 flex flex-col justify-center items-center`}>
                <Formik
                    initialValues={{
                        title: "", date: getTommorowDate('-'), tasks: [{
                            task: "",
                            sNo: 1,
                            remarks: ""
                        }]
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        axiosRequest();
                        axiosResponse();
                        await axios.post(BASE_URL + "/dailyTask/add", values).then((response) => {
                            // navigate("/daymanagement");
                            window.location.href = "/dayManagement";
                        }).catch((err) => {
                            console.log(err);
                        });
                        setSubmitting(false);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset }) => (
                        <form
                            className="flex flex-col space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }} method="POST">
                            <label>
                                <span className="text-xs font-light">Title:</span>
                                <input
                                    className="px-1 rounded-sm outline-none w-full border-b border-black"
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                                {errors.title && touched.title && errors.title}
                            </label>
                            <label className="flex flex-row space-x-1 items-center">
                                <span className="text-xs font-light">Date:</span>
                                <input
                                    className="px-1 rounded-sm outline-none"
                                    type="date"
                                    name="date"
                                    placeholder="Date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.date}
                                />
                                {errors.date && touched.date && errors.date}
                            </label>
                            {values.tasks.map((task, key) => {
                                return <div key={key} className="flex flex-col w-full space-y-1">
                                    <div className="flex flex-row space-x-1">
                                        <input
                                            className="px-1 rounded-sm outline-none w-1/12 border-b border-black"
                                            type="number"
                                            name={`tasks[${key}].sNo`}
                                            placeholder="Serial Number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.tasks[key].sNo}
                                        />
                                        <input
                                            className="px-1 rounded-sm outline-none w-11/12 border-b border-black"
                                            type="text"
                                            name={`tasks[${key}].task`}
                                            placeholder="Task"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.tasks[key].task}
                                        />
                                    </div>
                                    <textarea
                                        className="px-1 rounded-sm outline-none border-b border-black"
                                        name={`tasks[${key}].remarks`}
                                        placeholder="Remarks"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.tasks[key].remarks}
                                    />
                                </div>;
                            })}
                            <span onClick={() => {
                                setCurrentTaskSNo(currentTaskSNo + 1);
                                values.tasks.push({
                                    task: "",
                                    sNo: currentTaskSNo,
                                    remarks: ""
                                })
                            }}><GrAddCircle></GrAddCircle></span>
                            <div className="flex flex-row space-x-2">
                                <button className="bg-green-500 p-2 rounded-sm" type="submit">Submit</button>
                                <button className="bg-red-400 p-2 rounded-sm" type="reset" onClick={() => {
                                    handleReset();
                                    setCreateTaskFormDialogBox(false);
                                }}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreateDailyTask;
