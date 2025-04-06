import React, { useState } from 'react'
import { BoltIcon, CrownIcon, GiftIcon, TrophyIcon, UserPlusIcon, VideoIcon } from 'lucide-react';
import Pagination from '../Pagination/Pagination';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

// function to decide top 3 leaders based on daily or monthly wealth points
function top3Leaders(users) {
    const result = [];

    let temp = users.sort((a, b) => b.points.livePoint - a.points.livePoint).slice(0, 3);
    result.push(temp[1]);
    result.push(temp[0]);
    result.push(temp[2]);

    return result;
}
// function to decide rest of leader based on daily or monthly wealth points
function restLeaders(users) {
    const top3 = top3Leaders(users);
    let temp = users.filter((user) => !top3.includes(user));
    return temp.sort((a, b) => b.points.livePoint - a.points.livePoint);
}

//function to decide number of pages based on the number of users
function LiveRanking({ users, primeUser }) {
    const [page, setPage] = useState(0);
    let maxUsersAtOnce = 20;
    let start = page * maxUsersAtOnce;
    let end = start + maxUsersAtOnce;

    return (
        <div className='relative'>

            {users?.length > 0 ?
                // Leader board
                <div className={`w-full h-[95vh] bg-[#ffcf75] pt-2 pb-14 overflow-y-auto `}>
                    {/* Countdown timer */}
                    <div className='flex justify-center gap-x-1 text-red-700 text-[12px] font-semibold text-center'>
                        <p>Settlement Time</p>
                        <CountdownTimer />
                    </div>
                    <div className='flex my-5 justify-between items-center'>

                        <div className='flex gap-2 px-1 text-[12px]'>
                            <div className='grid sm:flex justify-center items-center gap-1 bg-white py-1 px-3 rounded-full'>
                                <div className='flex gap-1'>
                                    <TrophyIcon className='text-[#fdeb2a]' />
                                    <p className='font-bold'>Contribution</p>
                                </div>
                                <div className='flex m-auto'>
                                    {users.slice(0, 3).map((user, index) => (
                                        <img
                                            key={index}
                                            src={user?.image}
                                            alt={user?.name}
                                            className={`w-[25px] h-[25px] rounded-full p-[1px] bg-white `} />
                                    ))}
                                </div>
                            </div>

                            <p className='flex justify-center items-center gap-1 w-fit font-bold bg-white py-1 px-3 rounded-full'>
                                <BoltIcon className='text-[#fdeb2a]' />
                                Star Task
                            </p>

                        </div>

                        <p className='flex text-[12px] font-semibold gap-x-1 justify-center items-center text-white bg-orange-500 py-2 px-3 rounded-l-full'>
                            <GiftIcon className='w-[30px] h-[30px] text-red-700' />
                            Rewards
                        </p>
                    </div>

                    {/* top 3 Monthly/Daily leader lists */}
                    <div className='flex justify-center items-end rounded-t-[10px] '>
                        {top3Leaders(users)?.map((user, index) => (
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
                                    className='flex gap-1 w-fit text-[12px] m-auto font-bold text-gray-500'>
                                    {user?.name}
                                    <UserPlusIcon className='text-orange-500 w-[15px] h-[15px]' />
                                </p>
                                <p
                                    className={`flex  justify-center gap-x-1 py-1 font-bold ${index === 1 ? "bg-[#ff3232]" : index === 0 ? "bg-[#9cb4dc]" : "bg-[#ff9233]"} rounded-[10px] mt-2`}>
                                    <BoltIcon className='text-yellow-200' />
                                    {user.points.livePoint}</p>
                                {index === 1 &&
                                    <div className='h-[25px]' />
                                }
                            </div>
                        ))}
                    </div>

                    {/* Rest of the leaders */}
                    <div className='w-full sm:w-[405px] bg-[#fdf7ed] m-auto px-2'>
                        <div className='bg-[#ffffff] border-[1px] border-[#e3ddce] rounded-[10px]'>
                            {restLeaders(users)?.slice(start, end)?.map((user, index) => (
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
                                        <BoltIcon className='text-yellow-400' />
                                        {user.points.livePoint}</p>
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

            <div className='absolute bottom-0 w-full flex justify-between  p-2 bg-[#fff7e9] border-t-[1px] border-gray-700'>
                <div className='flex items-center gap-x-2 text-[15px] font-semibold'>
                    <div className='relative'>
                        <img
                            src={primeUser?.image}
                            alt={primeUser?.name}
                            className='w-[50px] h-[50px] rounded-full p-1 border-[1px] border-gray-500' />
                        <div className='absolute bottom-0 right-0 w-[20px] h-[20px] bg-[#ffcf75] rounded-full flex justify-center items-center'>
                            <VideoIcon className='w-[15px] h-[15px] text-gray-500' />
                        </div>
                    </div>
                    <p>{primeUser?.name}</p>
                </div>
                <p className={`flex  justify-center gap-x-1 py-1 font-bold rounded-[10px] mt-2`}>
                    <BoltIcon className='text-yellow-400' />
                    {primeUser.points.livePoint}
                </p>
            </div>
        </div>
    )
}

export default LiveRanking