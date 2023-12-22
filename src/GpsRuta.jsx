import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';

const MapaAtleta = () => {
  const [position, setPosition] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [isCounting, setIsCounting] = useState(true); // Estado para controlar el conteo
  const featureGroupRef = React.useRef();

  useEffect(() => {
    let watchPositionId = null;

    if ("geolocation" in navigator) {
      watchPositionId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setPosition(newPosition);
          const newRoute = [...route, [latitude, longitude]];
          setRoute(newRoute);
          if (isCounting) {
            calculateDistance(newRoute);
          }
        },
        (err) => {
          console.error("Error obteniendo la ubicación:", err);
        }
      );
    } else {
      console.log("La geolocalización no está disponible en este navegador.");
    }

    // Limpiar el watcher de geolocalización cuando el componente se desmonta
    return () => {
      if (watchPositionId) {
        navigator.geolocation.clearWatch(watchPositionId);
      }
    };
  }, [route, isCounting]); // Agrega 'isCounting' a las dependencias para que el useEffect se active con cada cambio

  const calculateDistance = (newRoute) => {
    let totalDistance = 0;
    for (let i = 1; i < newRoute.length; i++) {
      const prevPoint = newRoute[i - 1];
      const currPoint = newRoute[i];
      const distanceBetweenPoints = getDistance(prevPoint[0], prevPoint[1], currPoint[0], currPoint[1]);
      totalDistance += distanceBetweenPoints;
    }
    setDistance(totalDistance);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radio de la Tierra en metros
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const toggleCounting = () => {
    setDistance(0); // Reiniciar la distancia
    setRoute([]); // Limpiar la ruta
    setIsCounting(!isCounting);
  };

  return (
    <div>
      {showMap && (
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
      )}
      <p>Distancia total recorrida: {distance.toFixed(2)} metros</p>
      <button onClick={toggleMap}>
        {showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
      </button>
      <button onClick={toggleCounting}>
        {isCounting ? 'Detener GPS' : 'Reiniciar GPS'}
      </button>
    </div>
  );
};

export default MapaAtleta;
