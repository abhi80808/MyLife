import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { axiosRequest, axiosResponse } from '../axios/axios';
import { BASE_URL } from '../constants/constants';
import { NetWorthResponse } from '../models/Finance';

interface Props { }

const Funds: FC<Props> = (props) => {

    const [finance, setFinance] = useState<NetWorthResponse>();

    useEffect(() => {
        const getUser = async () => {
            axiosRequest();
            axiosResponse();
            await axios.get(BASE_URL + "/net-worth").then((response) => {
                setFinance(response.data);
            }).catch((err) => {
                console.log(err);
            });
        }

        getUser();
    }, []);

    return (
        <div className="flex flex-col h-screen items-center bg-gradient-to-r from-orange-300 to-pink-300">
            {finance?.funds.map((fund, key) => {
                return (
                    <div className="flex flex-row bg-white w-full justify-between p-4 my-3" key={key}>
                        <div className="flex flex-col pl-10">
                            <span className="font-extrabold text-xl">{fund.name}</span>
                            <span className="text-sm">{fund.type}</span>
                        </div>
                        <span className="font-semibold pr-4">{fund.balance}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default Funds;