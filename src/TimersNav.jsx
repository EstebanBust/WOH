import React from 'react';

const TimerNav = ({ handleMenuSelection }) => {
  const handleItemClick = (timerType) => {
    handleMenuSelection(timerType);
  };

  return (
    <div className="navigationTimers navbar-collapse navbar">
      <ul className="navbar-nav mr-auto d-flex flex-row flex-md-column">
        <li className="nav-item">
          <button className='btn btn-danger' onClick={() => handleItemClick('progress')}>AMRAP</button>
        </li>
        <li className="nav-item">
          <button className='btn btn-dark' onClick={() => handleItemClick('interval')}>TABATA</button>
        </li>
        <li className="nav-item">
          <button className='btn btn-success' onClick={() => handleItemClick('emom')}>EMOM</button>
        </li>
        <li className="nav-item">
          <button className='btn btn-primary' onClick={() => handleItemClick('time')}>For Time</button>
        </li>
      </ul>
    </div>

  );
};

export default TimerNav;
