import { FC, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Props { }

const Signup: FC<Props> = (props) => {

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required!!'),
    username: Yup.string()
      .min(4, 'Username is too short!')
      .max(15, 'Username is too long!')
      .required('Username is required!!'),
    password: Yup.string().required('Password is required!!'),
    firstName: Yup.string().required("First Name is required!!"),
    middleName: Yup.string().required("Middle Name is required!!"),
    lastName: Yup.string().required("Last Name is required!!"),
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-orange-300 to-pink-300">
      <h1 className="text-xl font-extrabold">Signup</h1>
      <Formik
        initialValues={{ username: '', password: '', email: '', firstName: '', middleName: '', lastName: '' }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await axios.post(BASE_URL + "/signup", values).then((response) => {
            // localStorage.setItem('auth_token', response.data.token);
            console.log(response);
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
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <div className="flex flex-row items-center">
              <input
                className="px-1 rounded-l-sm"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              /> <button type="button" className="bg-white h-full pr-1 rounded-r-sm" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</button>
            </div>
            {errors.password && touched.password && errors.password}
            <input
              className="px-1 rounded-sm"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && errors.firstName}
            <input
              className="px-1 rounded-sm"
              type="text"
              name="middleName"
              placeholder="Middle Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.middleName}
            />
            {errors.middleName && touched.middleName && errors.middleName}
            <input
              className="px-1 rounded-sm"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            {errors.middleName && touched.middleName && errors.middleName}
            <button className="border border-green-800 max-w-max self-center px-1.5 py-1 bg-green-500 rounded-md text-white" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
