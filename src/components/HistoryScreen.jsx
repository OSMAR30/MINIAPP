import React, { useState, useEffect, useRef } from 'react';
import { LI } from './Icons';
import { hexToRgb } from '../utils/designUtils';

const HISTORY = [
  { id: 1, title: 'Bad Bunny – Tití Me Preguntó', artist: 'Bad Bunny', dur: '3:24', date: 'Hoy, 14:32', status: 'ready', tiktok: { likes: 12400, views: 89200, comments: 340 }, color: '#a78bfa' },
  { id: 2, title: 'Peso Pluma – LADY GAGA', artist: 'Peso Pluma', dur: '2:58', date: 'Ayer, 20:11', status: 'ready', tiktok: null, color: '#38bdf8' },
  { id: 3, title: 'Feid – Normal', artist: 'Feid', dur: '3:10', date: '24 Abr', status: 'ready', tiktok: { likes: 5800, views: 31000, comments: 120 }, color: '#4ade80' },
  { id: 4, title: 'J Balvin – Rojo', artist: 'J Balvin', dur: '3:41', date: '23 Abr', status: 'error', tiktok: null, color: '#ff5f5f' }
];

function fmtNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function HistoryScreen({ accent }) {
  const rgb = hexToRgb(accent);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(null);
  const progRef = useRef(null);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
  }, [idx]);

  useEffect(() => {
    if (!playing) {
      clearInterval(progRef.current);
      return;
    }
    progRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progRef.current);
          setPlaying(false);
          return 0;
        }
        return p + 0.35;
      });
    }, 50);
    return () => clearInterval(progRef.current);
  }, [playing]);

  const goTo = (newIdx) => {
    if (newIdx < 0 || newIdx >= HISTORY.length) return;
    setIdx(newIdx);
  };

  const onStart = (clientX) => { touchStartX.current = clientX; };
  const onEnd = (clientX) => {
    if (touchStartX.current === null) return;
    const dx = clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) goTo(idx + 1); else goTo(idx - 1);
    }
    touchStartX.current = null;
  };

  const v = HISTORY[idx];
  const vRgb = hexToRgb(v.color || accent);

  return (
    <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', paddingBottom: '120px' }}>
      <div style={{ background: `linear-gradient(160deg,rgba(${rgb},.55) 0%,rgba(${rgb},.18) 45%,rgba(${rgb},.04) 100%)`, borderRadius: '0 0 28px 28px', padding: '14px 16px 16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 200, height: 200, background: `radial-gradient(circle,rgba(${rgb},.5) 0%,transparent 65%)`, pointerEvents: 'none' }}></div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: 2, fontFamily: "'MonaSans','DM Sans',sans-serif", textTransform: 'uppercase', marginBottom: 1 }}>Historial</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontFamily: 'DM Mono' }}>{HISTORY.length} videos generados</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 8 }}>
            {HISTORY.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === idx ? 18 : 5, height: 5, borderRadius: 3, background: i === idx ? accent : 'rgba(255,255,255,.2)', border: 'none', cursor: 'pointer', transition: 'all .3s', padding: 0 }}></button>
            ))}
          </div>
        </div>
      </div>

      <div 
        style={{ position: 'relative', height: 560, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '20px 0', touchAction: 'pan-y', userSelect: 'none' }} 
        onTouchStart={(e) => onStart(e.touches[0].clientX)} 
        onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
        onMouseDown={(e) => onStart(e.clientX)}
        onMouseUp={(e) => onEnd(e.clientX)}
      >
        <div style={{ position: 'absolute', width: 340, height: 460, background: `radial-gradient(circle, rgba(${vRgb},.4) 0%, transparent 70%)`, borderRadius: '40px', transition: 'all .5s ease', zIndex: 0, filter: 'blur(20px)' }}></div>

        {HISTORY.map((item, i) => {
          const itemRgb = hexToRgb(item.color || accent);
          const diff = i - idx;
          const isActive = diff === 0;
          const isVisible = Math.abs(diff) <= 1;

          return (
            <div
              key={item.id}
              onClick={() => { if(!isActive) goTo(i); else if(item.status === 'ready') setPlaying((p) => !p); }}
              style={{
                position: 'absolute',
                width: 320,
                height: 460,
                borderRadius: 40,
                background: `linear-gradient(160deg,rgba(${itemRgb},.35) 0%,rgba(0,0,0,.85) 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all .5s cubic-bezier(.4,0,.2,1)',
                zIndex: isActive ? 10 : 5,
                opacity: isVisible ? (isActive ? 1 : 0.4) : 0,
                transform: `translateX(${diff * 150}px) scale(${isActive ? 1 : 0.8})`,
                pointerEvents: isActive ? 'auto' : (isVisible ? 'auto' : 'none'),
                border: isActive ? `2px solid rgba(${itemRgb},.5)` : 'none',
                boxShadow: isActive ? `0 20px 50px rgba(0,0,0,0.6), 0 0 20px rgba(${itemRgb},.3)` : 'none',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 55% 40%,rgba(${itemRgb},.3) 0%,transparent 60%)`, pointerEvents: 'none' }}></div>
              {isActive && (
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: `rgba(${itemRgb},.2)`, border: `2px solid rgba(${itemRgb},.7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', zIndex: 1, boxShadow: `0 0 30px rgba(${itemRgb},.5), 0 0 60px rgba(${itemRgb},.2)` }}>
                  <LI name={playing && i === idx ? 'Pause' : 'PlayCircle'} size={32} color={item.color || accent} />
                </div>
              )}
              {isActive && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,.1)', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: item.color || accent, transition: 'width .1s linear', boxShadow: `0 0 8px ${item.color || accent}` }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '0 16px 60px', position: 'relative' }}>
        <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
          <div>
            <div style={{ fontSize: 20, color: '#fff', fontWeight: 700, marginBottom: 4 }}>{v.title}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', fontFamily: 'DM Mono' }}>{v.date} · {v.dur}</div>
          </div>
          <button style={{ width: 42, height: 42, borderRadius: 14, background: `rgba(${vRgb},.15)`, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <LI name={v.status === 'ready' ? 'Download' : 'AlertCircle'} size={20} color={v.status === 'ready' ? v.color || accent : '#ff5f5f'} />
          </button>
        </div>

        <div style={{ padding: '25px 0' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 15 }}>ESTADÍSTICAS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Duración', value: v.dur, icon: 'Clock' },
              { label: 'Estado', value: v.status === 'ready' ? 'Listo' : 'Error', icon: 'CheckCircle2' },
              { label: 'TikTok', value: v.tiktok ? 'Subido' : 'Pendiente', icon: 'Upload' }
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.04)', borderRadius: 16, padding: '15px 8px', textAlign: 'center', border: '1px solid rgba(255,255,255,.06)' }}>
                <LI name={s.icon} size={16} color={accent} style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {v.tiktok && (
            <>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 15 }}>TIKTOK ANALYTICS</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, paddingBottom: 8 }}>
                {[
                  { label: 'Me gusta', value: fmtNum(v.tiktok.likes), icon: 'Heart' },
                  { label: 'Vistas', value: fmtNum(v.tiktok.views), icon: 'PlayCircle' },
                  { label: 'Comentarios', value: fmtNum(v.tiktok.comments), icon: 'MessageCircle' }
                ].map((s, i) => (
                  <div key={i} style={{ background: `rgba(${rgb},.1)`, borderRadius: 16, padding: '15px 8px', textAlign: 'center', border: `1px solid rgba(${rgb},.18)` }}>
                    <LI name={s.icon} size={16} color={accent} style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontSize: 18, color: accent, fontWeight: 700 }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryScreen;
