import React, { useState, useEffect } from 'react';

function ConversionPesoAKgs(props) {
  const [pesoEnKilogramos, setPesoEnKilogramos] = useState(0);

  useEffect(() => {
    // Función para convertir libras a kilogramos
    const convertirLibrasAKilogramos = (pesoEnLibras) => {
      const pesoEnKilogramos = pesoEnLibras * 0.453592;
      return pesoEnKilogramos.toFixed(0); // Redondear a 2 decimales
    };

    setPesoEnKilogramos(convertirLibrasAKilogramos(props.pesoEnLibras || 0));
  }, [props.pesoEnLibras]);

  return (
    <div>
      <p>Peso total en kilogramos: {pesoEnKilogramos}</p>
    </div>
  );
}

export default ConversionPesoAKgs;