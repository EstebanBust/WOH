import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';

const MapaAtleta = () => {
  const [position, setPosition] = useState(null);
  const [route, setRoute] = useState([]);
  const featureGroupRef = React.useRef();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setPosition(newPosition);
          setRoute((prevRoute) => [...prevRoute, [latitude, longitude]]);
        },
        (err) => {
          console.error("Error obteniendo la ubicación:", err);
        }
      );
    } else {
      console.log("La geolocalización no está disponible en este navegador.");
    }
  }, []);

  return (
    <MapContainer
      center={position || [-33.4594048, -70.6576384]}
      zoom={13}
      style={{ height: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          draw={{
            polyline: {
              shapeOptions: {
                color: 'blue',
              },
            },
            polygon: false,
            circle: false,
            rectangle: false,
            marker: false,
          }}
          edit={{
            edit: false,
            remove: false,
          }}
          featureGroup={featureGroupRef.current}
        />
      </FeatureGroup>
      {position && (
        <>
          <Marker position={[position.lat, position.lng]}>
            {/* Puedes personalizar el marcador aquí */}
          </Marker>
          <Polyline positions={route} color="blue" />
        </>
      )}
    </MapContainer>
  );
};

export default MapaAtleta;

