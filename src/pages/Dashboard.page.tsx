import { FC, useEffect, useState } from 'react';
import { me } from '../api/User';
import { User } from '../models/User';

interface Props { }

const DashboardPage: FC<Props> = (props) => {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        const getUser = async () => {
            setUser(await me())
        }

        getUser();
    }, []);

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-orange-300 to-pink-300">
            Hello {user?.username} You are welcome to our website
        </div>
    );
}

export default DashboardPage;
