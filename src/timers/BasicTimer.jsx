import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';

const TimerWithProgress = ({ initialDuration }) => {
  const [duration, setDuration] = useState(initialDuration);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [isWorkPhase, setIsWorkPhase] = useState(false);
  const [iniciarConteo, setInciarConteo] = useState(false);
  const tono1 = new Audio('/tonos/tono1.mp3');
  const tono2 = new Audio('/tonos/tono2.mp3');
  console.log(iniciarConteo);
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    let timer;
    if( countDown <= 4 && countDown > 1){
        tono2.play();
    }
    if( countDown === 1){
      tono1.play();
    }
    if( timeLeft <= 4 && timeLeft > 1){
      tono1.play();
    }
    if( timeLeft === 1){
      tono2.play();
    }
    
    if(countDown > 0 && isRunning){
        const countdownTimer = setTimeout(() => {
            setCountDown(prevCountdown => prevCountdown - 1);
          }, 1000);
    }
    
    if (isRunning && timeLeft > 0 && countDown === 0) {
        setIsWorkPhase(true);
        timer = setInterval(() => {
            setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        }, 1000);
    }
    if (timeLeft === 0){
      setInciarConteo(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, countDown]);

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
    setTimeLeft(duration);
    setIsRunning(false);
  };

  const progress = (duration - timeLeft) / duration;
  const countDownProgress = (10 - countDown) / 10;

  return (
    <div style={{ width: '200px' }}>
      <div>
        <CircularProgressbar
          value={(isWorkPhase ? progress : countDownProgress) * 100}
          text={
            isWorkPhase ? `${timeLeft}s` :
            iniciarConteo ? `${countDown}s` :
            "▶"
          } 
          styles={buildStyles({
            pathColor: isWorkPhase ? '#4CAF50' : '#0000FF',
            trailColor: '#d6d6d6',
          })}
        />
      </div>
      <div>
        <PlayButton onClick={startTimer}>Start</PlayButton>
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