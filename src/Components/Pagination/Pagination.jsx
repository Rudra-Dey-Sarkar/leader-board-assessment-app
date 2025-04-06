import React, { useState, useEffect } from 'react'

// function to decide number of pages based on the number of users
function decideNumberOfPages(users, setNumberOfPages, maxUsersAtOnce) {
    const temp = [];
    let totalPages = Math.ceil((users.length - 3) / maxUsersAtOnce);
    for (let i = 1; i <= totalPages; i++) {
        if(!temp.includes(i)){
            temp[i-1]=i;
        }
    }
    setNumberOfPages(temp);
}

function Pagination({page, setPage, maxUsersAtOnce }) {
    const [numberOfPages, setNumberOfPages] = useState([]);
    // Fetching the users data from the json file and then sending it to the decideNumberOfPages function
    useEffect(() => {
        fetch("./users.json")
            .then((res) => res.json())
            .then((data) => {
                decideNumberOfPages(data, setNumberOfPages, maxUsersAtOnce);
            })
    });

    return (
        <div className='my-2'>
            {/* Pagination buttons */}
            <div className='flex w-fit justify-center gap-2 m-auto p-1 bg-gray-200 rounded-full'>
                {numberOfPages.map((btn) => {
                    return (
                        <button
                            key={btn}
                            className={`text-gray-500 flex justify-center items-center w-[30px] h-[30px] py-1 font-semibold rounded-full ${btn===(page+1) ? "bg-white" : ""}`}
                            onClick={() => setPage(btn - 1)}>{btn}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default Pagination