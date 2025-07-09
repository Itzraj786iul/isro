import React from 'react';
import { Shield, Users, Database, Cpu, Globe, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="w-16 h-16 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              About Agni<span className="text-orange-600">Rakshak</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An indigenous AI-powered forest fire forecasting and spread simulation platform 
            developed for the Bhartiya Antariksh Hackathon, supporting India's vision of 
            Atmanirbhar Bharat in disaster management.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-r from-blue-900 to-orange-600 text-white rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              To protect India's precious forest resources through cutting-edge AI technology, 
              satellite data analysis, and indigenous innovation. We envision a future where 
              forest fires can be predicted, prevented, and managed with unprecedented precision.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Prediction</h3>
            <p className="text-gray-600">
              Advanced U-Net CNN architecture trained on satellite imagery, weather data, 
              and terrain information to predict fire risk with 89% accuracy.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Source Data</h3>
            <p className="text-gray-600">
              Integrates VIIRS fire data, MODIS imagery, DEM terrain models, 
              and real-time weather information for comprehensive analysis.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Geospatial Intelligence</h3>
            <p className="text-gray-600">
              Produces high-resolution GeoTIFF outputs compatible with existing 
              GIS infrastructure and emergency response systems.
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Model Architecture</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Primary Model:</span>
                  <span className="font-medium">U-Net Convolutional Neural Network</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Input Resolution:</span>
                  <span className="font-medium">30m × 30m pixels</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Training Parameters:</span>
                  <span className="font-medium">2.3M trainable parameters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Simulation Engine:</span>
                  <span className="font-medium">Cellular Automata</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Data Sources</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fire Detection:</span>
                  <span className="font-medium">VIIRS/MODIS Satellite Data</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Terrain Data:</span>
                  <span className="font-medium">SRTM Digital Elevation Model</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weather Data:</span>
                  <span className="font-medium">IMD API Integration</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Land Cover:</span>
                  <span className="font-medium">ISRO Bhuvan LULC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Development Team</h2>
            <p className="text-gray-600">Passionate innovators working towards Atmanirbhar Bharat</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">AI/ML Engineers</h3>
              <p className="text-sm text-gray-600">Model development and optimization</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900">GIS Specialists</h3>
              <p className="text-sm text-gray-600">Geospatial analysis and visualization</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900">Full-Stack Developers</h3>
              <p className="text-sm text-gray-600">Platform development and deployment</p>
            </div>
          </div>
        </div>

        {/* Hackathon Connection */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-200">
          <div className="text-center">
            <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bhartiya Antariksh Hackathon 2024
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              This project was developed as part of the Bhartiya Antariksh Hackathon, 
              showcasing India's capability in space technology applications for disaster management. 
              Our solution demonstrates the potential of indigenous AI systems in protecting 
              our natural resources and supporting emergency response efforts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};