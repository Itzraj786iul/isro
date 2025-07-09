import React, { useState, useEffect } from 'react';
import { Download, FileText, Image, Archive, Calendar, Eye } from 'lucide-react';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { DownloadableOutput } from '../../types/fire';
import { mockDownloadableOutputs } from '../../utils/mockApi';

export const DownloadPage: React.FC = () => {
  const [outputs, setOutputs] = useState<DownloadableOutput[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'prediction' | 'spread' | 'animation'>('all');

  useEffect(() => {
    const loadOutputs = async () => {
      try {
        const data = await mockDownloadableOutputs();
        setOutputs(data);
      } catch (error) {
        console.error('Error loading outputs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadOutputs();
  }, []);

  const getFileIcon = (format: string) => {
    switch (format) {
      case 'geotiff':
        return <Archive className="w-5 h-5 text-blue-600" />;
      case 'png':
        return <Image className="w-5 h-5 text-green-600" />;
      case 'json':
        return <FileText className="w-5 h-5 text-yellow-600" />;
      case 'gif':
        return <Image className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'prediction':
        return 'Fire Prediction';
      case 'spread':
        return 'Spread Simulation';
      case 'animation':
        return 'Animation';
      default:
        return type;
    }
  };

  const filteredOutputs = filter === 'all' 
    ? outputs 
    : outputs.filter(output => output.type === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <LoadingSpinner text="Loading available outputs..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Download className="w-8 h-8 text-blue-600" />
            <span>Download Center</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Download GeoTIFF files, visualizations, and analysis outputs
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'all', label: 'All Files' },
              { id: 'prediction', label: 'Predictions' },
              { id: 'spread', label: 'Simulations' },
              { id: 'animation', label: 'Animations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  filter === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Download Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOutputs.map((output) => (
            <div key={output.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getFileIcon(output.format)}
                  <div>
                    <h3 className="font-medium text-gray-900">{output.name}</h3>
                    <p className="text-sm text-gray-500">{getTypeLabel(output.type)}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  output.format === 'geotiff' ? 'bg-blue-100 text-blue-800' :
                  output.format === 'png' ? 'bg-green-100 text-green-800' :
                  output.format === 'json' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {output.format.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{output.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(output.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">File Format Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">GeoTIFF Files</h3>
              <p className="text-sm text-gray-600">
                High-resolution raster data compatible with QGIS, ArcGIS, and other GIS software. 
                Contains geospatial metadata and projection information.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">PNG Images</h3>
              <p className="text-sm text-gray-600">
                Visual representations of fire risk maps and simulation results. 
                Suitable for presentations and reports.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">JSON Data</h3>
              <p className="text-sm text-gray-600">
                Structured metadata including model parameters, timestamps, 
                and statistical information for each analysis.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">GIF Animations</h3>
              <p className="text-sm text-gray-600">
                Time-lapse animations showing fire spread progression over time. 
                Useful for understanding temporal patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};