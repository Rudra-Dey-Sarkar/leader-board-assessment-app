import React, { useEffect, useState } from "react";

function getTimeLeft() {
  const now = new Date().getTime();
  const future = now + 15 * 24 * 60 * 60 * 1000;
  const distance = future - now;
  return calculateTime(distance);
}

function calculateTime(distance) {
  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());


  useEffect(() => {
    const future = new Date().getTime() + 15 * 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = future - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: "00", minutes: "00", seconds: "00" });
      } else {
        setTimeLeft(calculateTime(distance));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex">
      {timeLeft.days} days {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
    </div>
  );
}

export default CountdownTimer;
