import React from 'react';

const TimerNav = ({ handleMenuSelection }) => {
  const handleItemClick = (timerType) => {
    handleMenuSelection(timerType);
  };

  return (
    <div className="navigation navbar">
      <ul>
        <li>
          <button className='btn btn-danger' onClick={() => handleItemClick('progress')}>AMRAP</button>
        </li>
        <li>
          <button className='btn btn-dark' onClick={() => handleItemClick('interval')}>TABATA</button>
        </li>
        <li>
          <button className='btn btn-success' onClick={() => handleItemClick('emom')}>EMOM</button>
        </li>
        <li>
          <button className='btn btn-primary' onClick={() => handleItemClick('time')}>For Time</button>
        </li>
      </ul>
    </div>
  );
};

export default TimerNav;
