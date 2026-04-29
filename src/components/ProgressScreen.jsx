import React, { useState, useEffect, useRef } from 'react';
import { LI } from './Icons';
import { hexToRgb } from '../utils/designUtils';

function MiniCircle({ pct = 0, accent, label, icon, size = 72, active = false, done = false }) {
  const rgb = hexToRgb(accent);
  const R = size / 2 - 7;
  const circ = 2 * Math.PI * R;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={5} />
          <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke={done ? accent : active ? accent : 'rgba(255,255,255,.15)'} strokeWidth={5}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.4,0,.2,1), stroke .4s' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          {done ?
          <LI name="Check" size={16} color={accent} strokeWidth={2.5} /> :
          active ?
          <LI name="Loader2" size={15} color={accent} style={{ animation: 'spin 1s linear infinite' }} /> :
          <LI name={icon} size={15} color={pct > 0 ? accent : 'rgba(255,255,255,.2)'} />
          }
          <span style={{ fontSize: 9, fontFamily: 'DM Mono', color: pct > 0 || done ? accent : 'rgba(255,255,255,.25)', fontWeight: 500 }}>{done ? '✓' : pct + '%'}</span>
        </div>
        {active && <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: `radial-gradient(circle,rgba(${rgb},.15) 0%,transparent 70%)`, animation: 'glow 1.5s ease-in-out infinite' }}></div>}
      </div>
      <span style={{ fontSize: 10, color: done ? accent : active ? '#fff' : 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: .5, fontWeight: active ? 600 : 400 }}>{label}</span>
    </div>);
}

const ALL_STEPS = [
  { id: 'guion', label: 'Guión', icon: 'FileText', sub: 'Analizando...' },
  { id: 'voz', label: 'Voz', icon: 'Mic2', sub: 'ElevenLabs procesando...' },
  { id: 'imagenes', label: 'Imágenes', icon: 'Images', sub: 'Buscando...' },
  { id: 'videos', label: 'Videos', icon: 'Film', sub: 'Escaneando fuentes...' },
  { id: 'edicion', label: 'Edición', icon: 'Clapperboard', sub: 'Compositor armando...' },
  { id: 'envio', label: 'Telegram', icon: 'Send', sub: 'Subiendo archivo...' }
];

const MODULE_STEPS = [
  { id: 'voz', label: 'Voz', icon: 'Mic2' },
  { id: 'imagenes', label: 'Imágenes', icon: 'Images' },
  { id: 'videos', label: 'Videos', icon: 'Film' },
  { id: 'edicion', label: 'Edición', icon: 'Clapperboard' }
];

function ProgressScreen({ accent, jobId }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [modPcts, setModPcts] = useState({ voz: 0, imagenes: 0, videos: 0, edicion: 0 });
  const [running, setRunning] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Esperando orquestador...');
  const rgb = hexToRgb(accent);

  useEffect(() => {
    if (!jobId) {
      setStatusMsg('No hay proceso activo');
      return;
    }

    const pollStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/status/${jobId}`);
        const data = await response.json();

        if (data.error) {
          setStatusMsg(`Error: ${data.error}`);
          setRunning(false);
          return;
        }

        setStatusMsg(data.status);
        setRunning(data.progress < 100);

        // Map progress to steps roughly
        // Voz: 0-30%, Imagenes: 30-60%, Videos: 60-80%, Edicion: 80-100%
        const p = data.progress;
        setModPcts({
          voz: p > 30 ? 100 : (p / 30) * 100,
          imagenes: p > 60 ? 100 : p < 30 ? 0 : ((p - 30) / 30) * 100,
          videos: p > 80 ? 100 : p < 60 ? 0 : ((p - 60) / 20) * 100,
          edicion: p > 100 ? 100 : p < 80 ? 0 : ((p - 80) / 20) * 100,
        });

        // Update step index based on progress
        if (p < 20) setStepIdx(0);
        else if (p < 40) setStepIdx(1);
        else if (p < 60) setStepIdx(2);
        else if (p < 80) setStepIdx(3);
        else if (p < 100) setStepIdx(4);
        else setStepIdx(5);

      } catch (e) {
        setStatusMsg('Error de conexión con el Orquestador');
      }
    };

    const interval = setInterval(pollStatus, 2000);
    pollStatus();

    return () => clearInterval(interval);
  }, [jobId, accent]);

  const pct = Math.round((modPcts.voz + modPcts.imagenes + modPcts.videos + modPcts.edicion) / 4);
  const R = 52, circ = 2 * Math.PI * R;


  return (
    <div style={{ padding: '20px 16px 120px', overflowY: 'auto', height: '100%' }}>
      <div className="anim-1" style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: -.5 }}>Monitor en vivo</div>
      <div className="anim-2" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
          <svg width={120} height={120} viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={7} />
            <circle cx="60" cy="60" r={R} fill="none" stroke={accent} strokeWidth={7}
            strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset .9s cubic-bezier(.4,0,.2,1)', filter: `drop-shadow(0 0 6px rgba(${rgb},.7))` }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: accent, fontFamily: 'DM Mono', lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', marginTop: 3, letterSpacing: .5 }}>GENERAL</div>
          </div>
          <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: `radial-gradient(circle,rgba(${rgb},.12) 0%,transparent 70%)`, pointerEvents: 'none', opacity: running ? 1 : .3, transition: 'opacity .5s' }}></div>
        </div>
        <div style={{ flex: 1 }}>
<div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1, marginBottom: 6 }}>
    {statusMsg}
</div>
          <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, marginBottom: 4 }}>Bad Bunny – Tití Me Preguntó</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)' }}>
            {stepIdx >= ALL_STEPS.length ? 'Listo para descargar' : ALL_STEPS[Math.min(stepIdx, ALL_STEPS.length - 1)]?.sub || 'Iniciando...'}
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
            {ALL_STEPS.map((_, i) =>
            <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i < stepIdx ? accent : i === stepIdx && running ? `rgba(${rgb},.5)` : 'rgba(255,255,255,.08)', transition: 'background .4s' }}></div>
            )}
          </div>
        </div>
      </div>
      <div className="anim-3" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 20, padding: '18px 12px', marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 16, paddingLeft: 4 }}>MÓDULOS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {MODULE_STEPS.map((m, i) => {
            const modStepIdx = ALL_STEPS.findIndex((s) => s.id === m.id);
            const done = stepIdx > modStepIdx;
            const active = stepIdx === modStepIdx && running;
            const p = modPcts[m.id] || 0;
            return <MiniCircle key={m.id} pct={done ? 100 : p} accent={accent} label={m.label} icon={m.icon} size={74} active={active} done={done} />;
          })}
        </div>
      </div>
      <div className="anim-4" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 16, overflow: 'hidden', marginBottom: 14 }}>
        {ALL_STEPS.map((s, i) => {
          const done = i < stepIdx, active = i === stepIdx && running;
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: i < ALL_STEPS.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none', background: active ? `rgba(${rgb},.06)` : 'transparent', transition: 'background .3s' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? accent : active ? `rgba(${rgb},.2)` : 'rgba(255,255,255,.04)', transition: 'all .4s' }}>
                  {done ? <LI name="Check" size={13} color="#000" strokeWidth={2.5} /> :
                  active ? <LI name="Loader2" size={13} color={accent} style={{ animation: 'spin 1s linear infinite' }} /> :
                  <LI name={s.icon} size={13} color="rgba(255,255,255,.2)" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: done ? 'rgba(255,255,255,.35)' : active ? '#fff' : 'rgba(255,255,255,.2)', fontWeight: active ? 600 : 400, transition: 'color .3s' }}>{s.label}</div>
                </div>
                {active && <div style={{ fontSize: 9, color: accent, fontFamily: 'DM Mono', animation: 'fadeIn .3s' }}>{s.sub}</div>}
                {done && <LI name="CheckCircle2" size={13} color={accent} />}
            </div>);
        })}
      </div>
    </div>
  );
}

export default ProgressScreen;
