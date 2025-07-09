export interface FirePredictionData {
  lat: number;
  lng: number;
  risk: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  timestamp: string;
}

export interface SpreadSimulationData {
  hour: number;
  zones: Array<{
    lat: number;
    lng: number;
    intensity: number;
    spread: number;
  }>;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  iou: number;
  lastUpdated: string;
}

export interface DownloadableOutput {
  id: string;
  type: 'prediction' | 'spread' | 'animation';
  format: 'geotiff' | 'png' | 'json' | 'gif';
  name: string;
  size: string;
  downloadUrl: string;
  createdAt: string;
}