import React, { useState, useEffect } from 'react'
import WealthRanking from '../WealthRanking/WealthRanking';
import LiveRanking from '../LiveRanking/LiveRanking';
import HourlyRanking from '../HourlyRanking/HourlyRanking';
import PartyRanking from '../PartyRanking/PartyRanking';

const primeUser = {
  id: 1,
  name: "Tom Cruise",
  "image": "./tom.jpg",
  "points": {
    "wealthPoint": {
      "daily": 769,
      "monthly": 4606
    },
    "livePoint": 125,
    "hourlyPoint": {
      "hourlyPartyPoint": 114,
      "hourlyLivePoint": 71
    },
    "partyPoint": {
      "weeklyContributionPoint": 939,
      "weeklyCharmPoint": 44339
    }
  }

}

function LeaderBoards() {
  const [users, setUsers] = useState([]);
  const [board, setBoard] = useState(1);

  // Fetching the users data from the json file and then setting it to the users state
  useEffect(() => {
    fetch("./users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, []);

  return (
    <div className='w-full sm:w-[425px] h-[100vh] m-auto border-[1px] border-gray-500'>
      {/* Board selection buttons */}
      <div className='flex justify-around text-[12px] my-2 font-semibold text-gray-400'>
        <button
          className={`${board === 1 ? "text-black border-b-4 border-[#fdeb2a]" : ""}`}
          onClick={() => setBoard(1)}>Wealth Ranking</button>
        <button
          className={`${board === 2 ? "text-black border-b-4 border-[#fdeb2a]" : ""}`}
          onClick={() => setBoard(2)}>Live Ranking</button>
        <button
          className={`${board === 3 ? "text-black border-b-4 border-[#fdeb2a]" : ""}`}
          onClick={() => setBoard(3)}>Hourly Ranking</button>
        <button
          className={`${board === 4 ? "text-black border-b-4 border-[#fdeb2a]" : ""}`}
          onClick={() => setBoard(4)}>Party Ranking</button>
      </div>

      {board === 1 ?
        //Wealth Ranking Leader Board 
        <WealthRanking users={users} primeUser={primeUser} />
        : board === 2 ?
          //Live Ranking Leader Board
          <LiveRanking users={users} primeUser={primeUser} />
          : board === 3 ?
            //Hourly Ranking Leader Board
            <HourlyRanking users={users} primeUser={primeUser} />
            :
            //Party Ranking Leader Board
            <PartyRanking users={users} primeUser={primeUser} />
      }
    </div>
  )
}

export default LeaderBoards