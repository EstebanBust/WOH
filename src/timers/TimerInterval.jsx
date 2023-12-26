import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import BackButton from './BackButton';

const TimerWithInterval = ({ defaultWorkDuration, defaultRestDuration, defaultTotalRounds, pathColor1, pathColor2, pathColor3, trailColorVar, textColorVar }) => {
  const [durationRestMinutes, setDurationRestMinutes] = useState(0);
  const [durationRestSeconds, setDurationRestSeconds] = useState(defaultRestDuration);
  const [durationWorkMinutes, setDurationWorkMinutes] = useState(0);
  const [durationWorkSeconds, setDurationWorkSeconds] = useState(defaultWorkDuration);
  const [totalRounds, setTotalRounds] = useState(defaultTotalRounds || 1);
  const [isWorkPhase, setIsWorkPhase] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState((durationWorkMinutes * 60 + durationWorkSeconds));
  const [isRunning, setIsRunning] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [iniciarConteo, setInciarConteo] = useState(false);
  const [showInputs, setShowInputs] = useState(true);
  const [switchPhase, setSwitchPhase] = useState(true);
  const tono1 = new Audio('/tonos/tono1.mp3');
  const tono2 = new Audio('/tonos/tono2.mp3');

  useEffect(() => {
    setTimeLeft(isWorkPhase ? (durationWorkMinutes * 60 + durationWorkSeconds) : (durationRestMinutes * 60 + durationRestSeconds));
  }, [durationRestMinutes, durationRestSeconds, isWorkPhase, durationWorkMinutes, durationWorkSeconds]);

  useEffect(() => {
    let timer;
    if (isRunning && countDown <= 4 && countDown > 1) {
      tono2.play();
    }
    if (isRunning && countDown === 1) {
      tono1.play();
    }
    if (isRunning && timeLeft <= 4 && timeLeft > 1) {
      tono1.play();
    }
    if (isRunning && timeLeft === 1 ) {
      tono2.play();
    }

    if (isRunning && countDown > 0) {
      const countdownTimer = setTimeout(() => {
        setCountDown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }
    if (isRunning && countDown === 0 && switchPhase) {
      setIsWorkPhase(true);
      setSwitchPhase(false);
    }
    if (isRunning && timeLeft > 0 && countDown === 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0 && countDown === 0) {
      if (isWorkPhase) {
        setCurrentRound(prevRound => prevRound + 1);
      }

      const nextRound = currentRound + (isWorkPhase ? 1 : 0);
      const isLastRound = nextRound >= totalRounds;

      if (!isLastRound) {
        setIsWorkPhase(prevIsWorkPhase => !prevIsWorkPhase);
        setCurrentRound(nextRound);
        setTimeLeft(isWorkPhase ? (durationWorkMinutes * 60 + durationWorkSeconds) : (durationRestMinutes * 60 + durationRestSeconds));
      } else {
        // Si es la última ronda, detener el temporizador
        setIsRunning(false);
      }
    }
    if (timeLeft === 0) {
      setInciarConteo(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkPhase, countDown]);

  const startTimer = () => {
    setInciarConteo(true);
    setCountDown(10);
    setIsWorkPhase(false);
    setIsRunning(true);
    setShowInputs(false);
    setSwitchPhase(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkPhase(false);
    setCurrentRound(1);
    setTimeLeft(isWorkPhase ? (durationWorkMinutes * 60 + durationWorkSeconds) : (durationRestMinutes * 60 + durationRestSeconds));
    setCountDown(10);
    setInciarConteo(false);
    setShowInputs(true);
  };

  const totalTimeForPhase = isWorkPhase ? (durationWorkMinutes * 60 + durationWorkSeconds) : (durationRestMinutes * 60 + durationRestSeconds);
  const progress = ((totalTimeForPhase - timeLeft) / totalTimeForPhase);
  const countDownProgress = (10 - countDown) / 10;

  return (
    <div style={{ width: '500px' }}>
      <div>
        <h3 className='col-12 text-center fase' htmlFor=""><strong>
          {isWorkPhase && countDown === 0 ? 'Trabajo' : !isWorkPhase && countDown === 0 ? 'Descanso' : ''}</strong>
        </h3>

        <CircularProgressbar
          value={(countDown === 0 ? progress : countDownProgress) * 100}
          text={
            isWorkPhase
              ? `${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`
              : countDown === 0
                ? `${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`
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
        <span>{`Ronda: ${currentRound - 1}/${totalRounds}`}</span>
      </div>
      <div>
        <PlayButton style={{ width: '70px' }} onClick={startTimer}>Start</PlayButton>
        <PauseButton style={{ width: '70px' }} onClick={pauseTimer}>Pause</PauseButton>
        <BackButton style={{ width: '70px' }} onClick={resetTimer}>Reset</BackButton>
      </div>
      <div>
        {showInputs && (
          <div className='row'>
            <label className='col-12 text-center' htmlFor="">Trabajo</label>
            <div className='col-6'>
              <label>
                Minutos:{' '}
                <input
                  className='form-input'
                  style={{ width: '100%' }}
                  type="number"
                  value={durationWorkMinutes}
                  onChange={e => setDurationWorkMinutes(Math.max(0, parseInt(e.target.value)))}
                />
              </label>
            </div>
            <div className='col-6'>
              <label>
                Segundos:{' '}
                <input
                  type="number"
                  value={durationWorkSeconds}
                  onChange={e => {
                    const value = Math.min(59, Math.max(0, parseInt(e.target.value)));
                    setDurationWorkSeconds(value);
                  }}
                />
              </label>
            </div>
            <label className="col-12 text-center" htmlFor="">Descanso</label>
            <div className='col-6'>
              <label>
                Minutos:{' '}
                <input
                  className='form-input'
                  style={{ width: '100%' }}
                  type="number"
                  value={durationRestMinutes}
                  onChange={e => setDurationRestMinutes(Math.max(0, parseInt(e.target.value)))}
                />
              </label>
            </div>
            <div className='col-6'>
              <label>
                Segundos:{' '}
                <input
                  type="number"
                  value={durationRestSeconds}
                  onChange={e => {
                    const value = Math.min(59, Math.max(0, parseInt(e.target.value)));
                    setDurationRestSeconds(value);
                  }}
                />
              </label>
            </div>
            <div>
              <label>
                Rondas Totales:{' '}
                <input
                  type="number"
                  value={totalRounds}
                  onChange={e => setTotalRounds(Math.max(1, parseInt(e.target.value)))}
                />
              </label>
            </div>
          </div>
        )}

      </div>
    </div>

  );
};

export default TimerWithInterval;