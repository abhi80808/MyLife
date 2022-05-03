import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { axiosRequest, axiosResponse } from '../axios/axios';
import { BASE_URL } from '../constants/constants';
import { User } from '../models/User';

interface Props { }

const Dashboard: FC<Props> = (props) => {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        const getUser = async () => {
            axiosRequest();
            axiosResponse();
            await axios.get(BASE_URL + "/me").then((response) => {
                setUser(response.data);
            }).catch((err) => {
                console.log(err);
            });
        }

        getUser();
    }, []);

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-orange-300 to-pink-300">
            Hello {user?.username} You are welcome to our website
        </div>
    );
}

export default Dashboard;
