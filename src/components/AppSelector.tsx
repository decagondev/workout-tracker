import React from 'react';
import { Heart, Dumbbell } from 'lucide-react';

type AppType = 'breathing' | 'workout';

interface AppSelectorProps {
  onAppSelect: (app: AppType) => void;
  currentApp: AppType;
}

export const AppSelector: React.FC<AppSelectorProps> = ({ onAppSelect, currentApp }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-2 flex space-x-2">
        <button
          onClick={() => onAppSelect('breathing')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            currentApp === 'breathing'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span className="text-sm font-medium">Breathing</span>
        </button>
        
        <button
          onClick={() => onAppSelect('workout')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            currentApp === 'workout'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span className="text-sm font-medium">Workout</span>
        </button>
      </div>
    </div>
  );
}; 