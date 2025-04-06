import React, { useState } from 'react'
import { CircleDollarSign, CrownIcon, GiftIcon } from 'lucide-react';
import Pagination from '../Pagination/Pagination';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

// function to decide top 3 leaders based on daily or monthly wealth points
function top3Leaders(activeFilter, users) {
    const result = [];
    if (activeFilter) {
        let temp = users.sort((a, b) => b.points.wealthPoint.daily - a.points.wealthPoint.daily).slice(0, 3);
        result.push(temp[1]);
        result.push(temp[0]);
        result.push(temp[2]);

    } else {
        let temp = users.sort((a, b) => b.points.wealthPoint.monthly - a.points.wealthPoint.monthly).slice(0, 3);
        result.push(temp[1]);
        result.push(temp[0]);
        result.push(temp[2]);
    }
    return result;
}
// function to decide rest of leader based on daily or monthly wealth points
function restLeaders(activeFilter, users) {
    const top3 = top3Leaders(activeFilter, users);
    let temp = users.filter((user) => !top3.includes(user));
    return temp.sort((a, b) => activeFilter === true ? (b.points.wealthPoint.daily - a.points.wealthPoint.daily) : (b.points.wealthPoint.monthly - a.points.wealthPoint.monthly));
}
// function to enrypt wealth points
function encryptPoints(points) {
    let encrypt = "";
    let strPoints = points.toString();

    if (strPoints.length >= 3) {
        for (let i = 0; i < strPoints.length - 2; i++) {
            encrypt += "*";
        }
        return strPoints[0] + encrypt + strPoints[strPoints.length - 1];
    } else {
        return strPoints;
    }
}
//function to decide number of pages based on the number of users
function WealthRanking({ users, primeUser }) {
    const [activeFilter, setActiveFilter] = useState(false);
    const [page, setPage] = useState(0);
    let maxUsersAtOnce = 20;
    let start = page * maxUsersAtOnce;
    let end = start + maxUsersAtOnce;

    return (
        <div className='relative'>
            {/* Monthly and Daily filter control button */}
            <div className='absolute top-0 p-2 z-10 w-full bg-white'>
                <div className='flex justify-center gap-2 p-1 bg-gray-200 rounded-full'>
                    {/* Daily filter button */}
                    <button
                        className={`${activeFilter === true ? "bg-white text-black" : "text-gray-400"} w-full py-1 font-semibold rounded-full`}
                        onClick={() => setActiveFilter(true)}>Daily</button>
                    {/* Monthly filter button */}
                    <button
                        className={`${activeFilter === false ? "bg-white text-black" : "text-gray-400"} w-full py-1 font-semibold rounded-full`}
                        onClick={() => setActiveFilter(false)}>Monthly</button>
                </div>
            </div>

            {users?.length > 0 ?
                // Leader board
                <div className='w-full h-[95vh] bg-[#ffcf75] pt-20 pb-14 overflow-y-auto '>
                    <div className='flex justify-between items-center'>
                        <div />
                        <div />

                        {/* Countdown timer */}
                        <div className='flex gap-x-1 text-red-700 text-[12px] font-semibold text-center'>
                            <p>Settlement Time</p>
                            <CountdownTimer />
                        </div>
                        <p className='flex text-[12px] font-semibold gap-x-1 justify-center items-center text-white bg-orange-500 py-2 px-3 rounded-l-full'>
                            <GiftIcon className='w-[30px] h-[30px] text-red-700' />
                            Rewards
                        </p>
                    </div>
                    {/* Wealth Rank Background Logo */}
                    <img src="./wealth-ranking.png" alt="Wealth Rank Logo" className='top-0 left-[15%] w-[75%] h-fit m-auto' />

                    {/* top 3 Monthly/Daily leader lists */}
                    <div className='flex justify-center items-end rounded-t-[10px] '>
                        {top3Leaders(activeFilter, users)?.map((user, index) => (
                            <div key={index} className={`w-full sm:w-[135px] h-full px-1 py-4 justify-center text-center bg-gradient-to-b from-[#f9dcb2] to-[#fdf7ed] ${index === 1 ? "border-[1px] border-x-gray-500 border-t-gray-500" : ""} rounded-t-[10px]`}>
                                <div className='relative w-fit m-auto'>
                                    <p className='absolute text-[12px] left-[22px] top-[15px] font-bold'>{index === 1 ? "1" : index === 0 ? "2" : "3"}</p>
                                    <CrownIcon className={`w-[50px] h-[50px] ${index === 1 ? "text-[#ff3232]" : index === 0 ? "text-[#9cb4dc]" : "text-[#ff9233]"}`} />
                                </div>
                                <img
                                    src={user?.image}
                                    alt={user?.name}
                                    className={`w-[100px] h-[100px] rounded-full m-auto p-1 bg-white `} />
                                <p
                                    className='text-[12px] font-bold text-gray-500'>{user?.name}</p>
                                <p
                                    className={`flex  justify-center gap-x-1 py-1 font-bold ${index === 1 ? "bg-[#ff3232]" : index === 0 ? "bg-[#9cb4dc]" : "bg-[#ff9233]"} rounded-[10px] mt-2`}>
                                    <CircleDollarSign className='text-yellow-200' />
                                    {encryptPoints(activeFilter === true ? user.points.wealthPoint.daily : user.points.wealthPoint.monthly)}</p>
                                {index === 1 &&
                                    <div className='h-[25px]' />
                                }
                            </div>
                        ))}
                    </div>

                    {/* Rest of the leaders */}
                    <div className='w-full sm:w-[405px] bg-[#fdf7ed] m-auto px-2'>
                        <div className='bg-[#ffffff] border-[1px] border-[#e3ddce] rounded-[10px]'>
                            {restLeaders(activeFilter, users)?.slice(start, end)?.map((user, index) => (
                                <div key={index} className={`flex justify-between items-center py-2 px-2 border-b-[1px] border-gray-300`}>
                                    <div className='flex gap-x-2 items-center'>
                                        <p className='text-[12px] font-bold'>{(page * 20) + index + 4}</p>
                                        <img
                                            src={user?.image}
                                            alt={user?.name}
                                            className={`w-[50px] h-[50px] rounded-full p-1 bg-white `} />
                                        <p className='text-[12px] font-bold text-gray-500'>{user?.name}</p>
                                    </div>
                                    <p className={`flex  justify-center gap-x-1 py-1 font-bold rounded-[10px] mt-2`}>
                                        <CircleDollarSign className='text-yellow-400' />
                                        {encryptPoints(activeFilter === true ? user.points.wealthPoint.daily : user.points.wealthPoint.monthly)}</p>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <Pagination page={page} setPage={setPage} maxUsersAtOnce={maxUsersAtOnce} />
                    </div>

                </div>
                :
                <div>
                    <p>No Users Available</p>
                </div>
            }

            <div className='absolute bottom-0 w-full flex justify-between p-2 bg-[#fff7e9] border-t-[1px] border-gray-700'>
                <div className='flex items-center gap-x-2 text-[15px] font-semibold'>
                    <img
                        src={primeUser?.image}
                        alt={primeUser?.name}
                        className='w-[50px] h-[50px] rounded-full p-1 border-[1px] border-gray-500' />
                    <p>{primeUser?.name}</p>
                </div>
                <p className={`flex  justify-center gap-x-1 py-1 font-bold rounded-[10px] mt-2`}>
                    <CircleDollarSign className='text-yellow-400' />
                    {activeFilter === true ? primeUser.points.wealthPoint.daily : primeUser.points.wealthPoint.monthly}
                </p>
            </div>
        </div>
    )
}

export default WealthRanking