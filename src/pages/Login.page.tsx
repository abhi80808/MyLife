import { FC } from 'react';

interface Props { }

const Login: FC<Props> = (props) => {

    return (
        <div className="flex flex-col space-y-2.5 justify-center items-center h-screen bg-gradient-to-r from-pink-400 to-orange-300">
            <h1 className="text-xl font-semibold">Login</h1>
            <form className="flex flex-col space-y-2 items-center justify-center">
                <input className="rounded-md p-1" placeholder="Username" />
                <input className="rounded-md p-1" placeholder="Password" />
                <button type="submit" className="border border-black rounded-md p-0.5 bg-green-500 text-white">Submit</button>
            </form>
        </div>
    );
}

export default Login;
