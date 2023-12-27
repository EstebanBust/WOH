import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import BackButton from './BackButton';

const TimerForTime = ({ initialDuration, pathColor1, pathColor2, trailColorVar, textColorVar }) => {
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [durationSeconds, setDurationSeconds] = useState(initialDuration);
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkPhase, setIsWorkPhase] = useState(false);
    const [iniciarConteo, setInciarConteo] = useState(false);
    const [countDown, setCountDown] = useState(10);
    const [showInputs, setShowInputs] = useState(true);
    const tono1 = new Audio('/tonos/tono1.mp3');
    const tono2 = new Audio('/tonos/tono2.mp3');

    useEffect(() => {
        setTimeLeft(durationMinutes * 60 + durationSeconds);
      }, [durationMinutes, durationSeconds]);

    useEffect(() => {
        let timer;
        if (isRunning) {
            if (countDown <= 4 && countDown > 1) {
                tono2.play();
            } else if (countDown === 1) {
                tono1.play();
            }

            const countdownTimer = setTimeout(() => {
                setCountDown(prevCountdown => prevCountdown - 1);
            }, 1000);
        }


        if (durationMinutes * 60 + durationSeconds) {
            // logica del cronometro con duracion maxima

            if (isRunning && countDown === 0) {
                setIsWorkPhase(true);
                timer = setInterval(() => {
                    setTimeLeft(prevTimeLeft => prevTimeLeft + 1);
                }, 1000);
            }
            if (timeLeft >= (durationMinutes * 60 + durationSeconds)) {
                resetTimer();
            }
        } else {
            // cronometro sin duracion
            if (isRunning && countDown === 0) {
                setIsWorkPhase(true);
                timer = setInterval(() => {
                    setTimeLeft(prevTimeLeft => prevTimeLeft + 1);
                }, 1000);
            }
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft,countDown,durationMinutes,durationSeconds]);
 
    const startTimer = () => {
        setTimeLeft(0);
        setInciarConteo(true);
        setCountDown(10);
        setIsWorkPhase(false);
        setIsRunning(true);
        setShowInputs(false);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setInciarConteo(false);
        setTimeLeft(durationMinutes * 60 + durationSeconds);
        setIsRunning(false);
        setIsWorkPhase(false);
        setShowInputs(true);
    };
    let progress;
    if (durationMinutes || durationSeconds) {
        const totalTimeInSeconds = durationMinutes * 60 + durationSeconds;
        progress = (totalTimeInSeconds - timeLeft) / totalTimeInSeconds;
    } else {
        // Si no se ha establecido una duración total, mostrar el progreso basado en los segundos transcurridos
        progress = (timeLeft % 60) / 60;
    }
    
    const countDownProgress = (10 - countDown) / 10;

    return (
        <div style={{ width: '500px' }}>
            <div>
                <CircularProgressbar
                    value={(isWorkPhase ? progress : countDownProgress) * 100}
                    text={
                        isWorkPhase ? `${timeLeft}s` :
                            iniciarConteo ? `${countDown}s` :
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
                            value={durationMinutes}
                            onChange={e => setDurationMinutes(Math.max(0, parseInt(e.target.value)))}
                        />
                    </label>
                    <label className='col-6'>
                        Segundos:{' '}
                        <input className='form-input' style={{ width: '100%' }}
                            type="number"
                            value={durationSeconds}
                            onChange={e => {
                                const value = Math.min(59, Math.max(0, parseInt(e.target.value)));
                                setDurationSeconds(value);
                            }}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
export default TimerForTime;