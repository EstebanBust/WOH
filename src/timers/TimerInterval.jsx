import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TimerWithInterval = ({ defaultWorkDuration, defaultRestDuration, defaultTotalRounds }) => {
    const [workDuration, setWorkDuration] = useState(defaultWorkDuration || 0);
    const [restDuration, setRestDuration] = useState(defaultRestDuration || 0);
    const [totalRounds, setTotalRounds] = useState(defaultTotalRounds || 1);
    const [isWorkPhase, setIsWorkPhase] = useState(true);
    const [currentRound, setCurrentRound] = useState(1);
    const [timeLeft, setTimeLeft] = useState(workDuration);
    const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(isWorkPhase ? workDuration : restDuration);
  }, [workDuration, restDuration, isWorkPhase]);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
        if (isWorkPhase) {
          setCurrentRound(prevRound => prevRound + 1);
        }
        
        const nextRound = currentRound + (isWorkPhase ? 1 : 0);
        const isLastRound = nextRound >= totalRounds;
      
        if (!isLastRound) {
          setIsWorkPhase(!isWorkPhase);
          setCurrentRound(nextRound);
          setTimeLeft(isWorkPhase ? restDuration : workDuration);
        } else {
          // Si es la última ronda, detener el temporizador
          setIsRunning(false);
        }
      }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkPhase, workDuration, restDuration]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkPhase(true);
    setCurrentRound(1);
    setTimeLeft(workDuration);
  };

    const totalTimeForPhase = isWorkPhase ? workDuration : restDuration;
    const progress = ((totalTimeForPhase - timeLeft) / totalTimeForPhase);

  return (
    <div style={{ width: '200px' }}>
      <div>
        <CircularProgressbar
          value={progress * 100}
          text={`${isWorkPhase ? 'Work' : 'Rest'} - ${timeLeft}s`}
          styles={buildStyles({
            pathColor: isWorkPhase ? '#4CAF50' : '#FF0000',
            trailColor: '#d6d6d6',
          })}
        />
      </div>
      <div>
        <span>{`Round: ${currentRound-1}/${totalRounds}`}</span>
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <label>
          Work Duration (seconds):{' '}
          <input
            type="number"
            value={workDuration}
            onChange={e => setWorkDuration(Math.max(0, parseInt(e.target.value)))}
          />
        </label>
      </div>
      <div>
        <label>
          Rest Duration (seconds):{' '}
          <input
            type="number"
            value={restDuration}
            onChange={e => setRestDuration(Math.max(0, parseInt(e.target.value)))}
          />
        </label>
      </div>
      <div>
        <label>
          Total Rounds:{' '}
          <input
            type="number"
            value={totalRounds}
            onChange={e => setTotalRounds(Math.max(1, parseInt(e.target.value)))}
          />
        </label>
      </div>
    </div>
  );
};

export default TimerWithInterval;
