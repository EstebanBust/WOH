import React from 'react';

const Navigation = ({ handleMenuSelection }) => {
    const handleItemClick = (sectionSelection) => {
        handleMenuSelection(sectionSelection);
    };

    return (
        <div className="navigation navbar">
            <button className='btn btn-danger' onClick={() => handleItemClick('progress')}>AMRAP</button>
        </div>
    );
};

export default Navigation;
