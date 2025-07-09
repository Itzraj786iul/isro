import React from 'react';
import { Shield, Github, Globe, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-bold">AgniRakshak</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              An indigenous AI-powered forest fire forecasting and spread simulation platform 
              developed for the Bhartiya Antariksh Hackathon. Leveraging satellite data, 
              machine learning, and geospatial intelligence to protect our forests.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 text-orange-400">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Fire Prediction</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Spread Simulation</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Model Metrics</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Download Center</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 text-orange-400">Connect</h4>
            <div className="flex space-x-4">
              <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Globe className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 AgniRakshak. Made with ❤️ for Bhartiya Antariksh Hackathon. Supporting Atmanirbhar Bharat.</p>
        </div>
      </div>
    </footer>
  );
};