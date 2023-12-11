import React, { useState, useEffect } from 'react';

function ConversionPesoALbs(props) {
  const [pesoEnLibras, setPesoEnLibras] = useState(0);

  useEffect(() => {
    // Función para convertir libras a kilogramos
    const convertirKilogramosALibras = (pesoEnKilogramos) => {
      const pesoEnLibras = pesoEnKilogramos * 2.20462;
      return pesoEnLibras.toFixed(0); // Redondear a 2 decimales
    };

    setPesoEnLibras(convertirKilogramosALibras(props.pesoEnKilogramos || 0));
  }, [props.pesoEnKilogramos]);

  return (
    <div>
      <p>Peso total en libras: {pesoEnLibras}</p>
    </div>
  );
}

export default ConversionPesoALbs;