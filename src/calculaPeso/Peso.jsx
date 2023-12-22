import React, { useState } from 'react';
import './PesoComponente.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConversionPesoALbs from './aLbs';

const PesoComponenteKgs = () => {
    const [cantidadDiscos, setCantidadDiscos] = useState({
        discos25: 0,
        discos20: 0,
        discos15: 0,
        discos10: 0,
        discos7_5: 0,
        discos5: 0,
        discos2: 0,
        discos1: 0,
    });
    const replaceDotsWithUnderscores = (className) => {
        return className.replace(/\./g, '_');
    };

    const [pesoBarra, setPesoBarra] = useState(20); // Valor por defecto 20kg

    const handleCantidadDiscosChange = (e, tipoDisco) => {
        const nuevaCantidad = parseInt(e.target.value) || 0;
        setCantidadDiscos({ ...cantidadDiscos, [tipoDisco]: nuevaCantidad });
    };

    const handlePesoBarraChange = (e) => {
        setPesoBarra(parseInt(e.target.value));
    };

    // Peso de cada disco
    const pesosDiscos = {
        discos25: 25,
        discos20: 20,
        discos15: 15,
        discos10: 10,
        discos7_5: 7.5,
        discos5: 5,
        discos2: 2,
        discos1: 1,
    };

    // Calcula el peso total
    const pesoTotal = Object.keys(cantidadDiscos).reduce((total, tipoDisco) => {
        return total + cantidadDiscos[tipoDisco] * pesosDiscos[tipoDisco];
    }, pesoBarra);

    return (
        <div className='container m-1'>
            <div className="row">
                <div className="col-lg-6 mb-3"> 
                    <h4>Peso total: <strong>{pesoTotal}</strong> kgs</h4>
                    <ConversionPesoALbs pesoEnKilogramos={pesoTotal} />
                </div>
                <div className="col-lg-6 mb-3">
                    <label htmlFor="pesoBarra" className="form-label">Peso de la barra: </label>
                    <select className="form-select w-100" id="pesoBarra" value={pesoBarra} onChange={handlePesoBarraChange}>
                        <option value={20}>20 kg</option>
                        <option value={15}>15 kg</option>
                        <option value={10}>10 kg</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <h4>Cantidad de discos:</h4>
                {Object.keys(cantidadDiscos).map((tipoDisco) => (
                    <div className={`col w-25 mb-3 ${replaceDotsWithUnderscores(`K${pesosDiscos[tipoDisco]}`)}`} key={tipoDisco}>
                        <label className="col">{pesosDiscos[tipoDisco]} kg:</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control"
                                value={cantidadDiscos[tipoDisco]}
                                onChange={(e) => handleCantidadDiscosChange(e, tipoDisco)}
                                min={0}
                                inputMode="numeric"
                                pattern="[0-20]*"
                            /></div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default PesoComponenteKgs;
