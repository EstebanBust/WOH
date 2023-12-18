import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import BackButton from './BackButton';

const TimerWithInterval = ({ defaultWorkDuration, defaultRestDuration, defaultTotalRounds, pathColor1, pathColor2, pathColor3, trailColorVar, textColorVar }) => {
  const [workDuration, setWorkDuration] = useState(defaultWorkDuration || 0);
  const [restDuration, setRestDuration] = useState(defaultRestDuration || 0);
  const [totalRounds, setTotalRounds] = useState(defaultTotalRounds || 1);
  const [isWorkPhase, setIsWorkPhase] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [iniciarConteo, setInciarConteo] = useState(false);
  const tono1 = new Audio('/tonos/tono1.mp3');
  const tono2 = new Audio('/tonos/tono2.mp3');

  useEffect(() => {
    setTimeLeft(isWorkPhase ? workDuration : restDuration);
  }, [workDuration, restDuration, isWorkPhase]);

  useEffect(() => {
    let timer;
    if (countDown <= 4 && countDown > 1) {
      tono2.play();
    }
    if (countDown === 1) {
      tono1.play();
    }
    if (timeLeft <= 4 && timeLeft > 1) {
      tono1.play();
    }
    if (timeLeft === 1) {
      tono2.play();
    }

    if (countDown > 0 && isRunning) {
      const countdownTimer = setTimeout(() => {
        setCountDown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }
    if (isRunning && timeLeft > 0 && countDown === 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && countDown === 0) {
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
    if (timeLeft === 0){
      setInciarConteo(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkPhase, workDuration, restDuration, countDown]);

  const startTimer = () => {
    setInciarConteo(true);
    setCountDown(10);
    setIsWorkPhase(false);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkPhase(false);
    setCurrentRound(1);
    setTimeLeft(workDuration);
    setCountDown(10);
    setInciarConteo(false);
  };

  const totalTimeForPhase = isWorkPhase ? workDuration : restDuration;
  const progress = ((totalTimeForPhase - timeLeft) / totalTimeForPhase);
  const countDownProgress = (10 - countDown) / 10;

  return (
    <div style={{ width: '250px' }}>
      <div>
        <CircularProgressbar
          value={(countDown === 0 ? progress : countDownProgress) * 100}
          text={
            isWorkPhase
              ? `${'Work'}  ${timeLeft}s`
              : countDown === 0
                ? `${'Rest'}  ${timeLeft}s`
                : iniciarConteo
                  ? `${countDown}s`
                  : '▶'
          }
          styles={buildStyles({
            pathColor: isWorkPhase ? pathColor1 : countDown === 0 ? pathColor3 : pathColor2,
            trailColor: trailColorVar,
            textColor: textColorVar,
          })}
        />

      </div>
      <div>
        <span>{`Round: ${currentRound - 1}/${totalRounds}`}</span>
      </div>
      <div>
        <PlayButton style={{ width: '70px' }} onClick={startTimer}>Start</PlayButton>
        <PauseButton style={{ width: '70px' }} onClick={pauseTimer}>Pause</PauseButton>
        <BackButton style={{ width: '70px' }} onClick={resetTimer}>Reset</BackButton>
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
