import React from 'react';
import { LI } from './Icons';

export function BottomNav({ activeScreen, onNavigate, accent }) {
  const navItems = [
    { id: 'home', label: 'Inicio', icon: 'House' },
    { id: 'progress', label: 'Monitor', icon: 'Activity' },
    { id: 'create', label: 'Crear', icon: 'Plus', isCenter: true },
    { id: 'history', label: 'Historial', icon: 'Clock' },
    { id: 'config', label: 'Config', icon: 'Settings2' },
  ];

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 20, 
      left: '50%', 
      transform: 'translateX(-50%)', 
      width: 'calc(100% - 32px)', 
      maxWidth: 400, 
      height: 72, 
      background: 'rgba(17, 17, 24, 0.8)', 
      backdropFilter: 'blur(20px)', 
      borderRadius: 36, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 12px', 
      border: '1px solid rgba(255,255,255,0.08)', 
      zIndex: 1000,
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      {navItems.map((item) => (
        <button 
          key={item.id} 
          onClick={() => onNavigate(item.id)}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: activeScreen === item.id ? accent : 'rgba(255,255,255,0.4)',
            transition: 'all 0.2s',
            position: 'relative',
            flex: 1
          }}
        >
          {item.isCenter ? (
            <div style={{ 
              width: 56, 
              height: 56, 
              borderRadius: '50%', 
              background: `linear-gradient(135deg, ${accent} 0%, rgba(0,0,0,0) 100%)`, 
              border: `2px solid ${accent}`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: -30, 
              boxShadow: `0 0 20px ${accent}66`,
              position: 'relative',
              zIndex: 2
            }}>
              <LI name={item.icon} size={24} color="#000" strokeWidth={3} />
            </div>
          ) : (
            <>
              <div style={{ 
                padding: activeScreen === item.id ? '8px' : '0', 
                borderRadius: 12, 
                background: activeScreen === item.id ? `rgba(${accent}, 0.15)` : 'transparent',
                transition: 'all 0.2s'
              }}>
                <LI name={item.icon} size={20} color={activeScreen === item.id ? accent : 'rgba(255,255,255,0.4)'} />
              </div>
              <span style={{ 
                fontSize: 10, 
                fontFamily: 'DM Mono', 
                marginTop: 4,
                fontWeight: activeScreen === item.id ? 600 : 400 
              }}>
                {item.label}
              </span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
