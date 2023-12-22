import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import BackButton from './BackButton';

const TimerForTime = ({ initialDuration, pathColor1, pathColor2, trailColorVar, textColorVar }) => {
    const [duration, setDuration] = useState(initialDuration || 0);
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkPhase, setIsWorkPhase] = useState(false);
    const [iniciarConteo, setInciarConteo] = useState(false);
    const [countDown, setCountDown] = useState(10);
    const tono1 = new Audio('/tonos/tono1.mp3');
    const tono2 = new Audio('/tonos/tono2.mp3');

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    useEffect(() => {
        let timer;
        if (duration) {
            // logica del cronometro con duracion maxima
            console.log("condu");
            if (countDown <= 4 && countDown > 1) {
                tono2.play();
            }
            if (countDown === 1) {
                tono1.play();
            }

            if (countDown > 0 && isRunning) {
                const countdownTimer = setTimeout(() => {
                    setCountDown(prevCountdown => prevCountdown - 1);
                }, 1000);
            }

            if (isRunning && countDown === 0) {
                setIsWorkPhase(true);
                timer = setInterval(() => {
                    setTimeLeft(prevTimeLeft => prevTimeLeft + 1);
                }, 1000);
            }
            if (timeLeft === duration) {
                resetTimer();
            }
        } else {
            // cronometro sin duracion
            console.log("sindu");
            if (countDown <= 4 && countDown > 1) {
                tono2.play();
            }
            if (countDown === 1) {
                tono1.play();
            }

            if (countDown > 0 && isRunning) {
                const countdownTimer = setTimeout(() => {
                    setCountDown(prevCountdown => prevCountdown - 1);
                }, 1000);
            }
            if (isRunning && countDown === 0) {
                setIsWorkPhase(true);
                timer = setInterval(() => {
                    setTimeLeft(prevTimeLeft => prevTimeLeft + 1);
                }, 1000);
            }
        }
        return () => clearInterval(timer);
    }, [duration, isRunning, timeLeft, countDown]);

    const startTimer = () => {
        setTimeLeft(0);
        setInciarConteo(true);
        setCountDown(10);
        setIsWorkPhase(false);
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setInciarConteo(false);
        setTimeLeft(duration);
        setIsRunning(false);
        setIsWorkPhase(false);
    };
    let progress;
    if (duration) {
        progress = (timeLeft % duration) / duration;
    } else {
        progress = (timeLeft % 60) / 60;
    }
    const countDownProgress = (10 - countDown) / 10;

    return (
        <div style={{ width: '250px' }}>
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
            <div>
                <label>
                    Duración (segundos):{' '}
                    <input
                        type="number"
                        value={duration}
                        onChange={e => setDuration(Math.max(0, parseInt(e.target.value)))}
                    />
                </label>
            </div>
        </div>
    );
}
export default TimerForTime;