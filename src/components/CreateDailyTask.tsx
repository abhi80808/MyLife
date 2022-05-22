import axios from 'axios';
import { Dispatch, FC, SetStateAction,  useState } from 'react';
import { axiosRequest, axiosResponse } from '../axios/axios';
import { BASE_URL } from '../constants/constants';
import * as Yup from 'yup';
import { Formik } from 'formik';

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
        <div className={`bg-white ${className}`}>
            <div className={`flex flex-col justify-center items-center`}>
                <Formik
                    initialValues={{
                        title: "", date: "2022-05-30", tasks: [{
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
                            window.location.href="/dayManagement";
                          }).catch((err) => {
                            console.log(err);
                          });
                          setSubmitting(false);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset }) => (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} method="POST">
                            <input
                                className="px-1 rounded-sm outline-none"
                                type="text"
                                name="title"
                                placeholder="Title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                            />
                            {errors.title && touched.title && errors.title}
                            <input
                                className="px-1 rounded-sm outline-none"
                                type="text"
                                name="date"
                                placeholder="Date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.date}
                            />
                            {errors.date && touched.date && errors.date}
                            <span onClick={() => {
                                setCurrentTaskSNo(currentTaskSNo + 1);
                                values.tasks.push({
                                    task: "",
                                    sNo: currentTaskSNo,
                                    remarks: ""
                                })
                            }}>+</span>
                            {values.tasks.map((task, key) => {
                                return <div key={key}>
                                    <input
                                        className="px-1 rounded-sm outline-none"
                                        type="number"
                                        name={`tasks[${key}].sNo`}
                                        placeholder="Serial Number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.tasks[key].sNo}
                                    />
                                    <input
                                        className="px-1 rounded-sm outline-none"
                                        type="text"
                                        name={`tasks[${key}].task`}
                                        placeholder="Task"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.tasks[key].task}
                                    />
                                    <input
                                        className="px-1 rounded-sm outline-none"
                                        type="text"
                                        name={`tasks[${key}].remarks`}
                                        placeholder="Remarks"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.tasks[key].remarks}
                                    />
                                </div>;
                            })}
                            <button type="submit">Submit</button>
                            <button type="reset" onClick={() => {
                                handleReset();
                                setCreateTaskFormDialogBox(false);
                            }}>Cancel</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreateDailyTask;
