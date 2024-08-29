import React, { useState, useEffect, useRef } from "react"
import "./CounterdownTimer.css"

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [customTime, setCustomTime] = useState<number>(60);

  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && isActive) {
      // Set an interval to update the timeLeft every second
      intervalIdRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    } if (timeLeft === 0) {   // If the timer reaches 0, stop the timer
      clearInterval(intervalIdRef.current!);
      intervalIdRef.current = null;
    }
    return () => {
      // Cleanup the interval on component unmount or when isActive changes
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
    };
  }, [timeLeft, isActive]);

  // Function to start the timer
  function startTimer() {
    if (timeLeft > 0) {
      setIsActive(true);
    }
  }

  //Function to pause the timer
  function pauseTimer() {
    setIsActive(false);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
    }
  }

  //Function to reset the timer to 60
  function resetTimer() {
    pauseTimer();
    setTimeLeft(customTime);
  }

  //Function to handle custome time change
  function handleCustomTime(e : React.ChangeEvent<HTMLInputElement>) {
    const customTime = parseInt(e.target.value);
    setCustomTime(customTime);
    setTimeLeft(customTime);
  }

  return (
    <main>
      <h1>Countdown Timer</h1>
      <section className="custom-time-wrapper">
        <label>Set custom time (seconds): </label>
        <input type="number" value= {customTime} min="1"
          onChange={handleCustomTime}
        />
      </section>
      <h2>{timeLeft} seconds left</h2>
      {timeLeft === 0 ? <p>End of time!</p> : null}
      <button className="start-btn" onClick={startTimer}>Start Timer</button>
      <button className="pause-btn" onClick={pauseTimer}>Pause Timer</button>
      <button className="reset-btn" onClick={resetTimer}>Reset Timer</button>
    </main>
  )
}

export default CountdownTimer;
