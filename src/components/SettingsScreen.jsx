import React from 'react';
import { LI } from './Icons';
import { hexToRgb } from '../utils/designUtils';

function SettingsScreen({ accent, setAccent, profile, setProfile, profiles, setProfiles, resetAll }) {
  const COLORS = ['#00e5a0', '#4ade80', '#38bdf8', '#a78bfa', '#f472b6', '#fb923c', '#facc15', '#ff5f5f'];
  const rgb = hexToRgb(accent);

  const deleteProfile = (p) => {
    if (profiles.length <= 1) return;
    const next = profiles.filter((x) => x.id !== p.id);
    setProfiles(next);
    if (profile === p.name) {
      setProfile(next[0].name);
      setAccent(next[0].color);
    }
  };

  return (
    <div style={{ padding: '20px 16px 40px', overflowY: 'auto', height: '100%' }}>
      <div className="anim-1" style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 24, letterSpacing: -.5 }}>Configuración</div>

      <div className="anim-2" style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 10 }}>PERFILES</div>
      <div className="anim-2" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
        {profiles.map((p, i) => {
          const pRgb = hexToRgb(p.color);
          const isActive = profile === p.name;
          return (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: isActive ? `rgba(${pRgb},.08)` : 'transparent', borderBottom: i < profiles.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none', transition: 'background .2s' }}>
              <button onClick={() => {setProfile(p.name);setAccent(p.color);}} style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${p.color},rgba(${pRgb},.4))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {p.emoji || '🎬'}
                </div>
                <span style={{ flex: 1, textAlign: 'left', fontSize: 14, color: isActive ? '#fff' : 'rgba(255,255,255,.4)', fontWeight: isActive ? 600 : 400 }}>{p.name}</span>
                {isActive && <LI name="CheckCircle2" size={16} color={p.color} />}
              </button>
              {profiles.length > 1 &&
              <button onClick={() => deleteProfile(p)} style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,95,95,.08)', border: '1px solid rgba(255,95,95,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background .15s' }}>
                  <LI name="X" size={13} color="#ff5f5f" />
                </button>
              }
            </div>);
        })}
      </div>

      <div className="anim-3" style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 10 }}>COLOR DE ACENTO</div>
      <div className="anim-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 10, marginBottom: 24 }}>
        {COLORS.map((c) => (
          <button key={c} onClick={() => setAccent(c)} style={{ aspectRatio: '1', borderRadius: 12, border: `2px solid ${accent === c ? '#fff' : 'transparent'}`, background: c, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .15s, border .15s', transform: accent === c ? 'scale(1.1)' : 'scale(1)' }}>
            {accent === c && <LI name="Check" size={13} color="#000" strokeWidth={3} />}
          </button>
        ))}
      </div>

      <div className="anim-4" style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 10 }}>CUENTA DE TIKTOK</div>
        <button style={{ width: '100%', padding: '15px 20px', borderRadius: 16, border: 'none', background: accent, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 8px 28px rgba(${rgb},.45)`, transition: 'filter .2s, transform .12s', position: 'relative', overflow: 'hidden' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#000', letterSpacing: -.2 }}>Iniciar sesión con TikTok</span>
        </button>
      </div>

      <div className="anim-4" style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 10 }}>MÓDULOS DEL SISTEMA</div>
      <div className="anim-4" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { name: 'Orquestador', sub: 'Núcleo activo', ok: true, icon: 'GitBranch' },
          { name: 'Clonador de Voz', sub: 'ElevenLabs API', ok: true, icon: 'Mic2' },
          { name: 'Buscador de Imágenes', sub: 'API local', ok: true, icon: 'Images' },
          { name: 'Buscador de Videos', sub: 'En desarrollo', ok: false, icon: 'Film' },
          { name: 'Editor de Video', sub: 'En desarrollo', ok: false, icon: 'Clapperboard' }
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: m.ok ? `rgba(${rgb},.12)` : 'rgba(255,255,255,.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LI name={m.icon} size={15} color={m.ok ? accent : 'rgba(255,255,255,.2)'} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: m.ok ? '#ccc' : 'rgba(255,255,255,.3)', fontWeight: 500 }}>{m.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.2)', fontFamily: 'DM Mono', marginTop: 1 }}>{m.sub}</div>
            </div>
            <div style={{ fontSize: 10, color: m.ok ? accent : 'rgba(255,255,255,.2)', fontFamily: 'DM Mono', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: m.ok ? accent : '#333', display: 'block', animation: m.ok ? 'pulse 2s infinite' : 'none' }}></span>
              {m.ok ? 'online' : 'offline'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 10 }}>ZONA DE PELIGRO</div>
        <button onClick={resetAll} style={{ width: '100%', padding: '14px', borderRadius: 14, border: '1px solid rgba(255,95,95,.25)', background: 'rgba(255,95,95,.06)', color: '#ff5f5f', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all .2s' }}>
          <LI name="RotateCcw" size={16} color="#ff5f5f" />
          Reiniciar — borrar historial y contadores
        </button>
      </div>
    </div>
  );
}

export default SettingsScreen;
