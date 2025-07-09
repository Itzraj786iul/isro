import { FirePredictionData, SpreadSimulationData, ModelMetrics, DownloadableOutput } from '../types/fire';
import { MOCK_FIRE_ZONES } from './constants';

export const mockFirePrediction = async (): Promise<FirePredictionData[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return MOCK_FIRE_ZONES.map(zone => ({
    ...zone,
    temperature: Math.random() * 20 + 25,
    humidity: Math.random() * 40 + 30,
    windSpeed: Math.random() * 15 + 5,
    windDirection: Math.random() * 360,
    timestamp: new Date().toISOString()
  }));
};

export const mockSpreadSimulation = async (startLat: number, startLng: number): Promise<SpreadSimulationData[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  return hours.map(hour => ({
    hour,
    zones: Array.from({ length: Math.min(hour * 2, 20) }, (_, i) => ({
      lat: startLat + (Math.random() - 0.5) * 0.01 * hour,
      lng: startLng + (Math.random() - 0.5) * 0.01 * hour,
      intensity: Math.max(0.1, 1 - (hour * 0.05) + Math.random() * 0.3),
      spread: Math.min(1, hour * 0.1 + Math.random() * 0.2)
    }))
  }));
};

export const mockModelMetrics = async (): Promise<ModelMetrics> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    accuracy: 0.89,
    precision: 0.92,
    recall: 0.87,
    iou: 0.76,
    lastUpdated: new Date().toISOString()
  };
};

export const mockDownloadableOutputs = async (): Promise<DownloadableOutput[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: '1',
      type: 'prediction',
      format: 'geotiff',
      name: 'fire_prediction_2024_01_15.tif',
      size: '2.4 MB',
      downloadUrl: '#',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      type: 'spread',
      format: 'gif',
      name: 'fire_spread_animation_12h.gif',
      size: '8.7 MB',
      downloadUrl: '#',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      type: 'prediction',
      format: 'json',
      name: 'fire_metadata.json',
      size: '156 KB',
      downloadUrl: '#',
      createdAt: new Date().toISOString()
    }
  ];
};