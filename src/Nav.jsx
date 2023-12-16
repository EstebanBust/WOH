// Navigation.js

import React from 'react';

const Navigation = ({ handleMenuSelection }) => {
  const handleItemClick = (timerType) => {
    handleMenuSelection(timerType); // Llama a la función handleMenuSelection con el tipo de temporizador seleccionado
  };

  return (
    <div className="navigation">
      <ul>
        <li className='btn btn-danger' onClick={() => handleItemClick('progress')}>Timer With Progress</li>
        <li className='btn btn-dark' onClick={() => handleItemClick('interval')}>Timer With Interval</li>
        <li className='btn btn-success' onClick={() => handleItemClick('emom')}>Timer EMOM</li>
        <li className='btn btn-primary' onClick={() => handleItemClick('time')}>Timer For Time</li>
      </ul>
    </div>
  );
};

export default Navigation;
