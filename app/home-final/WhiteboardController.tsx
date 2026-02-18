'use client';

import { useState, useEffect, useCallback } from 'react';
import { Scene1_EmailArrives, Scene2_LeadCreated, Scene3_KanbanDragDrop, Scene4_QuotationCreated } from './WhiteboardScenes1';
import { Scene5_SaleOrService, Scene6_Production, Scene7_InvoiceGenerated, Scene8_DispatchAndRepeat } from './WhiteboardScenes2';

const scenes = [
  { id: 0, label: 'Lead Arrives', sub: 'An enquiry comes in', color: '#3B82F6', duration: 6000 },
  { id: 1, label: 'Added to CRM', sub: 'Lead is created', color: '#8B5CF6', duration: 6000 },
  { id: 2, label: 'Pipeline', sub: 'Drag through stages', color: '#10B981', duration: 7000 },
  { id: 3, label: 'Quotation', sub: 'Send pricing', color: '#F59E0B', duration: 7000 },
  { id: 4, label: 'Sale or Service?', sub: 'Choose the path', color: '#E03B12', duration: 7000 },
  { id: 5, label: 'Production', sub: 'Build & track', color: '#0EA5E9', duration: 8500 },
  { id: 6, label: 'Invoice', sub: 'Get paid', color: '#8B5CF6', duration: 7000 },
  { id: 7, label: 'Dispatch', sub: 'Ship & repeat!', color: '#059669', duration: 10000 },
];

const SceneComponents = [
  Scene1_EmailArrives,
  Scene2_LeadCreated,
  Scene3_KanbanDragDrop,
  Scene4_QuotationCreated,
  Scene5_SaleOrService,
  Scene6_Production,
  Scene7_InvoiceGenerated,
  Scene8_DispatchAndRepeat,
];

export default function WhiteboardController() {
  const [activeScene, setActiveScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById('whiteboard-animation');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isPlaying || !hasStarted) return;

    const duration = scenes[activeScene].duration;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(timer);
        setActiveScene((prev) => (prev + 1) % scenes.length);
        setProgress(0);
        setMountKey((k) => k + 1);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [activeScene, isPlaying, hasStarted]);

  const goToScene = useCallback((idx: number) => {
    setActiveScene(idx);
    setProgress(0);
    setMountKey((k) => k + 1);
    setIsPlaying(true);
    if (!hasStarted) setHasStarted(true);
  }, [hasStarted]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
    if (!hasStarted) setHasStarted(true);
  }, [hasStarted]);

  const ActiveSceneComp = SceneComponents[activeScene];
  const scene = scenes[activeScene];

  return (
    <div id="whiteboard-animation" className="relative">
      {/* Clean video-style canvas — no browser chrome */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: '#fdfbf9',
          boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
        }}
      >
        {/* Scene area — container matches SVG aspect ratio for perfect centering */}
        <div className="relative mx-auto" style={{ aspectRatio: '5 / 3', maxWidth: '800px', width: '100%' }}>
          <div
            key={`scene-${activeScene}-${mountKey}`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ActiveSceneComp playing={hasStarted && isPlaying} />
          </div>
        </div>

        {/* Bottom bar: step info + progress + play/pause */}
        <div className="px-5 py-3" style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
          {/* Step label row */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: `${scene.color}12`, color: scene.color }}
              >
                Step {activeScene + 1}
              </span>
              <span className="text-sm font-semibold" style={{ color: '#1d1d1f', fontFamily: 'var(--font-caveat)', fontSize: '18px' }}>
                {scene.label}
              </span>
              <span className="text-xs" style={{ color: '#86868b' }}>— {scene.sub}</span>
            </div>
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-[#e5e5ea]"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              style={{ background: '#f0f0f0' }}
            >
              {isPlaying ? (
                <svg className="w-3.5 h-3.5" fill="#86868b" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="#86868b" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
          </div>

          {/* Progress segments */}
          <div className="flex gap-1">
            {scenes.map((s, i) => (
              <button
                key={i}
                onClick={() => goToScene(i)}
                className="flex-1 cursor-pointer group"
                title={s.label}
              >
                <div className="h-1 rounded-full overflow-hidden transition-colors" style={{ background: i <= activeScene ? `${s.color}25` : '#e5e5ea' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: s.color,
                      width: i < activeScene ? '100%' : i === activeScene ? `${progress}%` : '0%',
                      transition: i === activeScene ? 'width 0.05s linear' : 'width 0.3s ease',
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step navigation chips */}
      <div className="flex justify-center gap-1 mt-4 flex-wrap">
        {scenes.map((s, i) => (
          <button
            key={i}
            onClick={() => goToScene(i)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300"
            style={{
              background: activeScene === i ? `${s.color}12` : 'transparent',
              color: activeScene === i ? s.color : '#aeaeb2',
              border: activeScene === i ? `1px solid ${s.color}30` : '1px solid transparent',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i <= activeScene ? s.color : '#d2d2d7',
                transform: activeScene === i ? 'scale(1.5)' : 'scale(1)',
              }}
            />
            <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '14px' }}>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
