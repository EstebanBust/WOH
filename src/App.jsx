import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerWithProgress from './timers/BasicTimer';
import TimerWithInterval from './timers/TimerInterval';
import TimerEmom from './timers/TimerEmom';
import TimerNav from './TimersNav';
import Footer from './footer';
import TimerForTime from './timers/ForTime';
import MapaRuta from './GpsRuta';

function App() {
  const [selectedTimer, setSelectedTimer] = useState('progress'); // Default selection

  const handleMenuSelection = (timerType) => {
    setSelectedTimer(timerType);
  };

  return (
    <main>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-2 d-flex align-items-center justify-content-center">
          <TimerNav handleMenuSelection={handleMenuSelection} />
        </div>
  
        <div className="col-sm-12 col-md-3 d-flex align-items-center justify-content-center">
          {selectedTimer === 'progress' && <TimerWithProgress initialDuration={60} pathColor1='#DC6765' pathColor2='#28C2D5' trailColorVar='#F5F4EC' textColorVar='#F5F4EC' />}
          {selectedTimer === 'interval' && <TimerWithInterval defaultWorkDuration={30} defaultRestDuration={30} defaultTotalRounds={10} pathColor1='#DC6765' pathColor2='#28C2D5' pathColor3='#7B7781' trailColorVar='#F5F4EC' textColorVar='#F5F4EC' />}
          {selectedTimer === 'emom' && <TimerEmom initialDuration={60} pathColor1='#DC6765' pathColor2='#28C2D5' trailColorVar='#F5F4EC' textColorVar='#F5F4EC' />}
          {selectedTimer === 'time' && <TimerForTime pathColor1='#DC6765' pathColor2='#28C2D5' trailColorVar='#F5F4EC' textColorVar='#F5F4EC' />}
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

