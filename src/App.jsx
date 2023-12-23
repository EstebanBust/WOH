import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Nav';
import TimerWithProgress from './timers/BasicTimer';
import TimerWithInterval from './timers/TimerInterval';
import TimerEmom from './timers/TimerEmom';
import TimerNav from './TimersNav';
import Footer from './footer';
import TimerForTime from './timers/ForTime';
import MapaRuta from './GpsRuta';

function App() {
  const [selectedTimer, setSelectedTimer] = useState('progress');
  // colores timers
  const claro = '#F5F4EC';
  const rojo = '#DC6765';
  const azul = '#28C2D5';
  const gris = '#7B7781';

  const handleMenuSelection = (timerType) => {
    setSelectedTimer(timerType);
  }
  return (
    <main>
      <div className="container">
        <Navigation></Navigation>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-2 d-flex align-items-center justify-content-center">
            <TimerNav handleMenuSelection={handleMenuSelection} />
          </div>

          <div className="col-sm-12 col-md-3 d-flex align-items-center justify-content-center">
            {selectedTimer === 'progress' && <TimerWithProgress initialDuration={59} pathColor1={rojo} pathColor2={azul} trailColorVar={claro} textColorVar={claro} />}
            {selectedTimer === 'interval' && <TimerWithInterval defaultWorkDuration={30} defaultRestDuration={30} defaultTotalRounds={10} pathColor1={rojo} pathColor2={azul} pathColor3={gris} trailColorVar={claro} textColorVar={claro} />}
            {selectedTimer === 'emom' && <TimerEmom initialDuration={60} pathColor1={rojo} pathColor2={azul} trailColorVar={claro} textColorVar={claro} />}
            {selectedTimer === 'time' && <TimerForTime pathColor1={rojo} pathColor2={azul} trailColorVar={claro} textColorVar={claro} />}
          </div>

          <div className="col-sm-12 col-lg-7 d-flex align-items-center justify-content-center">
            <MapaRuta></MapaRuta>
          </div>
        </div>
      </div>
      <Footer />
    </main>

  );
}

export default App;

