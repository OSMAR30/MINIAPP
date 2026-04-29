import React, { useState } from 'react';
import { LI } from './Icons';
import { Counter } from './Counter';
import { hexToRgb } from '../utils/designUtils';

function DashboardScreen({ accent, profile, profiles, onNavigate, onAddProfile, setProfile, setAccent, stats = {} }) {
  const [showSwitcher, setShowSwitcher] = useState(false);
  const rgb = hexToRgb(accent);
  const activeProfile = profiles.find((p) => p.name === profile) || profiles[0];
  const modules = [
    { name: "Orquestador", sub: "Núcleo del sistema", ok: true, icon: "GitBranch" },
    { name: "Clonador de Voz", sub: "ElevenLabs API", ok: true, icon: "Mic2" },
    { name: "Buscador de Imágenes", sub: "API local conectada", ok: true, icon: "Images" },
    { name: "Buscador de Videos", sub: "En desarrollo", ok: false, icon: "Film" },
    { name: "Editor de Video", sub: "En desarrollo", ok: false, icon: "Clapperboard" }
  ];

  return (
    <div style={{ padding: '0 0 120px', overflowY: 'auto', height: '100%' }}>
      <div className="anim-1" style={{
        background: `linear-gradient(160deg, rgba(${rgb},.55) 0%, rgba(${rgb},.18) 45%, rgba(${rgb},.04) 100%)`,
        borderRadius: '0 0 28px 28px',
        padding: '60px 16px 20px',
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 220, height: 220, background: `radial-gradient(circle, rgba(${rgb},.5) 0%, transparent 65%)`, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: -20, left: -20, width: 160, height: 160, background: `radial-gradient(circle, rgba(${rgb},.25) 0%, transparent 70%)`, pointerEvents: 'none' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, position: 'relative', zIndex: 1 }}>
          <button onClick={() => setShowSwitcher(true)} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
             <div style={{ width: 46, height: 46, borderRadius: '50%', background: `linear-gradient(135deg,${activeProfile?.color || accent},rgba(${rgb},.4))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, boxShadow: `0 4px 16px rgba(${rgb},.4)`, position: 'relative', overflow: 'hidden' }}>
               {activeProfile?.photo ? <img src={activeProfile.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (activeProfile?.emoji || '🎬')}
               <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', background: '#09090f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ width: 7, height: 7, borderRadius: '50%', background: accent, animation: 'pulse 2s infinite' }}></div>
               </div>
             </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 2 }}>PERFIL ACTIVO</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: -.3, lineHeight: 1, display: 'flex', alignItems: 'center', gap: 5 }}>
                {profile}
                <LI name="ChevronDown" size={13} color="rgba(255,255,255,.5)" />
              </div>
            </div>
          </button>
          <button onClick={onAddProfile} style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
            <LI name="UserPlus" size={15} color="rgba(255,255,255,.8)" />
          </button>
        </div>

        <div style={{ background: 'rgba(0,0,0,.25)', backdropFilter: 'blur(12px)', borderRadius: 18, padding: '16px 18px', border: '1px solid rgba(255,255,255,.1)', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 8 }}>ESTA SEMANA</div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 42, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: -1 }}><Counter to={stats?.videos || 0} /></div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 4 }}>Videos generados</div>
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', paddingBottom: 4 }}>
              {[40, 65, 45, 80, 55, 70, 85].map((h, i) =>
              <div key={i} style={{ width: 6, borderRadius: 3, background: `rgba(${rgb},${.4 + h / 160})`, height: h * .3 }}></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div className="anim-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <div className="stat-card" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 10, background: `rgba(${rgb},.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LI name="Activity" size={15} color={accent} />
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', fontFamily: 'DM Mono' }}>EN CURSO</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: accent }}><Counter to={stats?.inCourse || 0} /></div>
          </div>
          <div className="stat-card" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 10, background: 'rgba(255,95,95,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LI name="AlertCircle" size={15} color="#ff5f5f" />
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', fontFamily: 'DM Mono' }}>ERRORES</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#ff5f5f' }}><Counter to={stats?.errors || 0} /></div>
          </div>
        </div>

        <button className="anim-4 btn-primary" onClick={() => onNavigate('create')} style={{ width: '100%', padding: '15px', borderRadius: 16, border: 'none', background: `linear-gradient(135deg, ${accent} 0%, rgba(${rgb},.7) 100%)`, color: '#000', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20, boxShadow: `0 8px 30px rgba(${rgb},.35)` }}>
          <LI name="Plus" size={18} color="#000" strokeWidth={2.5} />
          Crear nuevo video
        </button>

        <div className="anim-5" style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 10 }}>ESTADO DEL SISTEMA</div>
        <div className="anim-5" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 18, overflow: 'hidden', marginBottom: 20 }}>
          {modules.map((m, i) =>
            <div key={i} className="module-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < modules.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: m.ok ? `rgba(${rgb},.12)` : 'rgba(255,255,255,.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <LI name={m.icon || 'Circle'} size={15} color={m.ok ? accent : '#444'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: m.ok ? '#ddd' : '#555', fontWeight: 500 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.25)', fontFamily: 'DM Mono', marginTop: 1 }}>{m.sub}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: m.ok ? accent : '#333', display: 'block', animation: m.ok ? 'pulse 2s infinite' : 'none' }}></span>
                <span style={{ fontSize: 10, color: m.ok ? accent : '#444', fontFamily: 'DM Mono' }}>{m.ok ? 'online' : 'offline'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
