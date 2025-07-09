import React from 'react';
import { Shield, Flame, Home, BarChart3, Download, Info } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'predict', label: 'Prediction', icon: Flame },
    { id: 'simulate', label: 'Simulation', icon: Shield },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'download', label: 'Download', icon: Download },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-orange-300" />
            <div>
              <h1 className="text-xl font-bold">AgniRakshak</h1>
              <p className="text-xs text-blue-200">AI-Powered Forest Fire Guardian</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === item.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-blue-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">ISRO Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
};