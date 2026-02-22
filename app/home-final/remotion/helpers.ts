import { interpolate, spring, Easing } from 'remotion';

// Smooth fade in with optional slide
export function fadeIn(
  frame: number,
  startFrame: number,
  durationFrames: number = 15,
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up',
  distance: number = 30
) {
  const opacity = interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const offset = interpolate(frame, [startFrame, startFrame + durationFrames], [distance, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const transform =
    direction === 'up' ? `translateY(${offset}px)` :
    direction === 'down' ? `translateY(${-offset}px)` :
    direction === 'left' ? `translateX(${offset}px)` :
    direction === 'right' ? `translateX(${-offset}px)` :
    'none';

  return { opacity, transform };
}

// Spring-based scale pop
export function springPop(frame: number, fps: number, delay: number = 0) {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });
  return { transform: `scale(${s})`, opacity: s };
}

// Typewriter effect — returns how many characters to show
export function typewriter(
  frame: number,
  startFrame: number,
  text: string,
  charsPerSecond: number = 20,
  fps: number = 30
) {
  const elapsed = Math.max(0, frame - startFrame);
  const charsPerFrame = charsPerSecond / fps;
  const charCount = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  return text.slice(0, charCount);
}

// Progress bar interpolation
export function progress(
  frame: number,
  startFrame: number,
  endFrame: number
) {
  return interpolate(frame, [startFrame, endFrame], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
}

// Smooth number counter
export function counter(
  frame: number,
  startFrame: number,
  durationFrames: number,
  from: number,
  to: number
) {
  const value = interpolate(frame, [startFrame, startFrame + durationFrames], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return Math.round(value);
}

// Fade out at end of scene
export function fadeOut(
  frame: number,
  endFrame: number,
  durationFrames: number = 10
) {
  return interpolate(frame, [endFrame - durationFrames, endFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}
