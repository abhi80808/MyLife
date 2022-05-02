import { FC, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

interface Props { }

const Login: FC<Props> = (props) => {

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, 'Username is too short!')
            .max(15, 'Username is too long!')
            .required('Username is required!!'),
        password: Yup.string().required('Password is required!!'),
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-orange-300 to-pink-300">
            <h1 className="text-xl font-extrabold">Login</h1>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    await axios.post(BASE_URL + "/login", values).then((response) => {
                        localStorage.setItem('auth_token', response.data.token);
                    }).catch((err) => {
                        console.log(err);
                    });
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form className="flex flex-col space-y-1.5" onSubmit={handleSubmit}>
                        <input
                            className="px-1 rounded-sm"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        {errors.username && touched.username && errors.username}
                        <input
                            className="px-1 rounded-sm"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        /> <button onClick={() => setShowPassword(!showPassword)}>O</button>
                        {errors.password && touched.password && errors.password}
                        <button className="border border-green-800 max-w-max self-center px-1.5 py-1 bg-green-500 rounded-md text-white" type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
