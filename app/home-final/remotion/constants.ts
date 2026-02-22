// Shared constants for the Remotion product tour
export const FPS = 30;
export const TOTAL_DURATION_FRAMES = 30 * FPS; // 30 seconds total

export const COLORS = {
  primary: '#E03B12',
  accent: '#FD9220',
  dark: '#1d1d1f',
  surface: '#f5f5f7',
  border: '#d2d2d7',
  textPrimary: '#1d1d1f',
  textSecondary: '#86868b',
  textMuted: '#aeaeb2',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  purple: '#8B5CF6',
  cyan: '#0EA5E9',
  white: '#ffffff',
} as const;

export const SCENES = [
  { id: 'lead-arrives', label: 'Lead Arrives', sub: 'An enquiry lands in your inbox', color: COLORS.info, startFrame: 0, durationFrames: 4 * FPS },
  { id: 'crm-capture', label: 'CRM Capture', sub: 'Auto-captured as a lead', color: COLORS.purple, startFrame: 4 * FPS, durationFrames: 3.5 * FPS },
  { id: 'pipeline', label: 'Pipeline', sub: 'Drag through stages', color: COLORS.success, startFrame: 7.5 * FPS, durationFrames: 4 * FPS },
  { id: 'quotation', label: 'Quotation', sub: 'Send professional pricing', color: COLORS.warning, startFrame: 11.5 * FPS, durationFrames: 3.5 * FPS },
  { id: 'production', label: 'Production', sub: 'Plan & build', color: COLORS.cyan, startFrame: 15 * FPS, durationFrames: 4 * FPS },
  { id: 'invoice', label: 'Invoice', sub: 'Get paid with GST', color: COLORS.purple, startFrame: 19 * FPS, durationFrames: 3.5 * FPS },
  { id: 'dispatch', label: 'Dispatch', sub: 'Ship & track', color: COLORS.success, startFrame: 22.5 * FPS, durationFrames: 4 * FPS },
  { id: 'repeat', label: 'Repeat', sub: 'Grow your business', color: COLORS.primary, startFrame: 26.5 * FPS, durationFrames: 3.5 * FPS },
] as const;
