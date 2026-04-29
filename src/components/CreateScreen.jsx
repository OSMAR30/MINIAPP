import React, { useState } from 'react';
import { LI } from './Icons';
import { hexToRgb } from '../utils/designUtils';
import { supabase } from '../utils/supabaseClient';

function CreateScreen({ accent, onNavigate, videoReady, setVideoReady }) {

function CreateScreen({ accent, onNavigate, videoReady, setVideoReady }) {
  const [script, setScript] = useState('');
  const [artist, setArtist] = useState('');
  const [sending, setSending] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const rgb = hexToRgb(accent);

  const detect = (t) => {
    const m = t.match(/artista[:\-\s]+([A-ZÁÉÍÓÚa-záéíóú\s]+)/i) || t.match(/^([A-Z][a-záéíóú]+(?:\s[A-Z][a-záéíóú]+)?)/m);
    return m ? m[1].trim() : '';
  };

  const handleSend = async () => {
    if (!script.trim()) return;
    setSending(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([
          { 
            script: script, 
            status: 'pending', 
            progress: 0 
          }
        ])
        .select()
        .single();

      if (error) throw error;

      if (data && data.id) {
        onNavigate('progress', data.id);
      }
    } catch (e) {
      console.error(e);
      alert('Error al enviar el guion a la nube');
    } finally {
      setSending(false);
    }
  };

  const steps = [
    { label: 'Voz', icon: 'Mic2' }, { label: 'Imágenes', icon: 'Images' }, { label: 'Videos', icon: 'Film' }, { label: 'Edición', icon: 'Clapperboard' }
  ];

  return (
    <div style={{ padding: '0 0 120px', overflowY: 'auto', height: '100%' }}>
      <div className="anim-1" style={{ background: `linear-gradient(160deg, rgba(${rgb},.55) 0%, rgba(${rgb},.18) 45%, rgba(${rgb},.04) 100%)`, borderRadius: '0 0 28px 28px', padding: '16px 16px 20px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 220, height: 220, background: `radial-gradient(circle, rgba(${rgb},.5) 0%, transparent 65%)`, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: -20, left: -20, width: 160, height: 160, background: `radial-gradient(circle, rgba(${rgb},.25) 0%, transparent 70%)`, pointerEvents: 'none' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 16, padding: '14px 20px', marginBottom: 14, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,.4)' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: 3, fontFamily: "'MonaSans','DM Sans',sans-serif", textTransform: 'uppercase' }}>Nuevo Video</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', lineHeight: 1.5, marginTop: 4 }}>Pega el guión — el orquestador hace el resto.</div>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.45)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 8 }}>GUIÓN DEL VIDEO</div>
          <textarea
            style={{ width: '100%', background: 'rgba(0,0,0,.28)', backdropFilter: 'blur(8px)', border: `1px solid ${script ? `rgba(${rgb},.35)` : 'rgba(255,255,255,.12)'}`, borderRadius: 16, padding: '14px', color: '#ddd', fontSize: 13, lineHeight: 1.7, resize: 'none', outline: 'none', transition: 'border .2s' }}
            placeholder={"Artista: Bad Bunny\n\n[Verso 1]\nPega aquí el guión completo del video..."}
            value={script}
            onChange={(e) => {setScript(e.target.value);setArtist(detect(e.target.value));}}
            rows={8} />
        </div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {artist &&
          <div className="anim-fade" style={{ background: `rgba(${rgb},.1)`, border: `1px solid rgba(${rgb},.25)`, borderRadius: 12, padding: '10px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <LI name="UserCheck" size={15} color={accent} />
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', fontFamily: 'DM Mono', letterSpacing: 1 }}>ARTISTA DETECTADO</div>
              <div style={{ fontSize: 14, color: accent, fontWeight: 600 }}>{artist}</div>
            </div>
          </div>
        }
        <div className="anim-3" style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5, marginBottom: 8 }}>ARTISTA (CONFIRMAR)</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <LI name="User" size={15} color="rgba(255,255,255,.25)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                  style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: '12px 14px 12px 38px', color: '#ddd', fontSize: 14, outline: 'none' }}
                  placeholder="Nombre del artista..."
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)} />
            </div>
            <button onClick={async () => {
                if (!artist.trim() || generating) return;
                setGenerating(true);
                try {
                  // Simulated AI generation
                  setTimeout(() => {
                    setScript(`Guion para ${artist}: [Intro] ... [Verso 1] ... [Outro] ...`);
                    setGenerating(false);
                  }, 1000);
                } catch (e) { setGenerating(false); }
              }} disabled={!artist.trim() || generating}
              style={{ padding: '12px 14px', borderRadius: 12, border: 'none', background: artist.trim() ? accent : 'rgba(255,255,255,.08)', color: artist.trim() ? '#000' : 'rgba(255,255,255,.2)', fontSize: 12, fontWeight: 700, cursor: artist.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, transition: 'all .2s', whiteSpace: 'nowrap' }}>
              {generating ? <LI name="Loader2" size={13} color="#000" style={{ animation: 'spin 1s linear infinite' }} /> : <LI name="Sparkles" size={13} color={artist.trim() ? '#000' : 'rgba(255,255,255,.2)'} />}
              {generating ? '...' : 'Generar'}
            </button>
          </div>
        </div>
        <div className="anim-4" style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          {steps.map((s, i) =>
            <React.Fragment key={i}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: `rgba(${rgb},.1)`, border: `1px solid rgba(${rgb},.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LI name={s.icon} size={16} color={accent} />
                </div>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', textAlign: 'center' }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width: 20, height: 1, background: `rgba(${rgb},.2)`, flexShrink: 0, marginBottom: 16 }}></div>}
            </React.Fragment>
          )}
        </div>
      </div>
      <div style={{ padding: '0 16px' }}>
        <button className="anim-5 btn-primary" onClick={handleSend} disabled={!script.trim() || sending}
          style={{ width: '100%', padding: '15px', borderRadius: 16, border: 'none', background: script.trim() ? `linear-gradient(135deg,${accent},rgba(${rgb},.7))` : 'rgba(255,255,255,.06)', color: script.trim() ? '#000' : 'rgba(255,255,255,.2)', fontSize: 15, fontWeight: 700, cursor: script.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: script.trim() ? `0 8px 30px rgba(${rgb},.3)` : 'none', transition: 'all .3s' }}>
          {sending ?
            <><LI name="Loader2" size={18} color="#000" style={{ animation: 'spin 1s linear infinite' }} /> Enviando al orquestador...</> :
            <><LI name="Send" size={18} color={script.trim() ? '#000' : 'rgba(255,255,255,.2)'} strokeWidth={2} /> Iniciar producción</>
            }
        </button>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'DM Mono', letterSpacing: 1.5 }}>VIDEO GENERADO</div>
            {videoReady &&
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: `rgba(${rgb},.12)`, border: `1px solid rgba(${rgb},.3)`, padding: '3px 10px', borderRadius: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'block', animation: 'pulse 1.5s infinite' }}></span>
                <span style={{ fontSize: 10, color: accent, fontFamily: 'DM Mono', fontWeight: 600 }}>LISTO</span>
              </div>
            }
          </div>
          {videoReady ?
            <div style={{ background: `rgba(${rgb},.06)`, border: `1px solid rgba(${rgb},.2)`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ background: 'rgba(0,0,0,.5)', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }} onClick={() => setShowPlayer(!showPlayer)}>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,rgba(${rgb},.08),rgba(0,0,0,.4))` }}></div>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: `rgba(${rgb},.2)`, border: `2px solid rgba(${rgb},.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, backdropFilter: 'blur(4px)' }}>
                  <LI name={showPlayer ? 'Pause' : 'PlayCircle'} size={26} color={accent} />
                </div>
                <div style={{ position: 'absolute', bottom: 10, left: 14, right: 14, zIndex: 1 }}>
                  <div style={{ fontSize: 11, color: '#fff', fontWeight: 600, marginBottom: 4 }}>{videoReady.title || 'Video generado'}</div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,.15)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: showPlayer ? '45%' : '0%', background: accent, borderRadius: 2, transition: 'width 3s linear' }}></div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 0 }}>
                <button style={{ flex: 1, padding: '12px', background: 'transparent', border: 'none', borderTop: '1px solid rgba(255,255,255,.06)', color: accent, fontSize: 12, fontFamily: 'DM Mono', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <LI name="Download" size={14} color={accent} /> Descargar
                </button>
                <button onClick={() => setVideoReady(null)} style={{ flex: 1, padding: '12px', background: 'transparent', border: 'none', borderTop: '1px solid rgba(255,255,255,.06)', borderLeft: '1px solid rgba(255,255,255,.06)', color: 'rgba(255,255,255,.3)', fontSize: 12, fontFamily: 'DM Mono', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <LI name="X" size={14} color="rgba(255,255,255,.3)" /> Descartar
                </button>
              </div>
            </div> :
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px dashed rgba(255,255,255,.08)', borderRadius: 16, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <LI name="Film" size={28} color="rgba(255,255,255,.1)" />
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.2)', fontFamily: 'DM Mono', textAlign: 'center' }}>El video aparecerá aquí cuando esté listo</div>
              <button onClick={() => setVideoReady({ title: 'Bad Bunny – Demo' })} style={{ marginTop: 4, padding: '6px 14px', borderRadius: 8, border: `1px solid rgba(${rgb},.2)`, background: `rgba(${rgb},.08)`, color: accent, fontSize: 10, fontFamily: 'DM Mono', cursor: 'pointer' }}>
                Simular video listo
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default CreateScreen;
