import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapaAtleta = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error("Error obteniendo la ubicación:", err);
        }
      );
    } else {
      console.log("La geolocalización no está disponible en este navegador.");
    }
  }, []);

  const pos = position ? [position.lat, position.lng] : [-33.4594048, -70.6576384];
  
  return (
    <MapContainer
      center={pos}
      zoom={13}
      style={{ height: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {position && (
        <Marker position={[position.lat, position.lng]}>
          <Popup>¡Aquí está el atleta!</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapaAtleta;
