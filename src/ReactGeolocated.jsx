import React from 'react';
import { geolocated } from 'react-geolocated';

const GeolocationComponent = (props) => {
  const { isGeolocationAvailable, isGeolocationEnabled, coords } = props;

  if (!isGeolocationAvailable) {
    return <div>La geolocalización no está disponible en este navegador.</div>;
  }

  if (!isGeolocationEnabled) {
    return <div>La geolocalización no está habilitada. Por favor, activa la geolocalización en tu dispositivo.</div>;
  }

  if (!coords) {
    return <div>Obteniendo ubicación...</div>;
  }

  return (
    <div>
      <h2>Ubicación actual:</h2>
      <p>Latitud: {coords.latitude}</p>
      <p>Longitud: {coords.longitude}</p>
      <p>Precisión: {coords.accuracy}</p>
      {/* Aquí puedes integrar esta información en tu mapa o en otras partes de tu aplicación */}
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(GeolocationComponent);
