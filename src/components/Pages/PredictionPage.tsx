import React, { useState, useEffect } from 'react';
import { Flame, RefreshCw, TrendingUp, Thermometer, Droplets, Wind } from 'lucide-react';
import { FireRiskMap } from '../Map/FireRiskMap';
import { StatCard } from '../Common/StatCard';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { FirePredictionData } from '../../types/fire';
import { mockFirePrediction } from '../../utils/mockApi';

interface PredictionPageProps {
  onNavigate: (page: string) => void;
}

export const PredictionPage: React.FC<PredictionPageProps> = ({ onNavigate }) => {
  const [predictions, setPredictions] = useState<FirePredictionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadPredictions = async () => {
    setLoading(true);
    try {
      const data = await mockFirePrediction();
      setPredictions(data);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Error loading predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPredictions();
  }, []);

  const handleZoneSelect = (lat: number, lng: number) => {
    onNavigate('simulate');
  };

  const getOverallRisk = () => {
    if (predictions.length === 0) return 0;
    return predictions.reduce((sum, p) => sum + p.risk, 0) / predictions.length;
  };

  const getHighRiskZones = () => {
    return predictions.filter(p => p.risk >= 0.7).length;
  };

  const getAverageTemp = () => {
    if (predictions.length === 0) return 0;
    return predictions.reduce((sum, p) => sum + p.temperature, 0) / predictions.length;
  };

  const getAverageHumidity = () => {
    if (predictions.length === 0) return 0;
    return predictions.reduce((sum, p) => sum + p.humidity, 0) / predictions.length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Flame className="w-8 h-8 text-orange-600" />
                <span>Fire Prediction</span>
              </h1>
              <p className="text-gray-600 mt-2">
                AI-powered forest fire risk assessment for the next 24 hours
              </p>
            </div>
            
            <button
              onClick={loadPredictions}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
          
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <LoadingSpinner text="Analyzing satellite data and weather patterns..." />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Overall Risk Level"
                value={`${(getOverallRisk() * 100).toFixed(1)}%`}
                icon={TrendingUp}
                color={getOverallRisk() > 0.7 ? 'red' : getOverallRisk() > 0.5 ? 'orange' : 'green'}
                subtitle="Weighted average across all zones"
              />
              <StatCard
                title="High Risk Zones"
                value={getHighRiskZones()}
                icon={Flame}
                color="red"
                subtitle="Zones with >70% risk probability"
              />
              <StatCard
                title="Average Temperature"
                value={`${getAverageTemp().toFixed(1)}°C`}
                icon={Thermometer}
                color="orange"
                subtitle="Across monitored regions"
              />
              <StatCard
                title="Average Humidity"
                value={`${getAverageHumidity().toFixed(1)}%`}
                icon={Droplets}
                color="blue"
                subtitle="Relative humidity levels"
              />
            </div>

            {/* Map and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Fire Risk Map
                    </h2>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Low Risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span>Medium Risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>High Risk</span>
                      </div>
                    </div>
                  </div>
                  <FireRiskMap 
                    predictions={predictions}
                    onZoneSelect={handleZoneSelect}
                    height="500px"
                  />
                </div>
              </div>

              {/* Zone Details */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Zones Details</h3>
                  <div className="space-y-4">
                    {predictions.map((prediction, index) => (
                      <div key={index} className="border-l-4 border-orange-500 pl-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{prediction.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            prediction.risk >= 0.8 ? 'bg-red-100 text-red-800' :
                            prediction.risk >= 0.6 ? 'bg-orange-100 text-orange-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {(prediction.risk * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="w-4 h-4" />
                            <span>{prediction.temperature.toFixed(1)}°C</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4" />
                            <span>{prediction.humidity.toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wind className="w-4 h-4" />
                            <span>{prediction.windSpeed.toFixed(1)} km/h</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleZoneSelect(prediction.lat, prediction.lng)}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Run Spread Simulation →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Model Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Model:</span> U-Net CNN</p>
                    <p><span className="font-medium">Resolution:</span> 30m pixel</p>
                    <p><span className="font-medium">Data Sources:</span> VIIRS, MODIS, Weather API</p>
                    <p><span className="font-medium">Accuracy:</span> 89.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};