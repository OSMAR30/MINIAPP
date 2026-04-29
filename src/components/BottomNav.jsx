import React from 'react';
import { LI } from './Icons';

export function BottomNav({ active, onNav, accent }) {
  const rgb = hexToRgb(accent);
  const TABS = [
    { id: 'home', label: 'Inicio', icon: 'House' },
    { id: 'progress', label: 'Monitor', icon: 'Activity' },
    { id: 'create', label: 'Crear', icon: 'Plus' },
    { id: 'history', label: 'Historial', icon: 'Clock' },
    { id: 'settings', label: 'Config', icon: 'Settings2' }
  ];

  function hexToRgb(hex) {
    if (!hex || hex.length < 7) return '0,229,160';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 20, 
      left: '50%', 
      transform: 'translateX(-50%)', 
      width: 'calc(100% - 32px)', 
      maxWidth: 400, 
      height: 72, 
      background: 'rgba(18,18,26,0.92)', 
      backdropFilter: 'blur(24px)', 
      borderRadius: 36, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '6px 4px', 
      border: '1px solid rgba(255,255,255,0.08)', 
      zIndex: 1000,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.04) inset'
    }}>
      {TABS.map((t) => {
        const on = active === t.id;
        if (t.id === 'create') return (
          <button key={t.id} onClick={() => onNav(t.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', gap: 0 }}>
            <div style={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              background: `linear-gradient(135deg,${accent},rgba(${rgb},.7))`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              boxShadow: `0 4px 20px rgba(${rgb},.6), 0 0 0 3px rgba(${rgb},.18)`, 
              transition: 'transform .18s, box-shadow .2s', 
              transform: 'translateY(-14px)',
              zIndex: 2
            }}>
              <LI name="Plus" size={22} color="#000" strokeWidth={2.8} />
            </div>
            <span style={{ fontSize: 9, color: on ? accent : 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: .3, marginTop: -6 }}>Crear</span>
          </button>
        );

        return (
          <button key={t.id} onClick={() => onNav(t.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 2px' }}>
            <div style={{ width: 38, height: 32, borderRadius: 12, background: on ? `rgba(${rgb},.18)` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
              <LI name={t.icon} size={17} color={on ? accent : 'rgba(255,255,255,.3)'} />
            </div>
            <span style={{ fontSize: 9, color: on ? accent : 'rgba(255,255,255,.25)', fontFamily: 'DM Mono', letterSpacing: .3, lineHeight: 1 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
