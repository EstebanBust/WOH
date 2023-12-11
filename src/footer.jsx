import React from "react";
import { useState } from 'react'
import PesoComponenteKgs from './calculaPeso/Peso'
import PesoComponenteLbs from './calculaPeso/PesoLibra'

const Footer = () =>{
    const [selectedOption, setSelectedOption] = useState('lbs');

    const handleSelectorChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return(
        <footer className="footer">
            <div className="mx-auto text-center d-block">
          <select className='text-center form-select' onChange={handleSelectorChange} value={selectedOption}>
            <option value="lbs">Libras a Kilogramos</option>
            <option value="kgs">Kilogramos a Libras</option>
          </select>
          <div className={`${selectedOption === 'kgs' ? 'show' : 'hide'}`}>
            <PesoComponenteKgs />
          </div>
          <div className={`${selectedOption === 'lbs' ? 'show' : 'hide'}`}>
            <PesoComponenteLbs />
          </div>
        </div>
        </footer>
    )
}
export default Footer;