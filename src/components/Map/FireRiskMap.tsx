import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { FirePredictionData } from '../../types/fire';
import { COLORS } from '../../utils/constants';
import 'leaflet/dist/leaflet.css';

interface FireRiskMapProps {
  predictions: FirePredictionData[];
  onZoneSelect?: (lat: number, lng: number) => void;
  height?: string;
}

export const FireRiskMap: React.FC<FireRiskMapProps> = ({ 
  predictions, 
  onZoneSelect, 
  height = '400px' 
}) => {
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      setMapReady(true);
    });
  }, []);

  const getRiskColor = (risk: number) => {
    if (risk >= 0.8) return COLORS.fire.critical;
    if (risk >= 0.6) return COLORS.fire.high;
    if (risk >= 0.4) return COLORS.fire.medium;
    return COLORS.fire.low;
  };

  const getRiskLabel = (risk: number) => {
    if (risk >= 0.8) return 'Critical';
    if (risk >= 0.6) return 'High';
    if (risk >= 0.4) return 'Medium';
    return 'Low';
  };

  if (!mapReady) {
    return (
      <div className="w-full bg-gray-100 rounded-lg flex items-center justify-center" style={{ height }}>
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  const center: LatLngExpression = [29.9457, 78.1642]; // Center of Uttarakhand

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {predictions.map((prediction, index) => (
          <div key={index}>
            <Circle
              center={[prediction.lat, prediction.lng]}
              radius={prediction.risk * 50000}
              pathOptions={{
                color: getRiskColor(prediction.risk),
                fillColor: getRiskColor(prediction.risk),
                fillOpacity: 0.3,
                weight: 2
              }}
              eventHandlers={{
                click: () => onZoneSelect?.(prediction.lat, prediction.lng)
              }}
            />
            <Marker
              position={[prediction.lat, prediction.lng]}
              eventHandlers={{
                click: () => onZoneSelect?.(prediction.lat, prediction.lng)
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{prediction.name}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p><span className="font-medium">Risk Level:</span> {getRiskLabel(prediction.risk)}</p>
                    <p><span className="font-medium">Temperature:</span> {prediction.temperature.toFixed(1)}°C</p>
                    <p><span className="font-medium">Humidity:</span> {prediction.humidity.toFixed(1)}%</p>
                    <p><span className="font-medium">Wind Speed:</span> {prediction.windSpeed.toFixed(1)} km/h</p>
                  </div>
                  {onZoneSelect && (
                    <button 
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      onClick={() => onZoneSelect(prediction.lat, prediction.lng)}
                    >
                      Run Simulation
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
};