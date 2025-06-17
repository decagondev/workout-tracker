import React, { useState } from 'react';
import { App } from './App';
import { WorkoutApp } from './components/WorkoutApp';
import { AppSelector } from './components/AppSelector';

type AppType = 'breathing' | 'workout';

export const AppContainer: React.FC = () => {
  const [currentApp, setCurrentApp] = useState<AppType>('workout'); // Default to workout as per PRD

  const handleAppSelect = (app: AppType) => {
    setCurrentApp(app);
  };

  return (
    <div className="relative">
      <AppSelector onAppSelect={handleAppSelect} currentApp={currentApp} />
      
      {currentApp === 'breathing' ? <App /> : <WorkoutApp />}
    </div>
  );
}; 