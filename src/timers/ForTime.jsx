import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import BackButton from './BackButton';

const TimerForTime = ({ pathColor1, pathColor2, trailColorVar, textColorVar }) => {
    const [maxDurationMinutes, setMaxDurationMinutes] = useState(0);
    const [maxDurationSeconds, setMaxDurationSeconds] = useState(0);
    const [maxDurationInSeconds, setMaxDurationInSeconds] = useState(maxDurationMinutes * 60 + maxDurationSeconds);
    const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkPhase, setIsWorkPhase] = useState(false);
    const [countDown, setCountDown] = useState(10);
    const [showInputs, setShowInputs] = useState(true);
    const tono1 = new Audio('/tonos/tono1.mp3');
    const tono2 = new Audio('/tonos/tono2.mp3');

    useEffect(() => {
        setMaxDurationInSeconds(maxDurationMinutes * 60 + maxDurationSeconds);
        setElapsedTimeInSeconds(0);
    }, [maxDurationMinutes, maxDurationSeconds]);

    useEffect(() => {
        let timer;
        if (isRunning) {
            if (countDown <= 4 && countDown > 1) {
                tono2.play();
              }
              if (countDown === 1) {
                tono1.play();
              }
            if (countDown > 0) {
                timer = setInterval(() => {
                    setCountDown(prevCountDown => prevCountDown - 1);
                }, 1000);
            } else {
                if (maxDurationInSeconds) {
                    if (elapsedTimeInSeconds < maxDurationInSeconds) {
                        setIsWorkPhase(true);
                        timer = setInterval(() => {
                            setElapsedTimeInSeconds(prevElapsedTime => prevElapsedTime + 1);
                        }, 1000);
                    } else {
                        resetTimer();
                    }
                } else {
                    setIsWorkPhase(true);
                    timer = setInterval(() => {
                        setElapsedTimeInSeconds(prevElapsedTime => prevElapsedTime + 1);
                    }, 1000);
                }

            }
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isRunning, countDown, elapsedTimeInSeconds, maxDurationInSeconds]);


    const startTimer = () => {
        setIsRunning(true);
        setShowInputs(false);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setIsWorkPhase(false);
        setElapsedTimeInSeconds(0);
        setCountDown(10);
        setShowInputs(true);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const totalSeconds = maxDurationInSeconds || 60;
    let progress;
    if (maxDurationInSeconds) {
        progress = (elapsedTimeInSeconds / totalSeconds) * 100;
    } else {
        progress = ((elapsedTimeInSeconds % totalSeconds) / totalSeconds) * 100;
    }
    const countDownProgress = ((10 - countDown) / 10) * 100;
    return (
        <div style={{ width: '500px' }}>
            <div>
                <CircularProgressbar
                    value={(isWorkPhase ? progress : countDownProgress)}
                    text={
                        isWorkPhase ? formatTime(elapsedTimeInSeconds) :
                            isRunning ? `${countDown}s` :
                                "▶"
                    }
                    styles={buildStyles({
                        pathColor: isWorkPhase ? pathColor1 : pathColor2,
                        trailColor: trailColorVar,
                        textColor: textColorVar,
                    })}
                />
            </div>
            <div>
                <PlayButton style={{ width: '70px' }} onClick={startTimer}>Start</PlayButton>
                <PauseButton style={{ width: '70px' }} onClick={pauseTimer}>Pause</PauseButton>
                <BackButton style={{ width: '70px' }} onClick={resetTimer}>Reset</BackButton>
            </div>
            {showInputs && (
                <div className='row'>
                    <label className='col-6'>
                        Minutos:{' '}
                        <input className='form-input' style={{ width: '100%' }}
                            type="number"
                            value={maxDurationMinutes}
                            onChange={e => setMaxDurationMinutes(Math.max(0, parseInt(e.target.value)))}
                        />
                    </label>
                    <label className='col-6'>
                        Segundos:{' '}
                        <input className='form-input' style={{ width: '100%' }}
                            type="number"
                            value={maxDurationSeconds}
                            onChange={e => setMaxDurationSeconds(Math.min(59, Math.max(0, parseInt(e.target.value))))}
                        />
                    </label>

                </div>
            )}
        </div>
    );
}
export default TimerForTime;