import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Clock, TrendingUp, Activity } from 'lucide-react';
import { FireRiskMap } from '../Map/FireRiskMap';
import { StatCard } from '../Common/StatCard';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { SpreadSimulationData } from '../../types/fire';
import { mockSpreadSimulation } from '../../utils/mockApi';

export const SimulationPage: React.FC = () => {
  const [simulationData, setSimulationData] = useState<SpreadSimulationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentHour, setCurrentHour] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedZone, setSelectedZone] = useState<{lat: number, lng: number} | null>(null);

  const loadSimulation = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const data = await mockSpreadSimulation(lat, lng);
      setSimulationData(data);
      setCurrentHour(0);
      setSelectedZone({ lat, lng });
    } catch (error) {
      console.error('Error loading simulation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPlaying && currentHour < simulationData.length - 1) {
      const timer = setTimeout(() => {
        setCurrentHour(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentHour, simulationData.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentHour(0);
    setIsPlaying(false);
  };

  const getCurrentData = () => {
    if (simulationData.length === 0 || currentHour >= simulationData.length) return null;
    return simulationData[currentHour];
  };

  const getSpreadStats = () => {
    const currentData = getCurrentData();
    if (!currentData) return { zones: 0, intensity: 0, area: 0 };
    
    return {
      zones: currentData.zones.length,
      intensity: currentData.zones.reduce((sum, zone) => sum + zone.intensity, 0) / currentData.zones.length,
      area: currentData.zones.reduce((sum, zone) => sum + zone.spread, 0)
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Zap className="w-8 h-8 text-blue-600" />
            <span>Fire Simulation</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Cellular Automata-based fire spread prediction with hourly progression
          </p>
        </div>

        {/* Quick Start */}
        {simulationData.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Start Fire Spread Simulation
              </h2>
              <p className="text-gray-600 mb-6">
                Click on any location on the map to begin the simulation
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => loadSimulation(30.0668, 79.0193)}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <h3 className="font-medium">Dehradun Forest</h3>
                  <p className="text-sm text-gray-600">High risk zone</p>
                </button>
                <button
                  onClick={() => loadSimulation(29.3803, 79.4636)}
                  className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <h3 className="font-medium">Nainital Forest</h3>
                  <p className="text-sm text-gray-600">Critical risk zone</p>
                </button>
                <button
                  onClick={() => loadSimulation(30.7268, 78.0551)}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <h3 className="font-medium">Mussoorie Hills</h3>
                  <p className="text-sm text-gray-600">High risk zone</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <LoadingSpinner text="Running cellular automata simulation..." />
          </div>
        )}

        {simulationData.length > 0 && (
          <>
            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Time Control
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-lg font-medium">
                      Hour {currentHour + 1} of {simulationData.length}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleReset}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                      isPlaying 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                </div>
              </div>
              
              {/* Time Slider */}
              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max={simulationData.length - 1}
                  value={currentHour}
                  onChange={(e) => setCurrentHour(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Hour 1</span>
                  <span>Hour {simulationData.length}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Active Fire Zones"
                value={getSpreadStats().zones}
                icon={Activity}
                color="orange"
                subtitle="Currently burning areas"
              />
              <StatCard
                title="Average Intensity"
                value={`${(getSpreadStats().intensity * 100).toFixed(1)}%`}
                icon={TrendingUp}
                color="red"
                subtitle="Fire intensity level"
              />
              <StatCard
                title="Total Spread Area"
                value={`${getSpreadStats().area.toFixed(1)} km²`}
                icon={Zap}
                color="red"
                subtitle="Estimated affected area"
              />
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Fire Spread Visualization
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Starting Point</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>Spreading Fire</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>High Intensity</span>
                  </div>
                </div>
              </div>
              
              {getCurrentData() && (
                <FireRiskMap 
                  predictions={getCurrentData()!.zones.map(zone => ({
                    lat: zone.lat,
                    lng: zone.lng,
                    risk: zone.intensity,
                    temperature: 30 + Math.random() * 10,
                    humidity: 40 + Math.random() * 20,
                    windSpeed: 5 + Math.random() * 10,
                    windDirection: Math.random() * 360,
                    timestamp: new Date().toISOString(),
                    name: `Fire Zone ${zone.lat.toFixed(2)}, ${zone.lng.toFixed(2)}`
                  }))}
                  height="500px"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};