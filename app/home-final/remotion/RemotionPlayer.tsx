'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { ProductTourComposition } from './ProductTour';

const FPS = 30;
const TOTAL_FRAMES = 48 * FPS; // ~48 seconds total

const SCENES = [
  { label: 'CRM Pipeline', color: '#3B82F6', startFrame: 0, endFrame: 8 * FPS },
  { label: 'Quotation', color: '#FD9220', startFrame: 8 * FPS, endFrame: 16 * FPS },
  { label: 'Sales Order', color: '#0EA5E9', startFrame: 16 * FPS, endFrame: 24 * FPS },
  { label: 'Production', color: '#0EA5E9', startFrame: 24 * FPS, endFrame: 32 * FPS },
  { label: 'Invoice', color: '#8B5CF6', startFrame: 32 * FPS, endFrame: 40 * FPS },
  { label: 'Dashboard', color: '#10B981', startFrame: 40 * FPS, endFrame: 48 * FPS },
];

export default function RemotionProductPlayer() {
  const playerRef = useRef<PlayerRef | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeScene = SCENES.findIndex(
    (s, i) => currentFrame >= s.startFrame && (i === SCENES.length - 1 || currentFrame < SCENES[i + 1].startFrame)
  );

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onFrame = (e: { detail: { frame: number } }) => {
      setCurrentFrame(e.detail.frame);
    };

    player.addEventListener('play', onPlay);
    player.addEventListener('pause', onPause);
    player.addEventListener('frameupdate', onFrame as EventListener);
    return () => {
      player.removeEventListener('play', onPlay);
      player.removeEventListener('pause', onPause);
      player.removeEventListener('frameupdate', onFrame as EventListener);
    };
  }, []);

  const goToScene = useCallback((idx: number) => {
    const player = playerRef.current;
    if (player) {
      player.seekTo(SCENES[idx].startFrame);
      player.play();
    }
  }, []);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }, [isPlaying]);

  return (
    <div>
      {/* Player container */}
      <div style={{
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.06)',
        background: '#f5f5f7',
      }}>
        <Player
          ref={playerRef}
          component={ProductTourComposition}
          durationInFrames={TOTAL_FRAMES}
          compositionWidth={900}
          compositionHeight={540}
          fps={FPS}
          autoPlay
          loop
          style={{ width: '100%', aspectRatio: '5/3' }}
          controls={false}
        />

        {/* Bottom bar */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(250,250,250,0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5,
                padding: '2px 8px', borderRadius: 99,
                background: activeScene >= 0 ? `${SCENES[Math.max(0, activeScene)].color}12` : '#f0f0f0',
                color: activeScene >= 0 ? SCENES[Math.max(0, activeScene)].color : '#86868b',
              }}>
                {activeScene >= 0 ? `${activeScene + 1} / ${SCENES.length}` : '—'}
              </span>
              <span style={{
                fontSize: 14, fontWeight: 600,
                fontFamily: 'var(--font-caveat), cursive',
                color: activeScene >= 0 ? SCENES[Math.max(0, activeScene)].color : '#86868b',
              }}>
                {activeScene >= 0 ? SCENES[Math.max(0, activeScene)].label : ''}
              </span>
            </div>

            <button
              onClick={togglePlay}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f0f0f0', border: 'none', cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {isPlaying ? (
                <svg width="14" height="14" fill="#86868b" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" fill="#86868b" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Progress bar segments */}
          <div style={{ display: 'flex', gap: 3 }}>
            {SCENES.map((scene, i) => {
              const sceneProgress = i < activeScene
                ? 100
                : i === activeScene
                  ? Math.min(100, ((currentFrame - scene.startFrame) / (scene.endFrame - scene.startFrame)) * 100)
                  : 0;

              return (
                <button
                  key={i}
                  onClick={() => goToScene(i)}
                  style={{
                    flex: 1, height: 4, borderRadius: 99, overflow: 'hidden',
                    background: i <= activeScene ? `${scene.color}18` : '#e5e5ea',
                    cursor: 'pointer', border: 'none', padding: 0,
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    height: '100%', borderRadius: 99, background: scene.color,
                    width: `${sceneProgress}%`,
                    transition: i === activeScene ? 'width 0.05s linear' : 'width 0.3s ease',
                  }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scene navigation chips */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 14, flexWrap: 'wrap' }}>
        {SCENES.map((scene, i) => (
          <button
            key={i}
            onClick={() => goToScene(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 99, border: 'none',
              fontSize: 13, fontWeight: 500,
              fontFamily: 'var(--font-caveat), cursive',
              background: activeScene === i ? `${scene.color}10` : 'transparent',
              color: activeScene === i ? scene.color : '#aeaeb2',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: i <= activeScene ? scene.color : '#d2d2d7',
              transform: activeScene === i ? 'scale(1.4)' : 'scale(1)',
              transition: 'all 0.25s',
            }} />
            {scene.label}
          </button>
        ))}
      </div>
    </div>
  );
}
