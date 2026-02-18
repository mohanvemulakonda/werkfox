'use client';

import React from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   WhiteboardScenes1.tsx
   Hand-drawn SVG scene components for whiteboard-style animation.
   Each scene uses wobbly cubic bezier paths, Caveat handwriting font,
   and CSS keyframe draw-on animations.
   ═══════════════════════════════════════════════════════════════════════════ */

interface SceneProps {
  playing: boolean;
}

/* ─── Shared Constants ──────────────────────────────────────────────────── */
const COLORS = {
  stroke: '#1d1d1f',
  accent: '#E03B12',
  orange: '#FD9220',
  success: '#10B981',
  info: '#3B82F6',
  warmBg: '#fef3ee',
  greenBg: '#f0fdf4',
} as const;

const FONT = 'var(--font-caveat), cursive';
const VIEWBOX = '0 0 500 300';


/* ═══════════════════════════════════════════════════════════════════════════
   Scene 1 — Email Arrives
   Monitor draws, screen activates, bell notification, envelope on screen,
   opens, paper slides out with lead details.
   Duration budget: ~5.5s
   ═══════════════════════════════════════════════════════════════════════════ */
export function Scene1_EmailArrives({ playing }: SceneProps) {
  const id = 'sc1';
  return (
    <svg viewBox={VIEWBOX} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${id}-drawMonitor {
          from { stroke-dashoffset: 900; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-drawStand {
          from { stroke-dashoffset: 200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        @keyframes ${id}-bellShake {
          0%   { transform: rotate(0deg); }
          20%  { transform: rotate(14deg); }
          35%  { transform: rotate(-12deg); }
          50%  { transform: rotate(8deg); }
          65%  { transform: rotate(-5deg); }
          80%  { transform: rotate(3deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ${id}-badgePop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ${id}-envDraw {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-fillIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ${id}-openFlap {
          0%   { transform: scaleY(1); }
          100% { transform: scaleY(0); }
        }
        @keyframes ${id}-paperSlide {
          0%   { transform: translateY(0px); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translateY(-75px); opacity: 1; }
        }
        @keyframes ${id}-typeIn {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }

        .${id}-monitor {
          stroke-dasharray: 900;
          stroke-dashoffset: ${playing ? '900' : '0'};
          ${playing ? `animation: ${id}-drawMonitor 1s ease-out 0.1s forwards;` : ''}
        }
        .${id}-stand {
          stroke-dasharray: 200;
          stroke-dashoffset: ${playing ? '200' : '0'};
          ${playing ? `animation: ${id}-drawStand 0.5s ease-out 0.8s forwards;` : ''}
        }
        .${id}-screen {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.3s ease-out 1.2s forwards;` : ''}
        }
        .${id}-header {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.3s ease-out 1.4s forwards;` : ''}
        }
        .${id}-bell {
          opacity: ${playing ? '0' : '1'};
          transform-origin: 348px 76px;
          ${playing ? `animation: ${id}-fadeIn 0.2s ease-out 1.6s forwards, ${id}-bellShake 0.6s ease-out 1.7s forwards;` : ''}
        }
        .${id}-badge {
          opacity: ${playing ? '0' : '1'};
          transform-origin: 362px 65px;
          ${playing ? `animation: ${id}-badgePop 0.4s ease-out 2.1s forwards;` : ''}
        }
        .${id}-env-body {
          stroke-dasharray: 600;
          stroke-dashoffset: ${playing ? '600' : '0'};
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-envDraw 0.7s ease-out 2.5s forwards;` : ''}
        }
        .${id}-env-fill {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fillIn 0.01s ease-out 2.8s forwards;` : ''}
        }
        .${id}-env-v {
          stroke-dasharray: 400;
          stroke-dashoffset: ${playing ? '400' : '0'};
          opacity: ${playing ? '0' : '0.3'};
          ${playing ? `animation: ${id}-envDraw 0.5s ease-out 2.9s forwards;` : ''}
        }
        .${id}-flap {
          transform-origin: 250px 118px;
          ${playing ? `animation: ${id}-openFlap 0.3s ease-in-out 3.2s forwards;` : 'transform: scaleY(0);'}
        }
        .${id}-flap-line {
          stroke-dasharray: 400;
          stroke-dashoffset: ${playing ? '400' : '0'};
          ${playing ? `animation: ${id}-envDraw 0.4s ease-out 2.7s forwards;` : ''}
        }
        .${id}-paper {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-paperSlide 0.8s ease-out 3.5s forwards;` : ''}
        }
        .${id}-t1 {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.5s ease-out 4.1s forwards;` : ''}
        }
        .${id}-t2 {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.4s ease-out 4.4s forwards;` : ''}
        }
        .${id}-t3 {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.4s ease-out 4.8s forwards;` : ''}
        }
      `}</style>

      <rect x="10" y="10" width="480" height="280" rx="12" fill="#fdfbf9" stroke="none" />

      {/* ── Monitor outline ── */}
      <path
        className={`${id}-monitor`}
        d="M 100,28 C 103,25 397,24 400,28 C 403,31 404,215 400,218 C 397,221 103,222 100,218 C 97,215 97,31 100,28 Z"
        fill="none" stroke={COLORS.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── Stand ── */}
      <path
        className={`${id}-stand`}
        d="M 220,220 C 222,230 225,248 222,252 C 218,255 198,256 196,258 C 194,260 302,260 304,258 C 302,256 282,255 278,252 C 275,248 278,230 280,220"
        fill="none" stroke={COLORS.stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── Screen background ── */}
      <rect className={`${id}-screen`} x="108" y="36" width="284" height="178" rx="4" fill="#ffffff" stroke="none" />

      {/* ── Header bar ── */}
      <g className={`${id}-header`}>
        <rect x="108" y="36" width="284" height="22" rx="3" fill="#f9fafb" />
        <line x1="108" y1="58" x2="392" y2="58" stroke="#e5e7eb" strokeWidth="1" />
        <circle cx="120" cy="47" r="3" fill="#fb7185" />
        <circle cx="131" cy="47" r="3" fill="#fbbf24" />
        <circle cx="142" cy="47" r="3" fill="#34d399" />
        <text x="260" y="51" fontFamily={FONT} fontSize="10" fill="#9ca3af" textAnchor="middle">Inbox — WerkFox Mail</text>
      </g>

      {/* ── Bell notification ── */}
      <g className={`${id}-bell`}>
        <path
          d="M 342,68 C 342,62 344,58 348,58 C 352,58 354,62 354,68 C 354,70 356,73 356,75 L 340,75 C 340,73 342,70 342,68 Z"
          fill={COLORS.orange} stroke={COLORS.stroke} strokeWidth="1.3" strokeLinecap="round"
        />
        <circle cx="348" cy="78" r="1.8" fill={COLORS.stroke} />
        <path d="M 358,63 C 360,61 361,66 360,68" fill="none" stroke={COLORS.accent} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 338,63 C 336,61 335,66 336,68" fill="none" stroke={COLORS.accent} strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* ── Badge "1" ── */}
      <g className={`${id}-badge`}>
        <circle cx="362" cy="65" r="8" fill={COLORS.accent} />
        <text x="362" y="69" fontFamily={FONT} fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">1</text>
      </g>

      {/* ── Envelope body ── */}
      <path
        className={`${id}-env-body`}
        d="M 195,118 C 197,116 303,115 305,118 C 307,120 307,192 305,195 C 303,197 197,198 195,195 C 193,192 193,120 195,118 Z"
        fill={COLORS.warmBg} stroke={COLORS.stroke} strokeWidth="2" strokeLinecap="round"
      />

      {/* ── Envelope fill ── */}
      <rect className={`${id}-env-fill`} x="199" y="122" width="102" height="70" rx="2" fill={COLORS.warmBg} stroke="none" />

      {/* ── Envelope flap ── */}
      <g className={`${id}-flap`}>
        <path
          className={`${id}-flap-line`}
          d="M 195,118 C 200,116 240,160 250,164 C 260,160 300,116 305,118"
          fill={COLORS.warmBg} stroke={COLORS.stroke} strokeWidth="2" strokeLinecap="round"
        />
      </g>

      {/* ── Inner V ── */}
      <path
        className={`${id}-env-v`}
        d="M 197,194 C 212,172 240,152 250,148 C 260,152 288,172 303,194"
        fill="none" stroke={COLORS.stroke} strokeWidth="1" strokeLinecap="round"
      />

      {/* ── Paper sliding out ── */}
      <g className={`${id}-paper`}>
        <path
          d="M 202,110 C 204,108 296,107 298,110 C 300,112 301,190 298,192 C 296,194 204,195 202,192 C 200,190 200,112 202,110 Z"
          fill="#ffffff" stroke={COLORS.stroke} strokeWidth="1.6" strokeLinecap="round"
        />
        <line x1="210" y1="118" x2="290" y2="118" stroke="#e5e7eb" strokeWidth="0.8" />
        <text className={`${id}-t1`} x="214" y="138" fontFamily={FONT} fontSize="12" fill={COLORS.stroke}>
          Need 500 steel brackets...
        </text>
        <text className={`${id}-t2`} x="214" y="156" fontFamily={FONT} fontSize="11" fill="#6b7280">
          Delivery by March...
        </text>
        <text className={`${id}-t3`} x="214" y="174" fontFamily={FONT} fontSize="12" fill={COLORS.accent} fontWeight="bold">
          Budget: &#x20B9;2.5L
        </text>
        <line x1="212" y1="183" x2="288" y2="183" stroke="#e5e7eb" strokeWidth="0.8" />
      </g>

      {/* ── Decorative ── */}
      <text x="30" y="50" fontFamily={FONT} fontSize="11" fill="#9ca3af" opacity="0.5">incoming mail</text>
      <path d="M 30,58 C 50,65 70,60 88,48" fill="none" stroke={COLORS.stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
      <path d="M 86,50 L 90,47 L 87,54" fill="none" stroke={COLORS.stroke} strokeWidth="1" opacity="0.2" />
      <text x="435" y="100" fontFamily={FONT} fontSize="18" fill={COLORS.orange} opacity="0.3">*</text>
      <text x="455" y="140" fontFamily={FONT} fontSize="12" fill={COLORS.accent} opacity="0.25">*</text>

      {/* Bottom label */}
      <text x="250" y="280" fontFamily={FONT} fontSize="14" fill="#9ca3af" textAnchor="middle" opacity="0.7">
        A new enquiry lands in your inbox
      </text>
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   Scene 2 — Lead Created
   Person at desk, monitor shows WerkFox CRM form, fields populate,
   checkmark pops, lightbulb sparkle near person.
   Duration budget: ~5.5s
   ═══════════════════════════════════════════════════════════════════════════ */
export function Scene2_LeadCreated({ playing }: SceneProps) {
  const id = 'sc2';
  return (
    <svg viewBox={VIEWBOX} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${id}-drawDesk {
          from { stroke-dashoffset: 500; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-drawMonitor {
          from { stroke-dashoffset: 800; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        @keyframes ${id}-typeIn {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes ${id}-checkPop {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          60%  { transform: scale(1.2) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes ${id}-fieldDraw {
          from { stroke-dashoffset: 300; }
          to   { stroke-dashoffset: 0; }
        }
        .${id}-desk {
          stroke-dasharray: 500;
          stroke-dashoffset: ${playing ? '500' : '0'};
          ${playing ? `animation: ${id}-drawDesk 0.6s ease-out 0.1s forwards;` : ''}
        }
        .${id}-monitor {
          stroke-dasharray: 800;
          stroke-dashoffset: ${playing ? '800' : '0'};
          ${playing ? `animation: ${id}-drawMonitor 0.8s ease-out 0.5s forwards;` : ''}
        }
        .${id}-screen-bg {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.3s ease-out 1.2s forwards;` : ''}
        }
        .${id}-title-bar {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.3s ease-out 1.4s forwards;` : ''}
        }
        .${id}-heading {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.2s ease-out 1.6s forwards;` : ''}
        }
        .${id}-f1-box {
          stroke-dasharray: 300;
          stroke-dashoffset: ${playing ? '300' : '0'};
          ${playing ? `animation: ${id}-fieldDraw 0.4s ease-out 1.8s forwards;` : ''}
        }
        .${id}-f1-lbl {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.2s ease-out 1.7s forwards;` : ''}
        }
        .${id}-f1-txt {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.5s ease-out 2.1s forwards;` : ''}
        }
        .${id}-f2-box {
          stroke-dasharray: 300;
          stroke-dashoffset: ${playing ? '300' : '0'};
          ${playing ? `animation: ${id}-fieldDraw 0.4s ease-out 2.5s forwards;` : ''}
        }
        .${id}-f2-lbl {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.2s ease-out 2.4s forwards;` : ''}
        }
        .${id}-f2-txt {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.5s ease-out 2.8s forwards;` : ''}
        }
        .${id}-f3-box {
          stroke-dasharray: 300;
          stroke-dashoffset: ${playing ? '300' : '0'};
          ${playing ? `animation: ${id}-fieldDraw 0.4s ease-out 3.0s forwards;` : ''}
        }
        .${id}-f3-lbl {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.2s ease-out 2.9s forwards;` : ''}
        }
        .${id}-f3-txt {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.5s ease-out 3.3s forwards;` : ''}
        }
        .${id}-f4-box {
          stroke-dasharray: 300;
          stroke-dashoffset: ${playing ? '300' : '0'};
          ${playing ? `animation: ${id}-fieldDraw 0.4s ease-out 3.5s forwards;` : ''}
        }
        .${id}-f4-lbl {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.2s ease-out 3.4s forwards;` : ''}
        }
        .${id}-f4-txt {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.5s ease-out 3.8s forwards;` : ''}
        }
        .${id}-buttons {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.3s ease-out 4.2s forwards;` : ''}
        }
        .${id}-checkmark {
          transform-origin: 405px 170px;
          transform: scale(${playing ? '0' : '1'});
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-checkPop 0.5s ease-out 4.6s forwards;` : ''}
        }
      `}</style>

      <rect x="10" y="10" width="480" height="280" rx="12" fill="#fdfbf9" stroke="none" />

      {/* ── Desk surface ── */}
      <path
        className={`${id}-desk`}
        d="M 15,232 C 100,231 250,230 400,231 C 440,231 470,232 485,232"
        fill="none" stroke={COLORS.stroke} strokeWidth="2" strokeLinecap="round"
      />
      <path className={`${id}-desk`}
        d="M 60,232 C 58,248 56,262 55,272" fill="none" stroke={COLORS.stroke} strokeWidth="1.8" strokeLinecap="round" />
      <path className={`${id}-desk`}
        d="M 430,232 C 432,248 434,262 435,272" fill="none" stroke={COLORS.stroke} strokeWidth="1.8" strokeLinecap="round" />

      {/* ── Monitor on desk ── */}
      <path
        className={`${id}-monitor`}
        d="M 165,38 C 168,35 437,34 440,38 C 443,41 444,210 440,213 C 437,216 168,217 165,213 C 162,210 162,41 165,38 Z"
        fill="none" stroke={COLORS.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <path className={`${id}-monitor`}
        d="M 282,216 C 284,224 285,229 283,231 C 280,233 268,233 266,231 C 330,233 334,233 332,231 C 330,229 318,224 320,216"
        fill="none" stroke={COLORS.stroke} strokeWidth="2" strokeLinecap="round" />

      {/* ── Screen background ── */}
      <rect className={`${id}-screen-bg`} x="173" y="46" width="260" height="162" rx="4" fill="#ffffff" stroke="none" />

      {/* ── Title bar ── */}
      <g className={`${id}-title-bar`}>
        <rect x="173" y="46" width="260" height="22" rx="3" fill="#f9fafb" stroke="none" />
        <line x1="173" y1="68" x2="433" y2="68" stroke="#e5e7eb" strokeWidth="1" />
        <circle cx="186" cy="57" r="3" fill="#fb7185" />
        <circle cx="197" cy="57" r="3" fill="#fbbf24" />
        <circle cx="208" cy="57" r="3" fill="#34d399" />
        <text x="310" y="61" fontFamily={FONT} fontSize="10" fill={COLORS.stroke} textAnchor="middle" fontWeight="bold">
          WerkFox — New Lead
        </text>
      </g>

      {/* ── Form heading ── */}
      <g className={`${id}-heading`}>
        <text x="188" y="86" fontFamily={FONT} fontSize="12" fill={COLORS.accent} fontWeight="bold">Create Lead</text>
        <line x1="188" y1="90" x2="250" y2="90" stroke={COLORS.accent} strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* ── Field 1: Name ── */}
      <text className={`${id}-f1-lbl`} x="188" y="105" fontFamily={FONT} fontSize="9" fill="#6b7280">Name</text>
      <path className={`${id}-f1-box`}
        d="M 186,109 C 188,107 318,107 320,109 C 322,111 322,123 320,125 C 318,127 188,127 186,125 C 184,123 184,111 186,109 Z"
        fill="#fef9f5" stroke={COLORS.stroke} strokeWidth="1.2" strokeLinecap="round" />
      <text className={`${id}-f1-txt`} x="193" y="120" fontFamily={FONT} fontSize="11" fill={COLORS.stroke}>Patel Manufacturing</text>

      {/* ── Field 2: Product ── */}
      <text className={`${id}-f2-lbl`} x="188" y="140" fontFamily={FONT} fontSize="9" fill="#6b7280">Product</text>
      <path className={`${id}-f2-box`}
        d="M 186,144 C 188,142 318,142 320,144 C 322,146 322,158 320,160 C 318,162 188,162 186,160 C 184,158 184,146 186,144 Z"
        fill="#fef9f5" stroke={COLORS.stroke} strokeWidth="1.2" strokeLinecap="round" />
      <text className={`${id}-f2-txt`} x="193" y="155" fontFamily={FONT} fontSize="11" fill={COLORS.stroke}>Steel Brackets</text>

      {/* ── Field 3: Value ── */}
      <text className={`${id}-f3-lbl`} x="335" y="105" fontFamily={FONT} fontSize="9" fill="#6b7280">Value</text>
      <path className={`${id}-f3-box`}
        d="M 333,109 C 335,107 418,107 420,109 C 422,111 422,123 420,125 C 418,127 335,127 333,125 C 331,123 331,111 333,109 Z"
        fill="#fef9f5" stroke={COLORS.stroke} strokeWidth="1.2" strokeLinecap="round" />
      <text className={`${id}-f3-txt`} x="340" y="120" fontFamily={FONT} fontSize="11" fill={COLORS.accent} fontWeight="bold">&#x20B9;2.5L</text>

      {/* ── Field 4: Stage ── */}
      <text className={`${id}-f4-lbl`} x="335" y="140" fontFamily={FONT} fontSize="9" fill="#6b7280">Stage</text>
      <path className={`${id}-f4-box`}
        d="M 333,144 C 335,142 418,142 420,144 C 422,146 422,158 420,160 C 418,162 335,162 333,160 C 331,158 331,146 333,144 Z"
        fill={COLORS.greenBg} stroke={COLORS.success} strokeWidth="1.3" strokeLinecap="round" />
      <text className={`${id}-f4-txt`} x="340" y="155" fontFamily={FONT} fontSize="11" fill={COLORS.success} fontWeight="bold">NEW</text>

      {/* ── Buttons ── */}
      <g className={`${id}-buttons`}>
        <rect x="186" y="172" width="52" height="18" rx="6" fill={COLORS.accent} opacity="0.9" />
        <text x="212" y="185" fontFamily={FONT} fontSize="10" fill="#ffffff" textAnchor="middle">Save</text>
        <rect x="246" y="172" width="52" height="18" rx="6" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
        <text x="272" y="185" fontFamily={FONT} fontSize="10" fill="#6b7280" textAnchor="middle">Cancel</text>
      </g>

      {/* ── Green checkmark ── */}
      <g className={`${id}-checkmark`}>
        <circle cx="405" cy="170" r="16" fill={COLORS.success} opacity="0.15" />
        <circle cx="405" cy="170" r="12" fill={COLORS.success} />
        <path d="M 398,170 L 403,175 L 413,164" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Bottom label */}
      <text x="300" y="280" fontFamily={FONT} fontSize="14" fill="#9ca3af" textAnchor="middle" opacity="0.7">
        WerkFox auto-creates the lead
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Scene 3 — Kanban Drag & Drop
   Three columns, a card, animated cursor with click ripple, smooth drag.
   Duration budget: ~6.5s
   ═══════════════════════════════════════════════════════════════════════════ */
export function Scene3_KanbanDragDrop({ playing }: SceneProps) {
  const id = 'sc3';
  return (
    <svg viewBox={VIEWBOX} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${id}-drawCol {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ${id}-cardAppear {
          0%   { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* Cursor path: appear top-right → move to card → click → drag col1→col2 → drag col2→col3 */
        @keyframes ${id}-cursorPath {
          0%    { transform: translate(320px, 60px); opacity: 0; }
          6%    { transform: translate(320px, 60px); opacity: 1; }
          /* Move to card position */
          20%   { transform: translate(105px, 130px); opacity: 1; }
          /* Hover pause */
          24%   { transform: translate(105px, 130px); opacity: 1; }
          /* Click press (slight down) */
          26%   { transform: translate(105px, 132px); opacity: 1; }
          /* Click release */
          28%   { transform: translate(105px, 130px); opacity: 1; }
          /* Drag to col 2 */
          52%   { transform: translate(253px, 130px); opacity: 1; }
          /* Brief pause in col 2 */
          56%   { transform: translate(253px, 130px); opacity: 1; }
          /* Drag to col 3 */
          82%   { transform: translate(403px, 130px); opacity: 1; }
          100%  { transform: translate(403px, 130px); opacity: 1; }
        }

        /* Card follows drag timing exactly */
        @keyframes ${id}-cardDragFull {
          0%    { transform: translate(0px, 0px); }
          52%   { transform: translate(150px, 0px); }
          56%   { transform: translate(150px, 0px); }
          82%   { transform: translate(300px, 0px); }
          100%  { transform: translate(300px, 0px); }
        }

        /* Card scales up on cursor click then back down */
        @keyframes ${id}-cardPress {
          0%    { transform: scale(1); }
          40%   { transform: scale(1.08); }
          100%  { transform: scale(1); }
        }

        /* Click ripple: circle expands and fades */
        @keyframes ${id}-clickRipple {
          0%   { r: 2; opacity: 0.6; }
          100% { r: 28; opacity: 0; }
        }

        @keyframes ${id}-cardHighlight {
          0%   { filter: drop-shadow(0 0 0px transparent); }
          50%  { filter: drop-shadow(0 2px 8px rgba(224, 59, 18, 0.3)); }
          100% { filter: drop-shadow(0 2px 8px rgba(224, 59, 18, 0.3)); }
        }

        @keyframes ${id}-sparkle {
          0%   { transform: scale(0) rotate(0deg); opacity: 0; }
          50%  { transform: scale(1.3) rotate(20deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .${id}-col1 {
          stroke-dasharray: 600;
          stroke-dashoffset: ${playing ? '600' : '0'};
          ${playing ? `animation: ${id}-drawCol 0.6s ease-out 0.1s forwards;` : ''}
        }
        .${id}-col2 {
          stroke-dasharray: 600;
          stroke-dashoffset: ${playing ? '600' : '0'};
          ${playing ? `animation: ${id}-drawCol 0.6s ease-out 0.3s forwards;` : ''}
        }
        .${id}-col3 {
          stroke-dasharray: 600;
          stroke-dashoffset: ${playing ? '600' : '0'};
          ${playing ? `animation: ${id}-drawCol 0.6s ease-out 0.5s forwards;` : ''}
        }
        .${id}-col-label {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.3s ease-out 0.8s forwards;` : ''}
        }
        .${id}-card {
          opacity: ${playing ? '0' : '1'};
          ${playing
            ? `animation: ${id}-cardAppear 0.4s ease-out 1.2s forwards, ${id}-cardDragFull 3.5s ease-in-out 2.2s forwards;`
            : 'transform: translate(300px, 0px);'}
        }
        .${id}-card-inner {
          transform-origin: 87px 122px;
          ${playing ? `animation: ${id}-cardPress 0.3s ease-in-out 2.0s forwards;` : ''}
        }
        .${id}-card-glow {
          opacity: 0;
          ${playing ? `animation: ${id}-cardHighlight 0.5s ease-out 2.0s forwards;` : ''}
        }
        .${id}-cursor {
          opacity: 0;
          ${playing ? `animation: ${id}-cursorPath 3.5s ease-in-out 1.8s forwards;` : ''}
        }
        .${id}-click-ripple {
          opacity: 0;
          ${playing ? `animation: ${id}-clickRipple 0.5s ease-out 2.0s forwards;` : ''}
        }
        .${id}-sparkle {
          opacity: ${playing ? '0' : '1'};
          transform-origin: center;
          ${playing ? `animation: ${id}-sparkle 0.4s ease-out 6.0s forwards;` : ''}
        }
        .${id}-drop-hint {
          opacity: ${playing ? '0' : '0.4'};
          ${playing ? `animation: ${id}-fadeIn 0.3s ease-out 0.8s forwards;` : ''}
        }
      `}</style>

      <rect x="10" y="10" width="480" height="280" rx="12" fill="#fdfbf9" stroke="none" />

      {/* ── Column 1: NEW ── */}
      <path className={`${id}-col1`}
        d="M 28,45 C 30,43 152,42 155,45 C 158,48 158,255 155,258 C 152,261 30,260 28,258 C 25,255 25,48 28,45 Z"
        fill="#fef9f5" stroke={COLORS.stroke} strokeWidth="1.8" strokeLinecap="round"
      />
      <text className={`${id}-col-label`} x="91" y="68" fontFamily={FONT} fontSize="14" fill={COLORS.accent} textAnchor="middle" fontWeight="bold">NEW</text>
      <line className={`${id}-col-label`} x1="40" y1="76" x2="142" y2="76" stroke={COLORS.accent} strokeWidth="2" opacity="0.4" />
      <g className={`${id}-col-label`}>
        <circle cx="142" cy="63" r="9" fill={COLORS.accent} opacity="0.15" />
        <text x="142" y="67" fontFamily={FONT} fontSize="10" fill={COLORS.accent} textAnchor="middle">1</text>
      </g>

      {/* ── Column 2: CONTACTED ── */}
      <path className={`${id}-col2`}
        d="M 175,45 C 177,43 302,42 305,45 C 308,48 308,255 305,258 C 302,261 177,260 175,258 C 172,255 172,48 175,45 Z"
        fill="#f8fafc" stroke={COLORS.stroke} strokeWidth="1.8" strokeLinecap="round"
      />
      <text className={`${id}-col-label`} x="240" y="68" fontFamily={FONT} fontSize="13" fill={COLORS.info} textAnchor="middle" fontWeight="bold">CONTACTED</text>
      <line className={`${id}-col-label`} x1="185" y1="76" x2="295" y2="76" stroke={COLORS.info} strokeWidth="2" opacity="0.4" />
      {/* Faint "Drop here" hint instead of dark ghost boxes */}
      <text className={`${id}-drop-hint`} x="240" y="155" fontFamily={FONT} fontSize="11" fill={COLORS.info} textAnchor="middle" opacity="0.35">
        Drop here
      </text>
      <rect className={`${id}-drop-hint`} x="195" y="130" width="90" height="36" rx="8" fill="none" stroke={COLORS.info} strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

      {/* ── Column 3: QUALIFIED ── */}
      <path className={`${id}-col3`}
        d="M 325,45 C 327,43 465,42 468,45 C 471,48 471,255 468,258 C 465,261 327,260 325,258 C 322,255 322,48 325,45 Z"
        fill={COLORS.greenBg} stroke={COLORS.stroke} strokeWidth="1.8" strokeLinecap="round"
      />
      <text className={`${id}-col-label`} x="396" y="68" fontFamily={FONT} fontSize="13" fill={COLORS.success} textAnchor="middle" fontWeight="bold">QUALIFIED</text>
      <line className={`${id}-col-label`} x1="335" y1="76" x2="458" y2="76" stroke={COLORS.success} strokeWidth="2" opacity="0.4" />
      {/* Faint "Drop here" hint */}
      <text className={`${id}-drop-hint`} x="396" y="155" fontFamily={FONT} fontSize="11" fill={COLORS.success} textAnchor="middle" opacity="0.35">
        Drop here
      </text>
      <rect className={`${id}-drop-hint`} x="347" y="130" width="98" height="36" rx="8" fill="none" stroke={COLORS.success} strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

      {/* ── Click ripple effect (circle at cursor click location) ── */}
      <circle
        className={`${id}-click-ripple`}
        cx="105"
        cy="130"
        r="2"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
      />

      {/* ── The draggable card (animated with cardDragFull) ── */}
      <g className={`${id}-card`}>
        <g className={`${id}-card-inner`}>
          <rect x="42" y="90" width="98" height="72" rx="8" fill="#000" opacity="0.04" />
          <path
            d="M 40,88 C 43,85 132,85 135,88 C 138,91 138,153 135,156 C 132,159 43,159 40,156 C 37,153 37,91 40,88 Z"
            fill="#ffffff" stroke={COLORS.stroke} strokeWidth="1.6" strokeLinecap="round"
          />
          <rect x="44" y="91" width="87" height="4" rx="2" fill={COLORS.accent} opacity="0.7" />
          <text x="52" y="115" fontFamily={FONT} fontSize="13" fill={COLORS.stroke} fontWeight="bold">Patel Mfg</text>
          <text x="52" y="133" fontFamily={FONT} fontSize="12" fill={COLORS.accent}>&#x20B9;2.5L</text>
          <rect x="52" y="140" width="42" height="12" rx="4" fill={COLORS.warmBg} stroke={COLORS.orange} strokeWidth="0.8" />
          <text x="73" y="150" fontFamily={FONT} fontSize="8" fill={COLORS.orange} textAnchor="middle">Steel</text>
        </g>
      </g>

      {/* ── Single animated cursor ── */}
      <g className={`${id}-cursor`}>
        <path d="M 0,0 L 0,18 L 5,14 L 9,22 L 12,20 L 8,12 L 14,10 Z"
          fill={COLORS.stroke} stroke="white" strokeWidth="1" />
      </g>

      {/* ── Sparkle effect at end ── */}
      <g className={`${id}-sparkle`}>
        <path d="M 440,100 L 443,107 L 450,107 L 444,112 L 446,119 L 440,115 L 434,119 L 436,112 L 430,107 L 437,107 Z"
          fill={COLORS.orange} stroke={COLORS.accent} strokeWidth="0.5" />
        <path d="M 460,85 L 462,89 L 466,89 L 463,92 L 464,96 L 460,93 L 456,96 L 457,92 L 454,89 L 458,89 Z"
          fill={COLORS.success} stroke="none" opacity="0.7" />
        <circle cx="450" cy="80" r="2" fill={COLORS.accent} opacity="0.5" />
        <circle cx="470" cy="95" r="1.5" fill={COLORS.orange} opacity="0.5" />
      </g>

      {/* Bottom label */}
      <text x="250" y="286" fontFamily={FONT} fontSize="14" fill="#9ca3af" textAnchor="middle" opacity="0.7">
        Drag leads through your pipeline
      </text>
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   Scene 4 — Quotation Created
   A document draws itself, line items appear, total calculates, SEND button
   fades out, then Sent badge pops in with a clean sequential transition.
   Duration budget: ~6.5s
   ═══════════════════════════════════════════════════════════════════════════ */
export function Scene4_QuotationCreated({ playing }: SceneProps) {
  const id = 'sc4';
  return (
    <svg viewBox={VIEWBOX} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes ${id}-drawDoc {
          from { stroke-dashoffset: 900; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-typeIn {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes ${id}-fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        @keyframes ${id}-drawLine {
          from { stroke-dashoffset: 300; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-btnDraw {
          from { stroke-dashoffset: 200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-btnClick {
          0%   { transform: scale(1); }
          30%  { transform: scale(0.92); }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes ${id}-cursorAppear {
          0%   { transform: translate(450px, 80px); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translate(388px, 238px); opacity: 1; }
        }
        /* Red button fades out cleanly */
        @keyframes ${id}-btnFadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        /* Green badge pops in from scale 0 */
        @keyframes ${id}-badgePop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ${id}-foldDraw {
          from { stroke-dashoffset: 80; }
          to   { stroke-dashoffset: 0; }
        }

        .${id}-doc {
          stroke-dasharray: 900;
          stroke-dashoffset: ${playing ? '900' : '0'};
          ${playing ? `animation: ${id}-drawDoc 1s ease-out 0.1s forwards;` : ''}
        }
        .${id}-fold {
          stroke-dasharray: 80;
          stroke-dashoffset: ${playing ? '80' : '0'};
          ${playing ? `animation: ${id}-foldDraw 0.4s ease-out 0.8s forwards;` : ''}
        }
        .${id}-fold-fill {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.01s ease-out 0.9s forwards;` : ''}
        }
        .${id}-title {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.7s ease-out 1.3s forwards;` : ''}
        }
        .${id}-subtitle {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.3s ease-out 1.8s forwards;` : ''}
        }
        .${id}-header-line {
          stroke-dasharray: 300;
          stroke-dashoffset: ${playing ? '300' : '0'};
          ${playing ? `animation: ${id}-drawLine 0.4s ease-out 2.0s forwards;` : ''}
        }
        .${id}-item1 {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.6s ease-out 2.4s forwards;` : ''}
        }
        .${id}-item2 {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.6s ease-out 3.0s forwards;` : ''}
        }
        .${id}-total-line {
          stroke-dasharray: 300;
          stroke-dashoffset: ${playing ? '300' : '0'};
          ${playing ? `animation: ${id}-drawLine 0.4s ease-out 3.5s forwards;` : ''}
        }
        .${id}-total-text {
          clip-path: ${playing ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)'};
          ${playing ? `animation: ${id}-typeIn 0.5s ease-out 3.8s forwards;` : ''}
        }
        /* SEND button: draws in, then label appears */
        .${id}-btn {
          stroke-dasharray: 200;
          stroke-dashoffset: ${playing ? '200' : '0'};
          ${playing ? `animation: ${id}-btnDraw 0.4s ease-out 4.2s forwards;` : ''}
        }
        .${id}-btn-label {
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-fadeIn 0.2s ease-out 4.4s forwards;` : ''}
        }
        /* Button group: click animation, then FADE OUT */
        .${id}-btn-group {
          transform-origin: 388px 233px;
          ${playing
            ? `animation: ${id}-btnClick 0.3s ease-in-out 5.2s forwards, ${id}-btnFadeOut 0.25s ease-in 5.5s forwards;`
            : 'opacity: 0;'}
        }
        .${id}-cursor {
          opacity: 0;
          ${playing ? `animation: ${id}-cursorAppear 0.8s ease-in-out 4.6s forwards;` : ''}
        }
        /* Sent badge: pops in AFTER red button fully fades (5.5s + 0.2s gap = 5.7s start) */
        .${id}-sent-badge {
          transform-origin: 388px 233px;
          transform: scale(${playing ? '0' : '1'});
          opacity: ${playing ? '0' : '1'};
          ${playing ? `animation: ${id}-badgePop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 5.95s forwards;` : ''}
        }
      `}</style>

      <rect x="10" y="10" width="480" height="280" rx="12" fill="#fdfbf9" stroke="none" />

      {/* ── Document outline ── */}
      <path className={`${id}-doc`}
        d="M 115,22 C 118,20 355,19 358,20 L 390,52 C 392,54 393,273 390,276 C 387,279 118,278 115,276 C 112,273 112,25 115,22 Z"
        fill="#ffffff" stroke={COLORS.stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── Folded corner ── */}
      <path className={`${id}-fold-fill`} d="M 358,20 L 358,52 L 390,52 Z" fill="#f3f4f6" />
      <path className={`${id}-fold`}
        d="M 358,20 C 358,35 357,49 358,52 C 370,52 382,52 390,52"
        fill="none" stroke={COLORS.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── Title ── */}
      <text className={`${id}-title`} x="135" y="78" fontFamily={FONT} fontSize="18" fill={COLORS.stroke} fontWeight="bold">
        Quotation #QTN-1042
      </text>

      {/* ── Subtitle ── */}
      <g className={`${id}-subtitle`}>
        <text x="135" y="96" fontFamily={FONT} fontSize="11" fill="#9ca3af">Patel Manufacturing  |  Feb 2026</text>
      </g>

      {/* ── Header separator ── */}
      <line className={`${id}-header-line`} x1="135" y1="105" x2="375" y2="105"
        stroke={COLORS.stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

      {/* ── Table header ── */}
      <g className={`${id}-subtitle`}>
        <text x="135" y="122" fontFamily={FONT} fontSize="10" fill="#9ca3af">Item</text>
        <text x="330" y="122" fontFamily={FONT} fontSize="10" fill="#9ca3af" textAnchor="end">Amount</text>
      </g>

      {/* ── Line items ── */}
      <g className={`${id}-item1`}>
        <text x="135" y="145" fontFamily={FONT} fontSize="13" fill={COLORS.stroke}>Steel Brackets x500</text>
        <text x="370" y="145" fontFamily={FONT} fontSize="13" fill={COLORS.stroke} textAnchor="end">&#x20B9;1,20,000</text>
      </g>
      <line className={`${id}-item1`} x1="135" y1="153" x2="370" y2="153" stroke="#e5e7eb" strokeWidth="0.8" strokeDasharray="3 3" />
      <g className={`${id}-item2`}>
        <text x="135" y="175" fontFamily={FONT} fontSize="13" fill={COLORS.stroke}>Custom Gears x200</text>
        <text x="370" y="175" fontFamily={FONT} fontSize="13" fill={COLORS.stroke} textAnchor="end">&#x20B9;1,28,000</text>
      </g>
      <line className={`${id}-item2`} x1="135" y1="183" x2="370" y2="183" stroke="#e5e7eb" strokeWidth="0.8" strokeDasharray="3 3" />

      {/* ── Total ── */}
      <line className={`${id}-total-line`} x1="135" y1="196" x2="375" y2="196"
        stroke={COLORS.stroke} strokeWidth="1.8" strokeLinecap="round" />
      <g className={`${id}-total-text`}>
        <text x="135" y="216" fontFamily={FONT} fontSize="15" fill={COLORS.stroke} fontWeight="bold">Total:</text>
        <text x="370" y="216" fontFamily={FONT} fontSize="16" fill={COLORS.accent} textAnchor="end" fontWeight="bold">&#x20B9;2,48,000</text>
      </g>

      {/* ── SEND Button (red, fades out after click) ── */}
      <g className={`${id}-btn-group`}>
        <path className={`${id}-btn`}
          d="M 340,224 C 343,221 432,221 435,224 C 438,227 438,243 435,246 C 432,249 343,249 340,246 C 337,243 337,227 340,224 Z"
          fill={COLORS.accent} stroke={COLORS.accent} strokeWidth="1.5" strokeLinecap="round"
        />
        <text className={`${id}-btn-label`} x="388" y="240" fontFamily={FONT} fontSize="14" fill="#ffffff" textAnchor="middle" fontWeight="bold">SEND</text>
      </g>

      {/* ── Cursor ── */}
      <g className={`${id}-cursor`}>
        <path d="M 0,0 L 0,18 L 5,14 L 9,22 L 12,20 L 8,12 L 14,10 Z" fill={COLORS.stroke} stroke="white" strokeWidth="1" />
      </g>

      {/* ── "Sent" badge (green, pops in AFTER red fades out) ── */}
      <g className={`${id}-sent-badge`}>
        <rect x="340" y="222" width="96" height="26" rx="8" fill={COLORS.success} />
        <text x="388" y="240" fontFamily={FONT} fontSize="14" fill="#ffffff" textAnchor="middle" fontWeight="bold">Sent &#x2713;</text>
        <circle cx="330" cy="235" r="2" fill={COLORS.success} opacity="0.5" />
        <circle cx="446" cy="228" r="2.5" fill={COLORS.success} opacity="0.4" />
        <circle cx="444" cy="248" r="1.5" fill={COLORS.success} opacity="0.5" />
      </g>

      {/* ── Decorative ── */}
      <text x="250" y="270" fontFamily={FONT} fontSize="9" fill="#d1d5db" textAnchor="middle">Generated by WerkFox</text>
      <g opacity="0.2">
        <path d="M 70,100 L 80,90 L 85,95 L 75,105 Z" fill="none" stroke={COLORS.stroke} strokeWidth="1.2" />
        <line x1="75" y1="105" x2="72" y2="108" stroke={COLORS.stroke} strokeWidth="1.2" />
      </g>
      <text x="440" y="120" fontFamily={FONT} fontSize="30" fill={COLORS.orange} opacity="0.12">&#x20B9;</text>

      {/* Bottom label */}
      <text x="250" y="292" fontFamily={FONT} fontSize="14" fill="#9ca3af" textAnchor="middle" opacity="0.7">
        One-click quotation, ready to send
      </text>
    </svg>
  );
}
