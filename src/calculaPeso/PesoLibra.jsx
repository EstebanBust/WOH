import React, { useState } from 'react';
import './PesoComponente.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConversionPesoAKgs from './aKgs';

const PesoComponenteLbs = () => {
    const [cantidadDiscos, setCantidadDiscos] = useState({
        discos55: 0,
        discos45: 0,
        discos35: 0,
        discos25: 0,
        discos15: 0,
        discos10: 0,
        discos5: 0,
        discos2: 0,
        discos1: 0,
    });

    const [pesoBarra, setPesoBarra] = useState(45); // Valor por defecto 20kg

    const handleCantidadDiscosChange = (e, tipoDisco) => {
        const nuevaCantidad = parseInt(e.target.value) || 0;
        setCantidadDiscos({ ...cantidadDiscos, [tipoDisco]: nuevaCantidad });
    };

    const handlePesoBarraChange = (e) => {
        setPesoBarra(parseInt(e.target.value));
    };

    // Peso de cada disco
    const pesosDiscos = {
        discos55: 55,
        discos45: 45,
        discos35: 35,
        discos25: 25,
        discos15: 15,
        discos10: 10,
        discos5: 5,
        discos2: 2,
        discos1: 1,
    };

    // Calcula el peso total
    const pesoTotal = Object.keys(cantidadDiscos).reduce((total, tipoDisco) => {
        return total + cantidadDiscos[tipoDisco] * pesosDiscos[tipoDisco];
    }, pesoBarra);
    return (
        <div className="container m-1">
            <div className="mb-3 justify-content-center d-flex">
                <label htmlFor="pesoBarra" className="form-label">Peso de la barra: </label>
                <select id="pesoBarra" className="form-select w-25" value={pesoBarra} onChange={handlePesoBarraChange}>
                    <option value={44}>20 kg</option>
                    <option value={33}>15 kg</option>
                    <option value={22}>10 kg</option>
                </select>
            </div>
            <div className="row mb-3">
                <h4>Cantidad de discos:</h4>
                {Object.keys(cantidadDiscos).map((tipoDisco) => (
                    <div className={`col w-25 mb-3 C${pesosDiscos[tipoDisco]}`} key={tipoDisco}>
                        <label className="col">{pesosDiscos[tipoDisco]} Lbs:</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control"
                                value={cantidadDiscos[tipoDisco]}
                                onChange={(e) => handleCantidadDiscosChange(e, tipoDisco)}
                                min={0}
                                inputMode="numeric"
                                pattern="[0-20]*"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mb-3">
                <h3>Peso total: {pesoTotal} Lbs</h3>
                <ConversionPesoAKgs pesoEnLibras={pesoTotal}/>
            </div>
        </div>
    );
};

export default PesoComponenteLbs;
