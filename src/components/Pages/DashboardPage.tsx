import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { StatCard } from '../Common/StatCard';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { ModelMetrics } from '../../types/fire';
import { mockModelMetrics } from '../../utils/mockApi';

export const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await mockModelMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Error loading metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMetrics();
  }, []);

  const performanceData = [
    { name: 'Accuracy', value: metrics?.accuracy || 0 },
    { name: 'Precision', value: metrics?.precision || 0 },
    { name: 'Recall', value: metrics?.recall || 0 },
    { name: 'IoU', value: metrics?.iou || 0 }
  ];

  const historicalData = [
    { month: 'Jan', accuracy: 0.85, precision: 0.87 },
    { month: 'Feb', accuracy: 0.86, precision: 0.88 },
    { month: 'Mar', accuracy: 0.87, precision: 0.89 },
    { month: 'Apr', accuracy: 0.88, precision: 0.90 },
    { month: 'May', accuracy: 0.89, precision: 0.92 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <LoadingSpinner text="Loading model performance metrics..." />
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
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span>Dashboard</span>
          </h1>
          <p className="text-gray-600 mt-2">
            AI model performance metrics and system analytics
          </p>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Model Accuracy"
            value={`${((metrics?.accuracy || 0) * 100).toFixed(1)}%`}
            icon={Target}
            color="green"
            subtitle="Overall prediction accuracy"
          />
          <StatCard
            title="Precision"
            value={`${((metrics?.precision || 0) * 100).toFixed(1)}%`}
            icon={CheckCircle}
            color="blue"
            subtitle="True positive rate"
          />
          <StatCard
            title="Recall"
            value={`${((metrics?.recall || 0) * 100).toFixed(1)}%`}
            icon={TrendingUp}
            color="orange"
            subtitle="Sensitivity measure"
          />
          <StatCard
            title="IoU Score"
            value={`${((metrics?.iou || 0) * 100).toFixed(1)}%`}
            icon={AlertCircle}
            color="red"
            subtitle="Intersection over Union"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Model Performance Metrics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip formatter={(value) => `${(value as number * 100).toFixed(1)}%`} />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Historical Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Historical Performance Trends
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0.8, 1]} />
                <Tooltip formatter={(value) => `${(value as number * 100).toFixed(1)}%`} />
                <Line type="monotone" dataKey="accuracy" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="precision" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Model Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Model Architecture
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Model Type:</span>
                <span className="font-medium">U-Net CNN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Input Resolution:</span>
                <span className="font-medium">30m x 30m pixels</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Training Data:</span>
                <span className="font-medium">VIIRS, MODIS, Weather</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Parameters:</span>
                <span className="font-medium">2.3M trainable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Inference Time:</span>
                <span className="font-medium">1.2s per region</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              System Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Model Status:</span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">Active</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Data Pipeline:</span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">Running</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Satellite Feed:</span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">Connected</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Update:</span>
                <span className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">2 minutes ago</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};