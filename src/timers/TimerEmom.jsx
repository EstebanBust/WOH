import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import BackButton from './BackButton';

const TimerEmom = ({ initialDuration, pathColor1, pathColor2, trailColorVar, textColorVar }) => {
    const [duration, setDuration] = useState(initialDuration);
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [isRunning, setIsRunning] = useState(false);
    const [rondas, setRondas] = useState(10);
    const [currentRound, setCurrentRound] = useState(0);
    const [countDown, setCountDown] = useState(10);
    const [isWorkPhase, setIsWorkPhase] = useState(false);
    const [iniciarConteo, setInciarConteo] = useState(false);
    const tono1 = new Audio('/tonos/tono1.mp3');
    const tono2 = new Audio('/tonos/tono2.mp3');

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

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
        } else if (currentRound <= rondas && countDown === 0) {
            setCurrentRound(currentRound + 1);
            if (isRunning) {
                setTimeLeft(duration);
            }

        }
        if (timeLeft === 0) {
            setInciarConteo(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, countDown, rondas, duration]);

    const startTimer = () => {
        setInciarConteo(true);
        setCountDown(10);
        setIsWorkPhase(false);
        setIsRunning(true);
    }

    const pauseTimer = () => {
        setIsRunning(false);
    }

    const resetTimer = () => {
        setInciarConteo(false);
        setTimeLeft(duration);
        setIsRunning(false);
        setRondas(rondas);
        setCountDown(10);
    }

    const progress = (duration - timeLeft) / duration;
    const countDownProgress = (10 - countDown) / 10;

    return (
        <div style={{ width: '250px' }}>
            <div>
                <CircularProgressbar
                    value={(countDown === 0 ? progress : countDownProgress) * 100}
                    text={
                        countDown === 0 ? `${timeLeft}s` :
                            iniciarConteo ? `${countDown}s` :
                                "▶"
                    }
                    styles={buildStyles({
                        pathColor: countDown === 0 ? pathColor1 : pathColor2,
                        trailColor: trailColorVar,
                        textColor: textColorVar,
                    })}
                />
            </div>
            <div>
                <span>{`Round: ${currentRound}/${rondas}`}</span>
            </div>
            <div>
                <PlayButton style={{ width: '70px' }} onClick={startTimer}>Start</PlayButton>
                <PauseButton style={{ width: '70px' }} onClick={pauseTimer}>Pause</PauseButton>
                <BackButton style={{ width: '70px' }} onClick={resetTimer}>Reset</BackButton>
            </div>
            <div>
                <label >
                    Rondas : {' '}
                    <input type="number" value={rondas} onChange={e => setRondas(Math.max(0, parseInt(e.target.value)))} />
                </label>
                <label>
                    Intervalo (segundos):{' '}
                    <input type="number" value={duration} onChange={e => setDuration(Math.max(0, parseInt(e.target.value)))} />
                </label>
            </div>
        </div>
    )
};
export default TimerEmom;