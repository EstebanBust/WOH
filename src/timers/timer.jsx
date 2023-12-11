// TimerWithProgress.jsx
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TimerWithProgress = ({ initialDuration }) => {
  const [duration, setDuration] = useState(initialDuration);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsRunning(false);
  };

  const progress = (duration - timeLeft) / duration;

  return (
    <div style={{ width: '200px' }}>
      <div>
        <CircularProgressbar
          value={progress * 100}
          text={`${timeLeft}s`}
          styles={buildStyles({
            pathColor: '#4CAF50',
            trailColor: '#d6d6d6',
          })}
        />
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <label>
          Set Timer (seconds):{' '}
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(Math.max(0, parseInt(e.target.value)))}
          />
        </label>
      </div>
    </div>
  );
};

export default TimerWithProgress;
