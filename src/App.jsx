import React, { useState, useEffect } from 'react';
import DashboardScreen from './components/DashboardScreen';
import CreateScreen from './components/CreateScreen';
import ProgressScreen from './components/ProgressScreen';
import { RegisterModal, ProfileSwitcher } from './components/Modals';
import { BottomNav } from './components/BottomNav';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'STREET VIVES 2', color: '#a78bfa', emoji: '🎬' }
  ]);
  const [activeProfileName, setActiveProfileName] = useState('STREET VIVES 2');
  const [activeAccent, setActiveAccent] = useState('#a78bfa');
  const [showRegister, setShowRegister] = useState(false);
  const [videoReady, setVideoReady] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand();
  }, []);

  const activeProfile = profiles.find(p => p.name === activeProfileName) || profiles[0];

  const handleAddProfile = () => setShowRegister(true);
  
  const handleSaveProfile = (newProfile) => {
    setProfiles([...profiles, newProfile]);
    setActiveProfileName(newProfile.name);
    setActiveAccent(newProfile.color);
    setShowRegister(false);
  };

  const handleSelectProfile = (profile) => {
    setActiveProfileName(profile.name);
    setActiveAccent(profile.color);
  };

  const navigate = (screen) => {
    if (screen === 'home') setCurrentScreen('home');
    else if (screen === 'progress') setCurrentScreen('progress');
    else if (screen === 'create') setCurrentScreen('create');
    else if (screen === 'history') {
        // Placeholder for history
        alert('Historial próximamente');
    } else if (screen === 'config') {
        // Placeholder for config
        alert('Configuración próximamente');
    }
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: '#06060a', 
      color: '#fff', 
      fontFamily: 'DM Sans, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {currentScreen === 'home' && (
        <DashboardScreen 
          accent={activeAccent} 
          profile={activeProfileName} 
          profiles={profiles}
          onNavigate={navigate}
          onAddProfile={handleAddProfile}
          setProfile={setActiveProfileName}
          setAccent={setActiveAccent}
          stats={{ videos: 12, inCourse: 2, errors: 1 }}
        />
      )}
      {currentScreen === 'create' && (
        <CreateScreen 
          accent={activeAccent} 
          onNavigate={navigate}
          videoReady={videoReady}
          setVideoReady={setVideoReady}
        />
      )}
      {currentScreen === 'progress' && (
        <ProgressScreen accent={activeAccent} />
      )}

      {showRegister && (
        <RegisterModal 
          accent={activeAccent} 
          onSave={handleSaveProfile} 
          onClose={() => setShowRegister(false)} 
        />
      )}

      <BottomNav 
        activeScreen={currentScreen === 'home' ? 'home' : currentScreen} 
        onNavigate={navigate} 
        accent={activeAccent} 
      />
    </div>
  );
}

export default App;
