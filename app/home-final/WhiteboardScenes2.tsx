'use client';

import React from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   WhiteboardScenes2 — Hand-drawn SVG scenes for whiteboard animation
   Scenes 5-8: Sale/Service Fork, Production, Invoice, Dispatch
   All scenes return raw <svg> for consistent sizing with Scenes 1-4.
   ═══════════════════════════════════════════════════════════════════════ */

interface SceneProps {
  playing: boolean;
}

const FONT = 'var(--font-caveat), cursive';
const VIEWBOX = '0 0 500 300';

/* ─────────────────────────────────────────────────────────────────────
   Scene 5 — Sale or Service: A fork in the road
   Duration budget: ~6.5s
   ───────────────────────────────────────────────────────────────────── */
export function Scene5_SaleOrService({ playing }: SceneProps) {
  return (
    <svg viewBox={VIEWBOX} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Arrow tip markers — filled triangles */}
        <marker id="s5-arrow-blue" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <path d="M0 0 L10 4 L0 8 L2 4 Z" fill="#0EA5E9" />
        </marker>
        <marker id="s5-arrow-amber" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <path d="M0 0 L10 4 L0 8 L2 4 Z" fill="#F59E0B" />
        </marker>
      </defs>
      <style>{`
        @keyframes s5-draw {
          from { stroke-dashoffset: 500; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s5-fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s5-popIn {
          0%   { opacity: 0; transform: scale(0.3); }
          60%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes s5-glow {
          0%, 100% { filter: drop-shadow(0 0 2px #0EA5E9); }
          50%      { filter: drop-shadow(0 0 8px #0EA5E9); }
        }
        @keyframes s5-sparkle {
          0%   { opacity: 0; transform: scale(0) rotate(0deg); }
          50%  { opacity: 1; transform: scale(1.2) rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
        @keyframes s5-headTilt {
          0%, 25%  { transform: rotate(0deg); }
          35%, 55% { transform: rotate(-8deg); }
          65%, 85% { transform: rotate(8deg); }
          100%     { transform: rotate(0deg); }
        }
        @keyframes s5-personMove {
          0%, 70%  { transform: translate(0, 0); }
          100%     { transform: translate(-55px, 35px); }
        }
        @keyframes s5-drawArrowLeft {
          from { stroke-dashoffset: 300; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s5-drawArrowRight {
          from { stroke-dashoffset: 300; }
          to   { stroke-dashoffset: 0; }
        }

        .s5-box-draw {
          stroke-dasharray: 500;
          stroke-dashoffset: ${playing ? '500' : '0'};
          ${playing ? 'animation: s5-draw 1s ease-out forwards;' : ''}
        }
        .s5-box-text {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s5-fadeIn 0.5s 0.5s ease-out forwards;' : ''}
        }
        .s5-fork-dot {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s5-popIn 0.4s 0.8s ease-out forwards;' : ''}
        }
        .s5-vert-line {
          stroke-dasharray: 40;
          stroke-dashoffset: ${playing ? '40' : '0'};
          ${playing ? 'transition: stroke-dashoffset 0.5s 0.7s ease-out;' : ''}
        }
        .s5-left-arrow {
          stroke-dasharray: 300;
          stroke-dashoffset: ${playing ? '300' : '0'};
          ${playing ? 'animation: s5-drawArrowLeft 1s 1.2s ease-out forwards;' : ''}
        }
        .s5-right-arrow {
          stroke-dasharray: 300;
          stroke-dashoffset: ${playing ? '300' : '0'};
          ${playing ? 'animation: s5-drawArrowRight 1s 1.2s ease-out forwards;' : ''}
        }
        .s5-label-left {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s5-fadeIn 0.5s 2.4s ease-out forwards;' : ''}
        }
        .s5-label-right {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s5-fadeIn 0.5s 2.4s ease-out forwards;' : ''}
        }
        .s5-person {
          opacity: ${playing ? '0' : '1'};
          transform-origin: 250px 140px;
          ${playing ? 'animation: s5-popIn 0.4s 2.7s ease-out forwards, s5-personMove 1.5s 4s ease-in-out forwards;' : ''}
        }
        .s5-head-anim {
          ${playing ? 'animation: s5-headTilt 1.8s 3s ease-in-out forwards;' : ''}
          transform-origin: 250px 128px;
        }
        @keyframes s5-fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .s5-question {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s5-popIn 0.4s 3.2s ease-out forwards, s5-fadeOut 0.3s 4.8s ease-out forwards;' : ''}
        }
        .s5-bulb {
          opacity: 0;
          ${playing ? 'animation: s5-popIn 0.5s 4.8s ease-out forwards;' : ''}
        }
        .s5-happy {
          opacity: 0;
          ${playing ? 'animation: s5-fadeIn 0.3s 4.8s ease-out forwards;' : ''}
        }
        .s5-glow-path {
          opacity: 0;
          ${playing ? 'animation: s5-glow 1.5s 5s ease-in-out infinite;' : ''}
        }
        .s5-chosen {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s5-popIn 0.5s 5.8s ease-out forwards;' : ''}
        }
      `}</style>

      <rect x="10" y="10" width="480" height="280" rx="12" fill="#fdfbf9" stroke="none" />

      {/* Sale Order Box */}
      <path className="s5-box-draw"
        d="M195 48 C196 46, 304 45, 306 47 C308 49, 309 77, 307 79 C305 81, 197 82, 195 80 C193 78, 194 50, 195 48Z"
        stroke="#1d1d1f" strokeWidth="2" fill="#fef3ee" />
      <text className="s5-box-text" x="250" y="70" textAnchor="middle" fill="#1d1d1f" fontSize="16" fontFamily={FONT} fontWeight="bold">
        Sale Order
      </text>

      {/* Fork point */}
      <circle className="s5-fork-dot" cx="250" cy="105" r="5" fill="#1d1d1f" />

      {/* Vertical line from box to fork */}
      <path className="s5-vert-line" d="M250 82 C251 87, 249 96, 250 105"
        stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Left arrow — elegant calligraphy-style S-curve to Product Sale */}
      <path className="s5-left-arrow"
        d="M248 108 C238 118, 210 128, 185 148 C168 162, 148 178, 130 192"
        stroke="#0EA5E9" strokeWidth="3.5" strokeLinecap="round" fill="none"
        markerEnd="url(#s5-arrow-blue)" />
      {/* Thinner parallel stroke for calligraphy depth */}
      <path className="s5-left-arrow"
        d="M246 110 C236 120, 212 132, 188 150 C172 163, 152 177, 135 190"
        stroke="#0EA5E9" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* Right arrow — elegant calligraphy-style S-curve to Service Job */}
      <path className="s5-right-arrow"
        d="M252 108 C262 118, 290 128, 315 148 C332 162, 352 178, 370 192"
        stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none"
        markerEnd="url(#s5-arrow-amber)" />
      {/* Thinner parallel stroke for calligraphy depth */}
      <path className="s5-right-arrow"
        d="M254 110 C264 120, 288 132, 312 150 C328 163, 348 177, 365 190"
        stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* Left label: Product Sale */}
      <g className="s5-label-left">
        <path d="M55 200 C56 198, 172 197, 174 199 C176 201, 177 228, 175 230 C173 232, 57 233, 55 231 C53 229, 54 202, 55 200Z"
          stroke="#0EA5E9" strokeWidth="1.5" fill="#eff6ff" />
        <text x="115" y="220" textAnchor="middle" fill="#0EA5E9" fontSize="15" fontFamily={FONT} fontWeight="bold">Product Sale</text>
        {/* Small box icon */}
        <rect x="67" y="206" width="12" height="10" rx="1" stroke="#0EA5E9" strokeWidth="1" fill="none" transform="rotate(-3, 73, 211)" />
      </g>

      {/* Right label: Service Job */}
      <g className="s5-label-right">
        <path d="M325 200 C326 198, 445 197, 447 199 C449 201, 450 228, 448 230 C446 232, 327 233, 325 231 C323 229, 324 202, 325 200Z"
          stroke="#F59E0B" strokeWidth="1.5" fill="#fffbeb" />
        <text x="386" y="220" textAnchor="middle" fill="#F59E0B" fontSize="15" fontFamily={FONT} fontWeight="bold">Service Job</text>
        {/* Wrench icon */}
        <path d="M403 207 C405 205, 409 208, 407 211 L413 219"
          stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Thinking person — embedded avatar SVG */}
      <g className="s5-person">
        <g transform="translate(196, 81) scale(0.22)">
          {/* Red question mark — fades out when person decides */}
          <text className="s5-question" x="148" y="60" textAnchor="middle" fill="#E03B12" fontSize="160" fontFamily="var(--font-caveat), cursive" fontWeight="bold">?</text>

          {/* Lightbulb — replaces ? when person has the "aha!" moment */}
          <g className="s5-bulb" style={{ transformOrigin: '148px 55px' }}>
            {/* Bulb glass */}
            <path d="M130 60 C130 35, 165 35, 165 60 C165 72, 155 78, 155 85 L140 85 C140 78, 130 72, 130 60 Z"
              fill="#FCD34D" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            {/* Base rings */}
            <rect x="140" y="85" width="15" height="8" rx="2" fill="#F59E0B" />
            <rect x="142" y="93" width="11" height="5" rx="3" fill="#D4910A" />
            {/* Light rays */}
            <line x1="148" y1="28" x2="148" y2="16" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="118" y1="42" x2="108" y2="35" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="178" y1="42" x2="188" y2="35" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="112" y1="65" x2="102" y2="65" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="184" y1="65" x2="194" y2="65" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Hair */}
          <path d="M357.206 110.133C357.87 129.533 338.399 158.233 330.114 170.784L330.079 170.819C328.156 167.743 324.451 165.226 318.648 164.107C322.528 155.822 329.694 131.492 331.897 121.424C309.419 98.212 250.271 89.018 246.006 95.73C245.132 97.058 244.328 98.422 243.524 99.785C217.201 87.235 218.284 39.204 230.275 32.385C235.589 29.344 242.195 30.777 248.418 37.034C248.698 32.595 253.172 24.415 260.304 23.82C268.344 23.12 275.021 29.344 279.604 39.52C278.66 31.62 285.757 21.098 297.153 24.034C304.529 25.922 313.583 46.512 323.825 58.572C334.1 70.735 356.577 92.864 357.206 110.133Z" fill="#29263B" />
          {/* Hair detail lines */}
          <path d="M279.285 85.1C278.92 85.0997 278.564 84.9851 278.267 84.7722C277.97 84.5594 277.747 84.2589 277.63 83.913C274.902 75.882 275.367 63.435 277.361 56.513C277.425 56.2924 277.531 56.0864 277.674 55.9069C277.817 55.7274 277.994 55.5779 278.195 55.4668C278.396 55.3557 278.617 55.2854 278.845 55.2596C279.073 55.2339 279.304 55.2534 279.525 55.317C279.746 55.3805 279.952 55.4869 280.131 55.6301C280.311 55.7732 280.46 55.9503 280.571 56.1513C280.682 56.3522 280.753 56.5731 280.778 56.8012C280.804 57.0294 280.785 57.2604 280.721 57.481C278.864 63.927 278.51 75.636 280.94 82.793C281.029 83.0561 281.054 83.3366 281.013 83.6113C280.973 83.886 280.867 84.1471 280.705 84.3729C280.543 84.5987 280.33 84.7828 280.083 84.9099C279.836 85.037 279.563 85.1036 279.285 85.104V85.1Z" fill="#686674" />
          <path d="M262.157 84.964C261.814 84.9639 261.479 84.8631 261.193 84.6739C260.906 84.4847 260.682 84.2156 260.548 83.9C256.569 74.6865 255.149 64.5698 256.44 54.617C256.506 54.158 256.752 53.7442 257.124 53.4666C257.495 53.1889 257.962 53.0702 258.421 53.1365C258.879 53.2028 259.293 53.4487 259.571 53.8201C259.849 54.1915 259.967 54.658 259.901 55.117C258.699 64.4375 260.034 73.9098 263.765 82.535C263.878 82.8008 263.923 83.0905 263.897 83.3781C263.871 83.6657 263.774 83.9424 263.614 84.1834C263.455 84.4243 263.239 84.6221 262.984 84.759C262.73 84.8959 262.446 84.9677 262.157 84.968V84.964Z" fill="#686674" />
          <path d="M247.9 85.593C247.622 85.5934 247.348 85.5274 247.1 85.4004C246.853 85.2734 246.639 85.0892 246.477 84.863C240.841 77.002 238.144 67.352 238.46 56.179C238.463 55.9481 238.512 55.72 238.605 55.5085C238.698 55.297 238.832 55.1062 239 54.9477C239.168 54.7891 239.366 54.6659 239.582 54.5853C239.799 54.5048 240.029 54.4687 240.26 54.479C240.49 54.485 240.717 54.5363 240.927 54.6301C241.137 54.7239 241.326 54.8583 241.484 55.0256C241.642 55.1929 241.766 55.3897 241.847 55.6048C241.929 55.8199 241.967 56.0491 241.96 56.279C241.66 66.817 244.071 75.502 249.324 82.828C249.511 83.0892 249.622 83.3967 249.646 83.717C249.67 84.0373 249.605 84.3579 249.458 84.6437C249.312 84.9295 249.09 85.1695 248.816 85.3373C248.542 85.5051 248.227 85.5943 247.906 85.595L247.9 85.593Z" fill="#686674" />
          {/* Face and skin */}
          <path d="M243.524 99.785C227.339 127.297 222.864 159.143 225.241 173.021C228.422 191.654 245.618 203.311 262.156 203.311C262.471 210.967 261.877 223.605 261.877 223.605C261.877 223.605 253.102 225.388 242.3 228.464C238.84 292.332 312.076 296.736 336.127 234.164C326.874 229.938 317.286 226.488 307.461 223.852C307.461 223.852 306.727 198.892 309.489 186.482C325.849 194.662 336.231 180.26 330.079 170.821C328.156 167.745 324.451 165.228 318.648 164.109C322.528 155.824 329.694 131.494 331.897 121.426C309.419 98.214 250.271 89.02 246.006 95.732C245.132 97.058 244.328 98.422 243.524 99.785Z" fill="#FFA775" />
          {/* Face details */}
          <path d="M315.326 181.621C315.162 181.621 315.002 181.575 314.863 181.488C314.724 181.401 314.612 181.277 314.541 181.13C314.469 180.983 314.44 180.818 314.458 180.655C314.475 180.492 314.538 180.338 314.639 180.209C317.787 176.178 321.505 174.169 326.004 174.07C326.12 174.063 326.236 174.08 326.345 174.119C326.454 174.159 326.553 174.221 326.637 174.302C326.721 174.382 326.788 174.478 326.832 174.586C326.877 174.693 326.899 174.808 326.897 174.924C326.9 175.039 326.88 175.153 326.838 175.26C326.797 175.367 326.734 175.465 326.655 175.548C326.576 175.63 326.481 175.697 326.376 175.743C326.271 175.789 326.158 175.815 326.043 175.817C322.043 175.906 318.86 177.643 316.016 181.285C315.934 181.39 315.83 181.475 315.71 181.533C315.59 181.591 315.459 181.621 315.326 181.621Z" fill="#29263B" />
          <path d="M245.249 118.107C243.217 118.087 241.217 117.592 239.41 116.661C239.149 116.548 238.913 116.382 238.718 116.175C238.522 115.968 238.371 115.723 238.273 115.455C238.175 115.188 238.133 114.903 238.149 114.619C238.165 114.334 238.238 114.056 238.365 113.801C238.491 113.546 238.669 113.319 238.886 113.134C239.103 112.95 239.355 112.811 239.627 112.728C239.9 112.644 240.186 112.616 240.469 112.646C240.753 112.677 241.027 112.764 241.275 112.904C245.313 114.904 249.21 113.904 253.536 109.74C253.731 109.532 253.966 109.367 254.227 109.253C254.488 109.139 254.769 109.08 255.054 109.078C255.339 109.076 255.621 109.133 255.883 109.243C256.145 109.354 256.382 109.517 256.58 109.722C256.777 109.927 256.931 110.17 257.031 110.437C257.132 110.703 257.177 110.987 257.164 111.272C257.152 111.556 257.081 111.835 256.957 112.091C256.834 112.348 256.659 112.576 256.444 112.763C252.746 116.322 249 118.107 245.249 118.107Z" fill="#29263B" />
          <path d="M304.173 127.332C303.669 127.331 303.182 127.148 302.801 126.818C302.42 126.487 302.171 126.031 302.099 125.532C301.921 123.892 301.361 122.317 300.465 120.932C299.569 119.548 298.361 118.392 296.938 117.558C295.706 116.918 294.335 116.589 292.947 116.6C291.558 116.611 290.193 116.962 288.971 117.621C288.473 117.837 287.912 117.852 287.403 117.663C286.895 117.474 286.479 117.095 286.244 116.607C286.008 116.118 285.971 115.557 286.139 115.042C286.308 114.526 286.669 114.096 287.148 113.841C288.966 112.896 290.985 112.404 293.034 112.407C295.083 112.41 297.1 112.908 298.915 113.859C300.92 115.004 302.629 116.604 303.903 118.529C305.178 120.455 305.982 122.653 306.253 124.946C306.33 125.497 306.186 126.056 305.851 126.5C305.517 126.945 305.02 127.239 304.469 127.317C304.371 127.328 304.272 127.333 304.173 127.332Z" fill="#29263B" />
          <path d="M262.54 180.817C262.332 180.817 262.132 180.743 261.974 180.608C261.816 180.473 261.711 180.287 261.678 180.082C261.415 178.809 261.615 177.483 262.243 176.344C262.872 175.206 263.886 174.329 265.104 173.873C268.547 172.489 273.904 173.806 277.488 178.992C277.62 179.183 277.67 179.418 277.628 179.646C277.587 179.874 277.456 180.076 277.265 180.208C277.074 180.34 276.839 180.39 276.611 180.348C276.383 180.307 276.181 180.176 276.049 179.985C272.99 175.552 268.549 174.373 265.754 175.495C264.902 175.8 264.192 176.407 263.758 177.202C263.325 177.997 263.199 178.923 263.404 179.804C263.44 180.033 263.384 180.266 263.248 180.453C263.113 180.641 262.908 180.767 262.68 180.804C262.634 180.812 262.587 180.816 262.54 180.817Z" fill="#29263B" />
          <path d="M255.27 161.031C255.173 161.031 255.077 161.015 254.986 160.984C253.974 160.637 245.069 157.478 244.374 153.273C243.659 148.944 254.729 126.837 257.887 122.549C258.024 122.362 258.23 122.238 258.459 122.203C258.689 122.168 258.922 122.226 259.109 122.363C259.296 122.5 259.42 122.706 259.455 122.936C259.49 123.165 259.432 123.398 259.295 123.585C255.716 128.445 245.556 149.699 246.095 152.985C246.495 155.385 252.103 158.147 255.549 159.327C255.744 159.395 255.909 159.529 256.015 159.706C256.12 159.884 256.159 160.093 256.125 160.297C256.092 160.5 255.987 160.685 255.829 160.819C255.672 160.953 255.472 161.026 255.266 161.027L255.27 161.031Z" fill="#29263B" />
          {/* Clothing */}
          <path d="M384.508 479.173C345.32 490.673 244.538 495.743 204.721 480.466L203.221 337.287L158.552 319.313C158.552 319.313 183.085 259.751 209.303 241.888C217.413 236.33 230.977 231.68 242.303 228.464C238.843 292.332 312.079 296.736 336.13 234.164C349.518 240.247 365.074 249.231 376.75 261.606C402.231 288.591 384.508 479.173 384.508 479.173Z" fill="#29263B" />
          {/* Eyes */}
          <path fillRule="evenodd" clipRule="evenodd" d="M291.14 130.849C293.255 131.387 294.083 135.309 292.989 139.599C291.895 143.889 289.289 146.929 287.175 146.391C285.061 145.853 284.228 141.93 285.323 137.641C286.418 133.352 289.023 130.31 291.14 130.849Z" fill="#29263B" />
          <path fillRule="evenodd" clipRule="evenodd" d="M246.411 120.739C248.53 121.281 249.358 125.199 248.264 129.489C247.17 133.779 244.564 136.823 242.447 136.281C240.33 135.739 239.504 131.82 240.598 127.535C241.692 123.25 244.298 120.2 246.411 120.735V120.739Z" fill="#29263B" />
          {/* Hands and arms */}
          <path fillRule="evenodd" clipRule="evenodd" d="M370.056 317.865C370.056 317.865 362.163 295.865 349.708 293.391C336.888 290.84 319.345 301.677 305.708 312.422C294.475 287.976 282.072 255.738 281.933 243.975C289.204 226.832 281.796 212.52 299.883 196.062C308.259 188.441 296.171 177.139 284.859 189.99C276.266 199.753 262.059 199.547 254.271 197.946C238.753 194.765 230.171 183.512 226.934 179.052C216.559 180.198 218.771 191.531 221.243 196.457C216.286 197.901 214.021 206.738 217.286 212.188C213.318 215.135 211.542 219.442 216.31 227.8C212.479 231.555 213.94 239.049 218.142 242.737C218.142 242.737 230.465 251.229 238.842 254.854C242.55 282.561 248.265 309.963 255.942 336.842C231.742 341.062 203.392 344.23 203.392 344.23L203.28 337.41L161.6 320.539C150.8 346.051 145.253 394.897 169.527 405.119C190.909 414.119 230.227 408.474 273.136 382.819C283.726 404.213 296.862 419.519 312.724 419.535C338.568 419.566 355.509 394.789 355.509 394.789C360.221 380.705 358.009 366.789 348.84 356.401C348.818 356.306 348.809 356.201 348.779 356.115C354.047 357.978 361.759 352.815 359.63 347.274C364.23 348.561 368.16 342.488 367.639 333.474C371.05 330.056 371.856 324.853 370.056 317.865Z" fill="#FFA775" />
          {/* Body outlines */}
          <path d="M349.039 356.657C348.815 356.657 348.6 356.571 348.438 356.417C348.276 356.263 348.179 356.053 348.167 355.83C347.777 348.605 344.867 341.758 339.008 334.281C338.873 334.098 338.815 333.87 338.846 333.645C338.877 333.42 338.994 333.215 339.173 333.075C339.351 332.935 339.578 332.87 339.804 332.894C340.03 332.918 340.237 333.029 340.383 333.203C346.475 340.976 349.502 348.136 349.913 355.736C349.925 355.967 349.845 356.194 349.69 356.367C349.535 356.539 349.318 356.643 349.087 356.656L349.039 356.657Z" fill="#29263B" />
          <path d="M359.854 347.449C359.648 347.449 359.449 347.376 359.292 347.243C359.135 347.11 359.029 346.927 358.994 346.724C357.39 336.898 352.523 327.898 345.179 321.175C345.01 321.016 344.912 320.796 344.905 320.564C344.898 320.333 344.984 320.108 345.143 319.939C345.302 319.77 345.522 319.672 345.754 319.665C345.985 319.658 346.21 319.744 346.379 319.903C353.964 326.913 359.008 336.242 360.718 346.427C360.757 346.655 360.704 346.89 360.57 347.08C360.437 347.269 360.233 347.397 360.005 347.437C359.955 347.445 359.905 347.449 359.854 347.449Z" fill="#29263B" />
          <path d="M367.854 334.372C367.657 334.372 367.466 334.305 367.312 334.183C367.158 334.061 367.049 333.891 367.004 333.699C364.469 323.008 359.399 314.232 351.936 307.619C351.85 307.543 351.78 307.451 351.73 307.348C351.68 307.245 351.65 307.133 351.643 307.018C351.629 306.787 351.707 306.559 351.861 306.386C352.015 306.213 352.231 306.107 352.462 306.093C352.693 306.079 352.921 306.157 353.094 306.311C360.833 313.168 366.085 322.247 368.705 333.297C368.758 333.523 368.719 333.76 368.598 333.957C368.476 334.154 368.281 334.295 368.056 334.349C367.99 334.364 367.922 334.372 367.854 334.372Z" fill="#29263B" />
          <path d="M327.846 354.006C327.69 354.006 327.537 353.965 327.403 353.886C327.269 353.808 327.158 353.695 327.082 353.559L320.557 341.881C311.294 331.06 281.271 261.939 281.057 243.981C281.056 243.86 281.079 243.741 281.126 243.63C283.712 237.53 284.416 231.73 285.097 226.112C286.343 215.834 287.52 206.126 299.297 195.412C301.321 193.569 302.178 191.325 301.646 189.253C301.35 188.248 300.786 187.343 300.015 186.635C299.243 185.926 298.293 185.441 297.267 185.232C293.567 184.348 289.279 186.288 285.516 190.563C277.443 199.736 263.992 200.833 254.096 198.798C243.247 196.575 233.871 190.098 226.228 179.561C226.156 179.468 226.103 179.362 226.073 179.249C226.043 179.136 226.036 179.018 226.052 178.901C226.069 178.785 226.109 178.674 226.169 178.573C226.23 178.473 226.31 178.386 226.405 178.317C226.499 178.248 226.607 178.199 226.721 178.173C226.836 178.146 226.954 178.143 227.069 178.164C227.185 178.184 227.295 178.227 227.394 178.291C227.492 178.355 227.576 178.438 227.642 178.535C230.393 182.328 238.763 193.871 254.447 197.086C257.7 197.755 274.422 200.524 284.203 189.409C288.409 184.63 293.322 182.488 297.674 183.533C299.01 183.815 300.243 184.456 301.241 185.388C302.239 186.319 302.964 187.505 303.338 188.818C304.038 191.538 302.993 194.412 300.473 196.704C289.179 206.981 288.04 216.376 286.835 226.322C286.146 232.006 285.435 237.88 282.811 244.141C283.218 262.194 312.875 330.356 321.939 340.8C321.977 340.845 322.01 340.894 322.039 340.946L328.607 352.701C328.681 352.834 328.719 352.984 328.718 353.136C328.716 353.288 328.675 353.437 328.598 353.569C328.521 353.7 328.411 353.809 328.28 353.885C328.148 353.96 327.998 354.001 327.846 354.001V354.006Z" fill="#29263B" />

          {/* ── Happy expression + folded hands (renders ON TOP of everything) ── */}
          <g className="s5-happy">
            {/* Cover existing eyes with skin */}
            <ellipse cx="246" cy="128" rx="14" ry="12" fill="#FFA775" />
            <ellipse cx="291" cy="138" rx="14" ry="12" fill="#FFA775" />
            {/* Happy squint eyes (^_^) */}
            <path d="M236 128 C241 118, 251 118, 256 128" stroke="#29263B" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M281 138 C286 128, 296 128, 301 138" stroke="#29263B" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Cover existing mouth/chin area */}
            <ellipse cx="268" cy="178" rx="20" ry="12" fill="#FFA775" />
            {/* Big happy smile with teeth */}
            <path d="M252 174 C258 190, 278 190, 284 174" stroke="#29263B" strokeWidth="3" strokeLinecap="round" fill="none" />

          </g>
        </g>
      </g>

      {/* Left path glow */}
      <path className="s5-glow-path"
        d="M248 108 C238 118, 210 128, 185 148 C168 162, 148 178, 130 192"
        stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* Sparkles on left path */}
      {[
        { cx: 200, cy: 138, delay: 5.2 },
        { cx: 165, cy: 158, delay: 5.4 },
        { cx: 138, cy: 182, delay: 5.6 },
      ].map((s, i) => (
        <path key={i}
          d={`M${s.cx} ${s.cy - 6} L${s.cx} ${s.cy + 6} M${s.cx - 6} ${s.cy} L${s.cx + 6} ${s.cy}`}
          stroke="#FD9220" strokeWidth="1.5" strokeLinecap="round"
          style={{
            opacity: 0,
            animation: playing ? `s5-sparkle 0.8s ${s.delay}s ease-out forwards` : 'none',
            transformOrigin: `${s.cx}px ${s.cy}px`,
          }}
        />
      ))}

      {/* "Chosen!" */}
      <text className="s5-chosen" x="80" y="260" fill="#0EA5E9" fontSize="18" fontFamily={FONT} fontWeight="bold">Chosen!</text>
      <path className="s5-chosen" d="M72 253 L65 245 M72 253 L65 259"
        stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />

      {/* Bottom label */}
      <text x="250" y="285" fontFamily={FONT} fontSize="14" fill="#9ca3af" textAnchor="middle" opacity="0.7">
        Product sale or service — you decide the path
      </text>
    </svg>
  );
}


/* ─────────────────────────────────────────────────────────────────────
   Scene 6 — Production: Factory, work order, horizontal status timeline
   Duration budget: ~8s
   ───────────────────────────────────────────────────────────────────── */
export function Scene6_Production({ playing }: SceneProps) {
  const statusNodes = [
    { label: 'PLANNED', x: 215, color: '#9ca3af', delay: 2.8 },
    { label: 'IN PROGRESS', x: 295, color: '#F59E0B', delay: 4.0 },
    { label: 'QC', x: 375, color: '#3B82F6', delay: 5.2 },
    { label: 'COMPLETED', x: 455, color: '#10B981', delay: 6.4 },
  ];

  return (
    <svg viewBox={VIEWBOX} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="s6-progress-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <clipPath id="s6-progress-clip">
          <rect x="215" y="75" width="245" height="14" rx="7">
            {playing && (
              <animate attributeName="width" values="0;60;122;176;245" keyTimes="0;0.25;0.5;0.7;1" dur="4s" begin="2.5s" fill="freeze" />
            )}
          </rect>
        </clipPath>
      </defs>
      <style>{`
        @keyframes s6-fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s6-popIn {
          0%   { opacity: 0; transform: scale(0.3); }
          60%  { opacity: 1; transform: scale(1.12); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes s6-gearSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes s6-smokeRise {
          0%   { opacity: 0.5; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-22px) scale(1.5); }
        }
        @keyframes s6-drawFactory {
          from { stroke-dashoffset: 700; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s6-drawCard {
          from { stroke-dashoffset: 750; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s6-drawTimeline {
          from { stroke-dashoffset: 300; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s6-nodeFill {
          0%   { r: 0; opacity: 0; }
          50%  { opacity: 1; }
          100% { r: 7; opacity: 1; }
        }
        @keyframes s6-nodeRing {
          0%   { r: 7; opacity: 0.6; }
          100% { r: 14; opacity: 0; }
        }
        @keyframes s6-checkPop {
          0%   { opacity: 0; transform: scale(0.2); }
          60%  { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        .s6-factory {
          stroke-dasharray: 700;
          stroke-dashoffset: ${playing ? '700' : '0'};
          ${playing ? 'animation: s6-drawFactory 1.2s ease-out forwards;' : ''}
        }
        .s6-roof {
          stroke-dasharray: 400;
          stroke-dashoffset: ${playing ? '400' : '0'};
          ${playing ? 'animation: s6-drawFactory 1s 0.4s ease-out forwards;' : ''}
        }
        .s6-roof-fill {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s6-fadeIn 0.3s 0.8s ease-out forwards;' : ''}
        }
        .s6-chimney {
          stroke-dasharray: 250;
          stroke-dashoffset: ${playing ? '250' : '0'};
          ${playing ? 'animation: s6-drawFactory 0.7s 0.7s ease-out forwards;' : ''}
        }
        .s6-window {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s6-fadeIn 0.3s 1s ease-out forwards;' : ''}
        }
        .s6-card-border {
          stroke-dasharray: 750;
          stroke-dashoffset: ${playing ? '750' : '0'};
          ${playing ? 'animation: s6-drawCard 1s 1.5s ease-out forwards;' : ''}
        }
        .s6-card-content {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s6-fadeIn 0.4s 2.2s ease-out forwards;' : ''}
        }
        .s6-progress-bg {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s6-fadeIn 0.3s 2.3s ease-out forwards;' : ''}
        }
        .s6-timeline-track {
          stroke-dasharray: 300;
          stroke-dashoffset: ${playing ? '300' : '0'};
          ${playing ? 'animation: s6-drawTimeline 0.8s 2.5s ease-out forwards;' : ''}
        }
        .s6-checkmark {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s6-checkPop 0.5s 7.2s ease-out forwards;' : ''}
        }
      `}</style>

      <rect x="10" y="10" width="480" height="280" rx="12" fill="#fdfbf9" stroke="none" />

      {/* ── Factory building: sawtooth zigzag roof + chimney ── */}
      {/* Main body base rectangle */}
      <path className="s6-factory"
        d="M 22,120 C 21,118 21,246 22,248 C 24,250 176,251 178,248 C 180,246 179,118 178,120 Z"
        stroke="#1d1d1f" strokeWidth="2" fill="#f8f8f8" />

      {/* Sawtooth zigzag roof — 3 teeth sloping right-to-left */}
      <path className="s6-roof"
        d="M 22,120 C 21,118 21,72 22,68 C 24,66 65,117 68,120 C 68,118 68,82 68,78 C 70,76 111,117 114,120 C 114,118 114,92 114,88 C 116,86 146,118 148,120"
        stroke="#1d1d1f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Sawtooth fill — each tooth gets a light fill */}
      <path className="s6-roof-fill" d="M 22,120 L 22,68 L 68,120 Z" fill="#ececec" stroke="none" />
      <path className="s6-roof-fill" d="M 68,120 L 68,78 L 114,120 Z" fill="#e8e8e8" stroke="none" />
      <path className="s6-roof-fill" d="M 114,120 L 114,88 L 148,120 Z" fill="#e4e4e4" stroke="none" />

      {/* Chimney — tall stack on right side */}
      <path className="s6-chimney"
        d="M 150,120 C 149,118 149,42 150,38 C 152,35 174,34 176,37 C 178,40 179,118 178,120"
        stroke="#1d1d1f" strokeWidth="2" fill="#d4d4d4" />
      {/* Chimney cap overhang */}
      <path className="s6-chimney"
        d="M 145,38 C 147,34 179,33 181,37"
        stroke="#1d1d1f" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Smoke puffs from chimney */}
      {[0, 1, 2].map(i => (
        <circle key={i} cx={163 + i * 5} cy={30 - i * 8} r={4 + i * 2.5} fill="#d1d5db" stroke="none"
          style={{
            animation: playing ? `s6-smokeRise 2.5s ${1.5 + i * 0.6}s ease-out infinite` : 'none',
            transformOrigin: `${163 + i * 5}px ${30 - i * 8}px`,
          }}
        />
      ))}

      {/* Rectangular windows — 2 rows × 3 columns grid */}
      {[
        { x: 35, y: 135 }, { x: 72, y: 135 }, { x: 109, y: 135 },
        { x: 35, y: 175 }, { x: 72, y: 175 }, { x: 109, y: 175 },
      ].map((w, i) => (
        <g key={i} className="s6-window">
          <rect x={w.x} y={w.y} width="24" height="20" rx="2" stroke="#1d1d1f" strokeWidth="1.2" fill="#dbeafe" />
          {/* Window cross panes */}
          <line x1={w.x + 12} y1={w.y} x2={w.x + 12} y2={w.y + 20} stroke="#1d1d1f" strokeWidth="0.7" />
          <line x1={w.x} y1={w.y + 10} x2={w.x + 24} y2={w.y + 10} stroke="#1d1d1f" strokeWidth="0.7" />
        </g>
      ))}

      {/* Factory door */}
      <path className="s6-window"
        d="M 150,248 L 150,210 C 150,200 172,200 172,210 L 172,248"
        stroke="#1d1d1f" strokeWidth="1.5" fill="#fef3ee" />
      <circle className="s6-window" cx="166" cy="230" r="2" fill="#1d1d1f" />

      {/* ── Work Order Card ── */}
      <path className="s6-card-border"
        d="M200 30 C201 28, 478 27, 480 29 C482 31, 483 105, 481 107 C479 109, 202 110, 200 108 C198 106, 199 32, 200 30Z"
        stroke="#0EA5E9" strokeWidth="1.8" fill="white" />
      <text className="s6-card-content" x="215" y="52" fill="#1d1d1f" fontSize="14" fontFamily={FONT} fontWeight="bold">
        WO-1025: Custom Gears x200
      </text>

      {/* URGENT badge */}
      <g className="s6-card-content">
        <rect x="420" y="37" width="52" height="18" rx="9" fill="#E03B12" />
        <text x="446" y="50" textAnchor="middle" fill="white" fontSize="9" fontFamily={FONT} fontWeight="bold">URGENT</text>
      </g>

      {/* Progress bar background */}
      <rect className="s6-progress-bg" x="215" y="65" width="245" height="14" rx="7" fill="#e5e7eb" />

      {/* Progress bar fill — animated SVG rect with clipPath */}
      <rect x="215" y="65" width="245" height="14" rx="7" fill="url(#s6-progress-grad)"
        clipPath="url(#s6-progress-clip)"
        style={{ opacity: playing ? 1 : 0, animation: playing ? 's6-fadeIn 0.2s 2.5s ease-out forwards' : 'none' }}
      />

      {/* Progress label */}
      <text className="s6-card-content" x="340" y="97" textAnchor="middle" fill="#6b7280" fontSize="11" fontFamily={FONT}>Progress</text>

      {/* ── Spinning gears ── */}
      {[
        { cx: 50, cy: 190, delay: 3, size: 10 },
        { cx: 150, cy: 185, delay: 3.6, size: 9 },
      ].map((g, i) => (
        <g key={i} style={{
          opacity: playing ? 1 : 0,
          animation: playing ? `s6-popIn 0.4s ${g.delay}s ease-out forwards` : 'none',
          transformOrigin: `${g.cx}px ${g.cy}px`,
        }}>
          <g style={{
            animation: playing ? `s6-gearSpin 3s ${g.delay + 0.3}s linear infinite` : 'none',
            transformOrigin: `${g.cx}px ${g.cy}px`,
          }}>
            <circle cx={g.cx} cy={g.cy} r={g.size * 0.45} stroke="#0EA5E9" strokeWidth="1.5" fill="#eff6ff" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = g.cx + Math.cos(rad) * g.size * 0.45;
              const y1 = g.cy + Math.sin(rad) * g.size * 0.45;
              const x2 = g.cx + Math.cos(rad) * g.size * 0.7;
              const y2 = g.cy + Math.sin(rad) * g.size * 0.7;
              return <line key={j} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />;
            })}
            <circle cx={g.cx} cy={g.cy} r={g.size * 0.15} fill="#0EA5E9" />
          </g>
        </g>
      ))}

      {/* ── Status Timeline — horizontal path with nodes ── */}
      {/* Dashed track line */}
      <path className="s6-timeline-track"
        d="M215 200 C260 199, 350 201, 455 200"
        stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" fill="none"
        style={{
          strokeDasharray: playing ? '300' : '6 4',
          strokeDashoffset: playing ? '300' : '0',
          animation: playing ? 's6-drawTimeline 0.8s 2.5s ease-out forwards' : 'none',
        }}
      />
      {/* After draw, show as dashed */}
      <path
        d="M215 200 C260 199, 350 201, 455 200"
        stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" fill="none"
        style={{ opacity: playing ? 0 : 0.6, animation: playing ? 's6-fadeIn 0.2s 3.3s ease-out forwards' : 'none' }}
      />

      {/* Status nodes along timeline */}
      {statusNodes.map((node, i) => (
        <g key={i}>
          {/* Empty node circle (background) */}
          <circle cx={node.x} cy={200} r="7" fill="white" stroke="#d1d5db" strokeWidth="1.5"
            style={{ opacity: playing ? 0 : 1, animation: playing ? `s6-fadeIn 0.2s ${node.delay - 0.2}s ease-out forwards` : 'none' }}
          />
          {/* Filled node circle */}
          <circle cx={node.x} cy={200} r="7" fill={node.color} stroke="none"
            style={{ opacity: 0, animation: playing ? `s6-popIn 0.4s ${node.delay}s ease-out forwards` : 'none', transformOrigin: `${node.x}px 200px` }}
          />
          {/* Ripple ring */}
          <circle cx={node.x} cy={200} r="7" fill="none" stroke={node.color} strokeWidth="2"
            style={{
              opacity: 0,
              animation: playing ? `s6-nodeRing 0.8s ${node.delay + 0.1}s ease-out forwards` : 'none',
              transformOrigin: `${node.x}px 200px`,
            }}
          />
          {/* Inner check dot */}
          <circle cx={node.x} cy={200} r="2" fill="white"
            style={{ opacity: 0, animation: playing ? `s6-fadeIn 0.2s ${node.delay + 0.2}s ease-out forwards` : 'none' }}
          />
          {/* Label below */}
          <text x={node.x} y={222} textAnchor="middle" fill={node.color} fontSize={node.label === 'IN PROGRESS' ? '8' : '9'} fontFamily={FONT} fontWeight="bold"
            style={{ opacity: 0, animation: playing ? `s6-fadeIn 0.3s ${node.delay + 0.15}s ease-out forwards` : 'none' }}>
            {node.label}
          </text>
          {/* Connector segment highlight (colored segment to next node) */}
          {i < statusNodes.length - 1 && (
            <line x1={node.x + 8} y1={200} x2={statusNodes[i + 1].x - 8} y2={200}
              stroke={node.color} strokeWidth="2.5" strokeLinecap="round"
              style={{
                opacity: 0,
                animation: playing ? `s6-fadeIn 0.4s ${node.delay + 0.3}s ease-out forwards` : 'none',
              }}
            />
          )}
        </g>
      ))}

      {/* Green checkmark at COMPLETED */}
      <g className="s6-checkmark" style={{ transformOrigin: '455px 200px' }}>
        <path d="M450 200 L454 204 L462 195" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Ground line */}
      <path d="M10 252 C50 253, 200 251, 490 252" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4"
        style={{ opacity: playing ? 0.6 : 0, animation: playing ? 's6-fadeIn 0.5s 0.3s ease-out forwards' : 'none' }} />

      {/* Bottom labels */}
      <text x="100" y="272" textAnchor="middle" fill="#6b7280" fontSize="13" fontFamily={FONT}
        style={{ opacity: playing ? 1 : 0, animation: playing ? 's6-fadeIn 0.4s 1.4s ease-out forwards' : 'none' }}>
        Production Floor
      </text>
      <text x="340" y="285" textAnchor="middle" fill="#9ca3af" fontSize="14" fontFamily={FONT} opacity="0.7">
        Track every step from planned to shipped
      </text>
    </svg>
  );
}


/* ─────────────────────────────────────────────────────────────────────
   Scene 7 — Invoice Generated: GST compliant invoice with stamp
   Duration budget: ~6.5s
   ───────────────────────────────────────────────────────────────────── */
export function Scene7_InvoiceGenerated({ playing }: SceneProps) {
  return (
    <svg viewBox={VIEWBOX} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes s7-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes s7-writeIn {
          from { opacity: 0; transform: translateX(-5px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes s7-stampSlam {
          0%   { opacity: 0; transform: scale(4) rotate(-20deg); }
          40%  { opacity: 1; transform: scale(0.8) rotate(6deg); }
          60%  { transform: scale(1.12) rotate(-3deg); }
          80%  { transform: scale(0.95) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(3deg); }
        }
        @keyframes s7-popIn {
          0%   { opacity: 0; transform: scale(0.3); }
          60%  { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes s7-badgeGlow {
          0%, 100% { filter: drop-shadow(0 0 1px #10B981); }
          50%      { filter: drop-shadow(0 0 6px #10B981); }
        }
        @keyframes s7-drawInvoice {
          from { stroke-dashoffset: 1200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s7-drawDivider {
          from { stroke-dashoffset: 260; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s7-foldDraw {
          from { stroke-dashoffset: 80; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s7-stampShake {
          0%, 100% { transform: scale(1) rotate(3deg); }
          25%      { transform: scale(1.02) rotate(2deg); }
          75%      { transform: scale(0.98) rotate(4deg); }
        }

        .s7-paper {
          stroke-dasharray: 1200;
          stroke-dashoffset: ${playing ? '1200' : '0'};
          ${playing ? 'animation: s7-drawInvoice 1.2s ease-out forwards;' : ''}
        }
        .s7-fold {
          stroke-dasharray: 80;
          stroke-dashoffset: ${playing ? '80' : '0'};
          ${playing ? 'animation: s7-foldDraw 0.4s 0.8s ease-out forwards;' : ''}
        }
        .s7-fold-fill {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-fadeIn 0.01s 0.9s ease-out forwards;' : ''}
        }
        .s7-header1 {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-writeIn 0.5s 1s ease-out forwards;' : ''}
        }
        .s7-header2 {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-writeIn 0.5s 1.3s ease-out forwards;' : ''}
        }
        .s7-divider1 {
          stroke-dasharray: 260;
          stroke-dashoffset: ${playing ? '260' : '0'};
          ${playing ? 'animation: s7-drawDivider 0.5s 1.5s ease-out forwards;' : ''}
        }
        .s7-billto {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-writeIn 0.4s 1.7s ease-out forwards;' : ''}
        }
        .s7-billto-name {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-writeIn 0.5s 1.9s ease-out forwards;' : ''}
        }
        .s7-items-header {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-fadeIn 0.4s 2.2s ease-out forwards;' : ''}
        }
        .s7-item1 {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-writeIn 0.5s 2.5s ease-out forwards;' : ''}
        }
        .s7-item2 {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-writeIn 0.5s 2.9s ease-out forwards;' : ''}
        }
        .s7-divider2 {
          stroke-dasharray: 250;
          stroke-dashoffset: ${playing ? '250' : '0'};
          ${playing ? 'animation: s7-drawDivider 0.5s 3.2s ease-out forwards;' : ''}
        }
        .s7-subtotal {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-writeIn 0.4s 3.5s ease-out forwards;' : ''}
        }
        .s7-cgst {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-writeIn 0.4s 3.8s ease-out forwards;' : ''}
        }
        .s7-sgst {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-writeIn 0.4s 4.0s ease-out forwards;' : ''}
        }
        .s7-total-lines {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-fadeIn 0.3s 4.2s ease-out forwards;' : ''}
        }
        .s7-total {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-popIn 0.5s 4.4s ease-out forwards;' : ''}
        }
        .s7-gst-badge {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s7-popIn 0.4s 5s ease-out forwards, s7-badgeGlow 2s 5.5s ease-in-out infinite;' : ''}
        }
        .s7-stamp {
          opacity: 0;
          ${playing ? 'animation: s7-stampSlam 0.7s 5.5s ease-out forwards;' : ''}
          transform-origin: 321px 261px;
        }
      `}</style>

      <rect x="10" y="10" width="480" height="280" rx="12" fill="#fdfbf9" stroke="none" />

      {/* Invoice paper — slightly tilted */}
      <g transform="rotate(-1.5, 250, 150)">
        <path className="s7-paper"
          d="M115 12 C117 10, 393 8, 395 10 C397 12, 399 283, 397 285 C395 287, 117 289, 115 287 C113 285, 113 14, 115 12Z"
          stroke="#1d1d1f" strokeWidth="2" fill="white"
          style={{ filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.08))' }}
        />
        {/* Folded corner — matching quotation style */}
        <path className="s7-fold-fill" d="M 365,12 L 365,44 L 395,44 Z" fill="#f3f4f6" />
        <path className="s7-fold"
          d="M 365,12 C 365,26 364,41 365,44 C 377,44 387,44 395,44"
          fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />

        {/* Header */}
        <text className="s7-header1" x="140" y="42" fill="#E03B12" fontSize="18" fontFamily={FONT} fontWeight="bold">INVOICE</text>
        <text className="s7-header2" x="260" y="42" fill="#1d1d1f" fontSize="16" fontFamily={FONT} fontWeight="bold">INV-1042</text>

        {/* Divider */}
        <path className="s7-divider1" d="M130 50 C200 49, 320 51, 385 50" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Bill To */}
        <text className="s7-billto" x="140" y="70" fill="#6b7280" fontSize="10" fontFamily={FONT}>Bill To:</text>
        <text className="s7-billto-name" x="140" y="85" fill="#1d1d1f" fontSize="13" fontFamily={FONT} fontWeight="bold">Patel Manufacturing</text>

        {/* Line items header */}
        <g className="s7-items-header">
          <text x="140" y="110" fill="#6b7280" fontSize="9" fontFamily={FONT}>Item</text>
          <text x="355" y="110" fill="#6b7280" fontSize="9" fontFamily={FONT} textAnchor="end">Amount</text>
          <path d="M135 115 C200 114, 330 116, 380 115" stroke="#e5e7eb" strokeWidth="1" fill="none" />
        </g>

        {/* Line item 1 */}
        <g className="s7-item1">
          <text x="140" y="132" fill="#1d1d1f" fontSize="11" fontFamily={FONT}>Steel Brackets x500</text>
          <text x="375" y="132" fill="#1d1d1f" fontSize="12" fontFamily={FONT} fontWeight="bold" textAnchor="end">{'\u20B9'}1,20,000</text>
        </g>

        {/* Line item 2 */}
        <g className="s7-item2">
          <text x="140" y="152" fill="#1d1d1f" fontSize="11" fontFamily={FONT}>Custom Gears x200</text>
          <text x="375" y="152" fill="#1d1d1f" fontSize="12" fontFamily={FONT} fontWeight="bold" textAnchor="end">{'\u20B9'}1,28,000</text>
        </g>

        {/* Dividing line */}
        <path className="s7-divider2" d="M135 162 C200 161, 340 163, 380 162"
          stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Subtotal */}
        <g className="s7-subtotal">
          <text x="260" y="180" fill="#6b7280" fontSize="11" fontFamily={FONT}>Subtotal:</text>
          <text x="375" y="180" fill="#1d1d1f" fontSize="12" fontFamily={FONT} fontWeight="bold" textAnchor="end">{'\u20B9'}2,48,000</text>
        </g>

        {/* CGST */}
        <g className="s7-cgst">
          <text x="260" y="196" fill="#9ca3af" fontSize="10" fontFamily={FONT}>CGST 9%:</text>
          <text x="375" y="196" fill="#6b7280" fontSize="10" fontFamily={FONT} textAnchor="end">{'\u20B9'}22,320</text>
        </g>

        {/* SGST */}
        <g className="s7-sgst">
          <text x="260" y="210" fill="#9ca3af" fontSize="10" fontFamily={FONT}>SGST 9%:</text>
          <text x="375" y="210" fill="#6b7280" fontSize="10" fontFamily={FONT} textAnchor="end">{'\u20B9'}22,320</text>
        </g>

        {/* Double line above total */}
        <g className="s7-total-lines">
          <path d="M255 218 C300 217, 345 219, 380 218" stroke="#1d1d1f" strokeWidth="1" fill="none" />
          <path d="M255 221 C300 220, 345 222, 380 221" stroke="#1d1d1f" strokeWidth="1" fill="none" />
        </g>

        {/* TOTAL */}
        <g className="s7-total">
          <text x="260" y="240" fill="#1d1d1f" fontSize="13" fontFamily={FONT} fontWeight="bold">TOTAL:</text>
          <text x="375" y="242" fill="#E03B12" fontSize="17" fontFamily={FONT} fontWeight="bold" textAnchor="end">{'\u20B9'}2,92,640</text>
        </g>

        {/* GST Compliant badge */}
        <g className="s7-gst-badge" style={{ transformOrigin: '175px 262px' }}>
          <rect x="130" y="252" width="100" height="22" rx="11" fill="#f0fdf4" stroke="#10B981" strokeWidth="1.5" />
          <text x="180" y="267" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily={FONT} fontWeight="bold">GST Compliant {'\u2713'}</text>
        </g>

        {/* PAID stamp — slams down cleanly */}
        <g className="s7-stamp">
          <rect x="285" y="245" width="72" height="32" rx="4" fill="none" stroke="#E03B12" strokeWidth="3" strokeDasharray="4 2" />
          <rect x="288" y="248" width="66" height="26" rx="3" fill="rgba(224, 59, 18, 0.1)" stroke="none" />
          <text x="321" y="267" textAnchor="middle" fill="#E03B12" fontSize="20" fontFamily={FONT} fontWeight="bold" style={{ letterSpacing: '3px' }}>PAID</text>
        </g>
      </g>
    </svg>
  );
}


/* ─────────────────────────────────────────────────────────────────────
   Scene 8 — Dispatch & Repeat: Truck delivery, loop back with label
   Duration budget: ~9.5s
   ───────────────────────────────────────────────────────────────────── */
export function Scene8_DispatchAndRepeat({ playing }: SceneProps) {
  return (
    <svg viewBox={VIEWBOX} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'hidden' }}>
      <defs>
        <marker id="s8-arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#6b7280" />
        </marker>
      </defs>
      <style>{`
        @keyframes s8-fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s8-popIn {
          0%   { opacity: 0; transform: scale(0.3); }
          60%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes s8-boxDrop {
          0%   { transform: translateY(-20px); opacity: 0; }
          60%  { transform: translateY(3px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes s8-truckDrive {
          0%   { transform: translateX(0); }
          100% { transform: translateX(560px); }
        }
        @keyframes s8-wheelSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(1080deg); }
        }
        @keyframes s8-curvedArrow {
          from { stroke-dashoffset: 500; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s8-sparkle {
          0%   { opacity: 0; transform: scale(0) rotate(0deg); }
          50%  { opacity: 1; transform: scale(1) rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
        @keyframes s8-bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes s8-motionLine {
          0%   { opacity: 0.7; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes s8-drawTruck {
          from { stroke-dashoffset: 400; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s8-drawCab {
          from { stroke-dashoffset: 250; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes s8-wave {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(-15deg); }
          75%      { transform: rotate(15deg); }
        }
        @keyframes s8-labelSlide {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .s8-ground {
          opacity: ${playing ? '0' : '0.6'};
          ${playing ? 'animation: s8-fadeIn 0.5s ease-out forwards;' : ''}
        }
        .s8-truck-group {
          ${playing ? 'animation: s8-truckDrive 2s 3.5s ease-in forwards;' : ''}
        }
        .s8-cargo {
          stroke-dasharray: 400;
          stroke-dashoffset: ${playing ? '400' : '0'};
          ${playing ? 'animation: s8-drawTruck 0.8s 0.5s ease-out forwards;' : ''}
        }
        .s8-cab {
          stroke-dasharray: 250;
          stroke-dashoffset: ${playing ? '250' : '0'};
          ${playing ? 'animation: s8-drawCab 0.6s 1s ease-out forwards;' : ''}
        }
        .s8-detail {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s8-fadeIn 0.3s 1.4s ease-out forwards;' : ''}
        }
        .s8-brand {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s8-fadeIn 0.3s 1.7s ease-out forwards;' : ''}
        }
        .s8-box1 {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s8-boxDrop 0.4s 1.8s ease-out forwards;' : ''}
        }
        .s8-box2 {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s8-boxDrop 0.4s 2.1s ease-out forwards;' : ''}
        }
        .s8-box3 {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s8-boxDrop 0.4s 2.4s ease-out forwards;' : ''}
        }
        .s8-box4 {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s8-boxDrop 0.4s 2.7s ease-out forwards;' : ''}
        }
        .s8-delivered {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s8-popIn 0.5s 5.8s ease-out forwards;' : ''}
        }
        .s8-loop-arrow {
          stroke-dasharray: 500;
          stroke-dashoffset: ${playing ? '500' : '0'};
          ${playing ? 'animation: s8-curvedArrow 1.5s 6.5s ease-out forwards;' : ''}
        }
        .s8-loop-label {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s8-labelSlide 0.6s 7.5s ease-out forwards;' : ''}
        }
        .s8-repeat-text {
          opacity: ${playing ? '0' : '1'};
          ${playing ? 'animation: s8-fadeIn 0.6s 8s ease-out forwards;' : ''}
        }
      `}</style>

      <rect x="10" y="10" width="480" height="280" rx="12" fill="#fdfbf9" stroke="none" />

      {/* Ground line */}
      <path className="s8-ground" d="M0 235 C50 236, 200 234, 500 235"
        stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="8 4" fill="none" />

      {/* Truck group — draws then drives off */}
      <g className="s8-truck-group">
        {/* Cargo box */}
        <path className="s8-cargo"
          d="M60 160 C59 158, 58 225, 60 227 C62 229, 168 230, 170 228 C172 226, 173 158, 171 156 C169 154, 61 153, 60 160Z"
          stroke="#1d1d1f" strokeWidth="2" fill="#fef3ee" />
        {/* Cab */}
        <path className="s8-cab"
          d="M170 180 C172 178, 210 176, 215 178 C220 180, 225 195, 225 200 L225 228 C223 230, 171 230, 170 228Z"
          stroke="#1d1d1f" strokeWidth="2" fill="#eff6ff" />
        {/* Windshield */}
        <path className="s8-detail"
          d="M178 185 C180 183, 208 182, 210 184 L215 200 L178 200Z"
          stroke="#3B82F6" strokeWidth="1.5" fill="#dbeafe" />
        {/* Bumper */}
        <path className="s8-detail"
          d="M225 215 L235 215 L235 228 L225 228"
          stroke="#1d1d1f" strokeWidth="1.5" fill="#e5e7eb" />
        {/* Headlight */}
        <rect className="s8-detail" x="228" y="208" width="6" height="5" rx="1" fill="#FD9220" />

        {/* Package boxes */}
        <rect className="s8-box1" x="80" y="195" width="22" height="18" rx="2" stroke="#E03B12" strokeWidth="1.2" fill="#fef3ee" transform="rotate(-3, 91, 204)" />
        <rect className="s8-box2" x="105" y="192" width="20" height="20" rx="2" stroke="#FD9220" strokeWidth="1.2" fill="#fff7ed" transform="rotate(2, 115, 202)" />
        <rect className="s8-box3" x="128" y="197" width="18" height="16" rx="2" stroke="#E03B12" strokeWidth="1.2" fill="#fef3ee" transform="rotate(-1, 137, 205)" />
        <rect className="s8-box4" x="92" y="177" width="20" height="16" rx="2" stroke="#FD9220" strokeWidth="1" fill="#fff7ed" transform="rotate(4, 102, 185)" />

        {/* Tape marks */}
        <line className="s8-box1" x1="86" y1="204" x2="96" y2="204" stroke="#E03B12" strokeWidth="0.8" />
        <line className="s8-box2" x1="110" y1="202" x2="120" y2="202" stroke="#FD9220" strokeWidth="0.8" />

        {/* Wheels with spin */}
        <g style={{
          animation: playing ? 's8-wheelSpin 2s 3.5s linear forwards' : 'none',
          transformOrigin: '95px 235px',
        }}>
          <circle cx="95" cy="235" r="12" stroke="#1d1d1f" strokeWidth="2" fill="#f5f5f7" />
          <circle cx="95" cy="235" r="4" fill="#1d1d1f" />
          <line x1="95" y1="225" x2="95" y2="235" stroke="#6b7280" strokeWidth="1" />
          <line x1="85" y1="235" x2="95" y2="235" stroke="#6b7280" strokeWidth="1" />
        </g>
        <g style={{
          animation: playing ? 's8-wheelSpin 2s 3.5s linear forwards' : 'none',
          transformOrigin: '200px 235px',
        }}>
          <circle cx="200" cy="235" r="12" stroke="#1d1d1f" strokeWidth="2" fill="#f5f5f7" />
          <circle cx="200" cy="235" r="4" fill="#1d1d1f" />
          <line x1="200" y1="225" x2="200" y2="235" stroke="#6b7280" strokeWidth="1" />
          <line x1="190" y1="235" x2="200" y2="235" stroke="#6b7280" strokeWidth="1" />
        </g>

        {/* WerkFox branding */}
        <text className="s8-brand" x="115" y="178" textAnchor="middle" fill="#E03B12" fontSize="12" fontFamily={FONT} fontWeight="bold">WerkFox</text>

        {/* Dust/motion lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i}
            x1={50 - i * 3} y1={220 + i * 4} x2={30 - i * 5} y2={220 + i * 4}
            stroke="#d1d5db" strokeWidth={2 - i * 0.3} strokeLinecap="round"
            style={{
              opacity: 0,
              animation: playing ? `s8-motionLine 0.5s ${3.8 + i * 0.15}s ease-out infinite` : 'none',
            }}
          />
        ))}
      </g>

      {/* "Delivered!" text */}
      <text className="s8-delivered" x="250" y="100" textAnchor="middle" fill="#10B981" fontSize="28" fontFamily={FONT} fontWeight="bold">
        Delivered! {'\u2713'}
      </text>

      {/* Subtle dashed loop-back path */}
      <path className="s8-loop-arrow"
        d="M390 120 C415 135, 425 175, 375 195 C325 215, 200 215, 145 195 C105 182, 85 162, 95 140"
        stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="8 5" fill="none"
        markerEnd="url(#s8-arrowhead)" />

      {/* Label on the loop */}
      <g className="s8-loop-label">
        <rect x="215" y="206" width="80" height="18" rx="9" fill="#fdfbf9" stroke="#9ca3af" strokeWidth="1" />
        <text x="255" y="219" textAnchor="middle" fill="#6b7280" fontSize="11" fontFamily={FONT} fontWeight="bold">
          {'\u21BB'} Repeat
        </text>
      </g>

      {/* Simple bottom text */}
      <text className="s8-repeat-text" x="250" y="265" textAnchor="middle" fill="#1d1d1f" fontSize="16" fontFamily={FONT} fontWeight="bold">
        The cycle continues...
      </text>

      {/* Celebration sparkles */}
      {[
        { cx: 120, cy: 75, delay: 8.5, color: '#FD9220' },
        { cx: 320, cy: 65, delay: 8.7, color: '#E03B12' },
        { cx: 200, cy: 50, delay: 8.9, color: '#10B981' },
        { cx: 400, cy: 80, delay: 8.8, color: '#3B82F6' },
        { cx: 70, cy: 95, delay: 9.0, color: '#F59E0B' },
      ].map((s, i) => (
        <path key={i}
          d={`M${s.cx} ${s.cy - 7} L${s.cx + 2} ${s.cy - 2} L${s.cx + 7} ${s.cy} L${s.cx + 2} ${s.cy + 2} L${s.cx} ${s.cy + 7} L${s.cx - 2} ${s.cy + 2} L${s.cx - 7} ${s.cy} L${s.cx - 2} ${s.cy - 2} Z`}
          fill={s.color} opacity="0.8"
          style={{
            opacity: 0,
            animation: playing ? `s8-sparkle 0.9s ${s.delay}s ease-out infinite` : 'none',
            transformOrigin: `${s.cx}px ${s.cy}px`,
          }}
        />
      ))}
    </svg>
  );
}
