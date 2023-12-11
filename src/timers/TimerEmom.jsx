import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const TimerEmom = ({ initialDuration = 60 }) => {
    const [duration, setDuration] = useState(initialDuration);
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [isRunning, setIsRunning] = useState(false);
    const [rondas, setRondas] = useState(10);
    const [currentRound, setCurrentRound] = useState(0);


    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    useEffect(() => {
        let timer;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
        } else if (currentRound <= rondas) {
            setCurrentRound(currentRound + 1);
            if (isRunning) {
                setTimeLeft(duration);
            }

        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const startTimer = () => {
        setIsRunning(true);
    }

    const pauseTimer = () => {
        setIsRunning(false);
    }

    const resetTimer = () => {
        setTimeLeft(duration);
        setIsRunning(false);
        setRondas(rondas)
    }

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
                <span>{`Round: ${currentRound - 1}/${rondas}`}</span>
            </div>
            <div>
                <button onClick={startTimer}>play</button>
                <button onClick={pauseTimer}>pause</button>
                <button onClick={resetTimer}>reset</button>
            </div>
            <div>
                <label >
                    Rondas : {' '}
                    <input type="number" value={rondas} onChange={e => setRondas(Math.max(0, parseInt(e.target.value)))} />
                </label>
                <label>
                    Intervalo (seconds):{' '}
                    <input type="number" value={duration} onChange={e => setDuration(Math.max(0, parseInt(e.target.value)))} />
                </label>
            </div>
        </div>
    )
};
export default TimerEmom;