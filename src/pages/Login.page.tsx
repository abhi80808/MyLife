// import { FC } from 'react';
// import { useDispatch } from 'react-redux';
// import { meLoginAction } from '../actions/auth.actions';
// import { LoginRequest } from '../models/User';

// interface Props { }

// const Login: FC<Props> = (props) => {

//     const dispatch = useDispatch();

//     const handleSubmit = (data: LoginRequest) => {
//         dispatch(meLoginAction(data));
//     }

//     return (
//         <div className="flex flex-col space-y-2.5 justify-center items-center h-screen bg-gradient-to-r from-pink-400 to-orange-300">
//             <h1 className="text-xl font-semibold">Login</h1>
//             <form className="flex flex-col space-y-2 items-center justify-center">
//                 <input className="rounded-md p-1" placeholder="Username" />
//                 <input className="rounded-md p-1" placeholder="Password" />
//                 <button type="submit" className="border border-black rounded-md p-0.5 bg-green-500 text-white">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default Login;


import { FC, memo} from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { meLoginAction } from '../actions/auth.actions';
import { useAppSelector } from '../store';
import { errorMessageSelector, isFormSubmittingSelector } from '../selectors/auth.selectors';
import { Link } from 'react-router-dom';

interface Props {
}

const LoginPage: FC<Props> = (props) => {

    const dispatch = useDispatch();
    
    // const errorMessage = useAppSelector(errorMessageSelector);

    // const isFormSubmitting = useAppSelector(isFormSubmittingSelector);

    const { handleSubmit, getFieldProps } =
        useFormik({
            initialValues: {
                username: "",
                password: ""
            },
            validationSchema: yup.object().shape({
                username: yup
                    .string()
                    .required("Username is required field"),
                password: yup
                    .string()
                    .required("Cannot login without a password")
            }),
            onSubmit: (data) => {
                dispatch(meLoginAction(data));
            }
        });

    // const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="w-full">
            dhasjhfudshjk
            <div className="px-10 sm:px-0 flex flex-col justify-center min-h-screen space-y-16 mx-auto max-w-26rem">
                <div className="space-y-3">
                    <h1 className="text-4xl font-normal">Log In to <span className="text-primary-dark font-bold">TUTORSAGE</span></h1>
                    <h5 className="text-sm font-bold">New Here? <Link to="/signup" className="border-b border-primary-dark">Create an account</Link></h5>
                </div>
                {/* {errorMessage ? errorMessage : ""} */}
                <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                    <div className="space-y-12">
                        <input
                            {...getFieldProps("username")}
                            name="username"
                            type="username"
                            placeholder="Username"
                            // touched={touched.username}
                            // errorMessage={errors.username}
                        >
                            {/* <Icon theme="primary" className="mr-3" name="username"></Icon> */}
                        </input>
                        <input
                            {...getFieldProps("password")}
                            name="password"
                            type="text"
                            // type={isShowPassword ? "text" : "password"}
                            placeholder="Password"
                            // touched={touched.password}
                            // errorMessage={errors.password}
                        >
                            {/* <Icon theme="primary" className="mr-3" name="password"></Icon> */}
                        </input>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 justify-between">
                        {/* <FormSwitch theme="primary" forSetting="Show Password" enabled={isShowPassword} setEnabled={() =>
                            setIsShowPassword(!isShowPassword)
                        }></FormSwitch> */}
                        {/* <Button buttonSize="sm" theme="primary" buttonStyle="outline" text="Log in" buttonDisabled={isFormSubmitting} /> */}
                        <button>Log In</button>
                    </div>
                    <div className="flex flex-col text-center space-y-4 pt-8">
                        <div className="text-secondary-light space-x-3">
                            <input type="checkbox" name="keepLoggedIn" />
                            <label htmlFor="keepLoggedIn">Keep me logged in</label>
                        </div>
                        {/* <LinkTo to="/forgot-password" className="font-bold">Forgot Password?</LinkTo> */}
                    </div>
                </form>
                {/* <Copyrights className="font-medium text-sm text-center" /> */}
            </div>
        </div>
    );
};

LoginPage.defaultProps = {};

export default memo(LoginPage);