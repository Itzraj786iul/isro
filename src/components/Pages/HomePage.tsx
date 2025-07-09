import React from 'react';
import { Shield, Flame, Zap, Globe, ArrowRight, AlertTriangle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="w-16 h-16 text-orange-600" />
              <h1 className="text-5xl font-bold text-gray-900">
                Agni<span className="text-orange-600">Rakshak</span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-4">
              AI-Powered Forest Fire Forecasting & Spread Simulation
            </p>
            
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              Indigenous geospatial intelligence platform leveraging satellite data, 
              machine learning, and advanced modeling to predict and simulate forest fires across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('predict')}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Flame className="w-5 h-5" />
                <span>Start Prediction</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigate('simulate')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Zap className="w-5 h-5" />
                <span>Run Simulation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Capabilities</h2>
            <p className="text-lg text-gray-600">Advanced AI-powered solutions for forest fire management</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fire Risk Prediction</h3>
              <p className="text-gray-600">
                U-Net based pixel-wise prediction using satellite data, weather patterns, 
                and terrain analysis to identify high-risk zones 24 hours in advance.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Spread Simulation</h3>
              <p className="text-gray-600">
                Cellular Automata engine simulating hourly fire spread patterns 
                considering wind, slope, vegetation, and terrain factors.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">GeoTIFF Outputs</h3>
              <p className="text-gray-600">
                High-resolution 30m GeoTIFF files ready for integration with 
                existing GIS systems and emergency response workflows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">89%</div>
              <div className="text-blue-200">Model Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">30m</div>
              <div className="text-blue-200">Spatial Resolution</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">12hrs</div>
              <div className="text-blue-200">Spread Prediction</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24hrs</div>
              <div className="text-blue-200">Risk Forecast</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-16 h-16 text-orange-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Protecting India's Forests with AI
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the mission to create an indigenous forest fire management system. 
            Built for the Bhartiya Antariksh Hackathon, supporting Atmanirbhar Bharat.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg mx-auto"
          >
            <span>View Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};