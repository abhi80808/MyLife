import axios from 'axios';
import { Dispatch, FC, SetStateAction } from 'react';
import { axiosRequest, axiosResponse } from '../axios/axios';
import { BASE_URL } from '../constants/constants';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { getTommorowDate } from '../utils/Dates';

interface Props {
    className: string,
    setCreateGoalFormDialogBox: Dispatch<SetStateAction<boolean>>
}

const CreateGoal: FC<Props> = ({ className, setCreateGoalFormDialogBox }) => {

    const validationSchema = Yup.object().shape({
        goalType: Yup.string().required("Goal Type is required field"),
        goal: Yup.object().shape({
            title: Yup.string()
                .min(6, ({ min }) => `Cannot be less than ${min}`)
                .required("Title is required field"),
            deadline: Yup.string().required("Date is required field"),
            remarks: Yup.string()
        })
    })

    return (
        <div className={`bg-white w-full ${className}`}>
            <div className={`m-1 border border-black p-1 flex flex-col justify-center items-center`}>
                <Formik
                    initialValues={{
                        goalType: "",
                        goal: {
                            title: "",
                            deadline: getTommorowDate('-'),
                            remarks: ""
                        }
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        axiosRequest();
                        axiosResponse();
                        await axios.post(BASE_URL + "/goals/add", values).then((response) => {
                            window.location.href = "/goalManagement";
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
                                <select
                                    className="px-1 rounded-sm outline-none w-full border-b border-black"
                                    name="goalType"
                                    placeholder="Goal Type"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.goalType}
                                >
                                    <option value="shortTerm">Short Term</option>
                                    <option value="midTerm">Mid Term</option>
                                    <option value="longTerm">Long Term</option>
                                </select>
                                {errors.goalType && touched.goalType && errors.goalType}
                            </label>
                            <label>
                                <span className="text-xs font-light">Title:</span>
                                <input
                                    className="px-1 rounded-sm outline-none w-full border-b border-black"
                                    type="text"
                                    name="goal.title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.goal.title}
                                />
                                {errors.goal?.title && touched.goal?.title && errors.goal?.title}
                            </label>
                            <label className="flex flex-row space-x-1 items-center">
                                <span className="text-xs font-light">Deadline:</span>
                                <input
                                    className="px-1 rounded-sm outline-none"
                                    type="date"
                                    name="goal.deadline"
                                    placeholder="Deadline"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.goal.deadline}
                                />
                                {errors.goal?.deadline && touched.goal?.deadline && errors.goal?.deadline}
                            </label>
                            <textarea
                                className="px-1 rounded-sm outline-none border-b border-black"
                                name={`goal.remarks`}
                                placeholder="Remarks"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.goal.remarks}
                            />
                            {errors.goal?.remarks && touched.goal?.remarks && errors.goal?.remarks}
                            <div className="flex flex-row space-x-2">
                                <button className="bg-green-500 p-2 rounded-sm" type="submit">Submit</button>
                                <button className="bg-red-400 p-2 rounded-sm" type="reset" onClick={() => {
                                    handleReset();
                                    setCreateGoalFormDialogBox(false);
                                }}>Cancel</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreateGoal;
