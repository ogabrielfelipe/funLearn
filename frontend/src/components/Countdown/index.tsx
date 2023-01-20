import React, { useState, useEffect } from 'react';


interface CountDownProps {
  restartTime: boolean;
  time: number;
}


function Countdown( { restartTime = false, time }: CountDownProps ) {
  const [timeLeft, setTimeLeft] = useState(time);
  const reset = restartTime;
  let intervalId;

  useEffect(() => {
    intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  if (reset){
    clearInterval(intervalId);
    setTimeLeft(10);
  }


  return (
    <div>
      <h1>{timeLeft}</h1>
    </div>
  );
}

export default Countdown;