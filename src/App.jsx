import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerWithProgress from './timers/BasicTimer';
import TimerWithInterval from './timers/TimerInterval';
import TimerEmom from './timers/TimerEmom';
import Navigation from './Nav';
import Footer from './footer';
import TimerForTime from './timers/ForTime';

function App() {
  const [selectedTimer, setSelectedTimer] = useState('progress'); // Default selection

  const handleMenuSelection = (timerType) => {
    setSelectedTimer(timerType);
  };

  return (
    <main>
      <div className="container">
        <Navigation handleMenuSelection={handleMenuSelection} />
        
        <div className="row">
          {selectedTimer === 'progress' && <TimerWithProgress initialDuration={60} />}
          {selectedTimer === 'interval' && <TimerWithInterval defaultWorkDuration={30} defaultRestDuration={30} defaultTotalRounds={10} />}
          {selectedTimer === 'emom' && <TimerEmom />}
          {selectedTimer === 'time' && <TimerForTime />}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;

