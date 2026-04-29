import React, { useState, useRef } from 'react';
import { LI } from './Icons';
import { hexToRgb, hslToHex } from '../utils/designUtils';

export function RegisterModal({ accent, onSave, onClose }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(accent);
  const [emoji, setEmoji] = useState('🎬');
  const [photo, setPhoto] = useState(null);
  const [hue, setHue] = useState(270); 
  const fileInputRef = useRef(null);

  const rgb = hexToRgb(color);
  const COLORS = ['#00e5a0', '#4ade80', '#38bdf8', '#a78bfa', '#f472b6', '#fb923c', '#facc15', '#ff5f5f'];
  const EMOJIS = ['🎬', '🎵', '🎤', '🎧', '🔥', '⚡', '🌟', '🎯'];

  const handleHueChange = (e) => {
    const h = parseInt(e.target.value);
    setHue(h);
    setColor(hslToHex(h, 80, 60));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), color, emoji, photo, id: Date.now() });
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', animation: 'fadeIn .2s ease' }}>
      <div style={{ background: '#111118', borderRadius: '24px 24px 0 0', padding: '24px 20px 36px', border: '1px solid rgba(255,255,255,.08)' }}>
        <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,.15)', borderRadius: 2, margin: '0 auto 24px' }}></div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Nuevo perfil</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginBottom: 20 }}>Personaliza tu espacio de trabajo</div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20, gap: 12 }}>
          <div 
            onClick={() => fileInputRef.current.click()} 
            style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg,${color},rgba(${rgb},.4))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: `0 8px 24px rgba(${rgb},.4)`, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
          >
            {photo ? <img src={photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : emoji}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,.2)' }}>
              <LI name="Camera" size={12} color="#fff" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" style={{ display: 'none' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
          {EMOJIS.map((e) =>
          <button key={e} onClick={() => setEmoji(e)} style={{ width: 36, height: 36, borderRadius: 10, border: `2px solid ${emoji === e ? color : 'transparent'}`, background: emoji === e ? `rgba(${rgb},.15)` : 'rgba(255,255,255,.05)', fontSize: 18, cursor: 'pointer', transition: 'all .15s' }}>
              {e}
          </button>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 8 }}>NOMBRE DEL PERFIL</div>
          <input
            autoFocus
            style={{ width: '100%', background: 'rgba(255,255,255,.05)', border: `1px solid rgba(${rgb},.3)`, borderRadius: 12, padding: '13px 14px', color: '#fff', fontSize: 15, outline: 'none' }}
            placeholder="Ej: STREET VIVES 1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 10 }}>COLOR</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ width: '100%', height: 14, borderRadius: 7, background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)', position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={hue} 
                onChange={handleHueChange}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }} 
              />
              <div style={{ position: 'absolute', top: '50%', left: `${(hue / 360) * 100}%`, transform: 'translate(-50%, -50%)', width: 20, height: 20, borderRadius: '50%', background: '#fff', border: '2px solid #000', boxShadow: '0 0 10px rgba(0,0,0,0.5)', pointerEvents: 'none', zIndex: 1 }}></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {COLORS.map((c) =>
            <button key={c} onClick={() => setColor(c)} style={{ flex: 1, aspectRatio: '1', borderRadius: 10, background: c, border: `2px solid ${color === c ? '#fff' : 'transparent'}`, cursor: 'pointer', transition: 'transform .15s', transform: color === c ? 'scale(1.15)' : 'scale(1)' }}>
                {color === c && <LI name="Check" size={12} color="#000" strokeWidth={3} />}
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '14px', borderRadius: 14, border: '1px solid rgba(255,255,255,.1)', background: 'transparent', color: 'rgba(255,255,255,.5)', fontSize: 14, cursor: 'pointer' }}>Cancelar</button>
          <button onClick={handleSave} disabled={!name.trim()} style={{ flex: 2, padding: '14px', borderRadius: 14, border: 'none', background: name.trim() ? `linear-gradient(135deg,${color},rgba(${rgb},.6))` : 'rgba(255,255,255,.08)', color: name.trim() ? '#000' : 'rgba(255,255,255,.2)', fontSize: 14, fontWeight: 700, cursor: name.trim() ? 'pointer' : 'default', transition: 'all .2s' }}>
            Crear perfil
          </button>
        </div>
      </div>
    </div>);
}

export function ProfileSwitcher({ profiles, activeProfile, accent, onSelect, onAdd, onClose }) {
  const rgb = hexToRgb(accent);
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', animation: 'fadeIn .2s ease' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#111118', borderRadius: '24px 24px 0 0', padding: '20px 20px 36px', border: '1px solid rgba(255,255,255,.08)' }}>
        <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,.15)', borderRadius: 2, margin: '0 auto 20px' }}></div>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.5)', marginBottom: 14, fontFamily: 'DM Mono', letterSpacing: 1 }}>CAMBIAR PERFIL</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {profiles.map((p) => {
            const pRgb = hexToRgb(p.color);
            const isActive = p.name === activeProfile?.name;
            return (
              <button key={p.id} onClick={() => onSelect(p)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 14px', borderRadius: 16, border: `1px solid ${isActive ? `rgba(${pRgb},.35)` : 'rgba(255,255,255,.06)'}`, background: isActive ? `rgba(${pRgb},.1)` : 'rgba(255,255,255,.03)', cursor: 'pointer', transition: 'all .15s' }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg,${p.color},rgba(${pRgb},.4))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, boxShadow: isActive ? `0 4px 14px rgba(${pRgb},.35)` : 'none', overflow: 'hidden' }}>
                  {p.photo ? <img src={p.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : p.emoji}
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 15, fontWeight: isActive ? 700 : 400, color: isActive ? '#fff' : 'rgba(255,255,255,.5)' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', marginTop: 1 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: p.color, verticalAlign: 'middle', marginRight: 5 }}></span>
                    {p.color}
                  </div>
                </div>
                {isActive && <LI name="CheckCircle2" size={18} color={p.color} />}
              </button>);
          })}
        </div>
        <button onClick={onAdd} style={{ width: '100%', padding: '13px', borderRadius: 14, border: `1px dashed rgba(${rgb},.3)`, background: `rgba(${rgb},.06)`, color: accent, fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <LI name="UserPlus" size={16} color={accent} />
          Agregar nuevo perfil
        </button>
      </div>
    </div>);
}
