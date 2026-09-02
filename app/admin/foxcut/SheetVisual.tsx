'use client';

import { useState } from 'react';
import type { SheetResult, PlacedPiece, Remnant } from './cutting-engine';
import { PIECE_COLORS } from './cutting-engine';

// ─── Props ────────────────────────────────────────────────────
interface SheetVisualProps {
  sheet: SheetResult;
  sheetWidth: number;
  sheetHeight: number;
  index: number;
  edgeTrim: number;
}

// ─── Tooltip State ────────────────────────────────────────────
interface TooltipData {
  x: number;
  y: number;
  piece: PlacedPiece;
}

// ─── Constants ────────────────────────────────────────────────
const MAX_DISPLAY_WIDTH = 800;
const EDGE_BANDING_COLOR = '#F59E0B';
const ACCENT_COLOR = '#E03B12';
const BANDING_THICKNESS_RATIO = 0.012;
const CUT_SEQUENCE_RADIUS_RATIO = 0.015;
const MIN_CUT_SEQ_RADIUS = 10;
const MAX_CUT_SEQ_RADIUS = 18;
const DIMENSION_LABEL_OFFSET = 30;
const GRAIN_ARROW_SIZE_RATIO = 0.06;

// ─── Helpers ──────────────────────────────────────────────────

function utilizationColor(util: number): string {
  if (util >= 80) return '#059669';
  if (util >= 60) return '#D97706';
  return '#DC2626';
}

function utilizationLabel(util: number): string {
  if (util >= 80) return 'Excellent';
  if (util >= 60) return 'Fair';
  return 'Low';
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// ─── Component ────────────────────────────────────────────────

export default function SheetVisual({
  sheet,
  sheetWidth,
  sheetHeight,
  index,
  edgeTrim,
}: SheetVisualProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const scale = MAX_DISPLAY_WIDTH / sheetWidth;
  const displayHeight = sheetHeight * scale;
  const padding = DIMENSION_LABEL_OFFSET + 10;

  const svgW = sheetWidth + padding * 2;
  const svgH = sheetHeight + padding * 2;
  const displayW = MAX_DISPLAY_WIDTH + padding * 2 * scale;
  const displayHTot = displayHeight + padding * 2 * scale;

  const ox = padding;
  const oy = padding;

  const utilization = sheet.utilization;
  const remnants: Remnant[] = sheet.remnants ?? [];
  const bandingThickness = Math.max(4, sheetWidth * BANDING_THICKNESS_RATIO);

  // ── Event handlers ──
  function handlePieceEnter(
    e: React.MouseEvent<SVGGElement>,
    piece: PlacedPiece
  ) {
    const svg = (e.currentTarget.ownerSVGElement as SVGSVGElement | null);
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10,
      piece,
    });
  }

  function handlePieceMove(e: React.MouseEvent<SVGGElement>, piece: PlacedPiece) {
    const svg = (e.currentTarget.ownerSVGElement as SVGSVGElement | null);
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10,
      piece,
    });
  }

  function handlePieceLeave() {
    setTooltip(null);
  }

  // ── Render functions ──

  function renderWastePattern() {
    return (
      <defs>
        {/* Waste hatching */}
        <pattern
          id={`waste-hatch-${index}`}
          patternUnits="userSpaceOnUse"
          width={12}
          height={12}
          patternTransform="rotate(45)"
        >
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={12}
            stroke="#D1D5DB"
            strokeWidth={1}
          />
        </pattern>
      </defs>
    );
  }

  function renderEdgeTrim() {
    if (edgeTrim <= 0) return null;
    const t = edgeTrim;
    return (
      <g>
        {/* Top trim */}
        <rect x={ox} y={oy} width={sheetWidth} height={t} fill="#E5E7EB" opacity={0.6} />
        {/* Bottom trim */}
        <rect x={ox} y={oy + sheetHeight - t} width={sheetWidth} height={t} fill="#E5E7EB" opacity={0.6} />
        {/* Left trim */}
        <rect x={ox} y={oy} width={t} height={sheetHeight} fill="#E5E7EB" opacity={0.6} />
        {/* Right trim */}
        <rect x={ox + sheetWidth - t} y={oy} width={t} height={sheetHeight} fill="#E5E7EB" opacity={0.6} />
        {/* Trim border lines */}
        <rect
          x={ox + t}
          y={oy + t}
          width={sheetWidth - t * 2}
          height={sheetHeight - t * 2}
          fill="none"
          stroke="#9CA3AF"
          strokeWidth={0.5}
          strokeDasharray="6 3"
        />
      </g>
    );
  }

  function renderDimensions() {
    const fontSize = clamp(sheetWidth * 0.018, 10, 16);
    const arrowLen = 8;

    return (
      <g className="select-none" style={{ pointerEvents: 'none' }}>
        {/* Width dimension (top) */}
        <line
          x1={ox}
          y1={oy - 15}
          x2={ox + sheetWidth}
          y2={oy - 15}
          stroke="#6B7280"
          strokeWidth={1}
        />
        <line x1={ox} y1={oy - 15 - arrowLen / 2} x2={ox} y2={oy - 15 + arrowLen / 2} stroke="#6B7280" strokeWidth={1} />
        <line x1={ox + sheetWidth} y1={oy - 15 - arrowLen / 2} x2={ox + sheetWidth} y2={oy - 15 + arrowLen / 2} stroke="#6B7280" strokeWidth={1} />
        <text
          x={ox + sheetWidth / 2}
          y={oy - 20}
          textAnchor="middle"
          fontSize={fontSize}
          fill="#6B7280"
          fontFamily="Inter, sans-serif"
        >
          {sheetWidth} mm
        </text>

        {/* Height dimension (left) */}
        <line
          x1={ox - 15}
          y1={oy}
          x2={ox - 15}
          y2={oy + sheetHeight}
          stroke="#6B7280"
          strokeWidth={1}
        />
        <line x1={ox - 15 - arrowLen / 2} y1={oy} x2={ox - 15 + arrowLen / 2} y2={oy} stroke="#6B7280" strokeWidth={1} />
        <line x1={ox - 15 - arrowLen / 2} y1={oy + sheetHeight} x2={ox - 15 + arrowLen / 2} y2={oy + sheetHeight} stroke="#6B7280" strokeWidth={1} />
        <text
          x={ox - 20}
          y={oy + sheetHeight / 2}
          textAnchor="middle"
          fontSize={fontSize}
          fill="#6B7280"
          fontFamily="Inter, sans-serif"
          transform={`rotate(-90, ${ox - 20}, ${oy + sheetHeight / 2})`}
        >
          {sheetHeight} mm
        </text>
      </g>
    );
  }

  function renderPiece(piece: PlacedPiece, i: number) {
    const color = PIECE_COLORS[piece.colorIndex % PIECE_COLORS.length];
    const px = ox + piece.x;
    const py = oy + piece.y;
    const pw = piece.width;
    const ph = piece.height;

    const minDim = Math.min(pw, ph);
    const fontSize = clamp(minDim * 0.12, 8, 22);
    const dimFontSize = fontSize * 0.75;

    // Cut sequence badge
    const seqRadius = clamp(sheetWidth * CUT_SEQUENCE_RADIUS_RATIO, MIN_CUT_SEQ_RADIUS, MAX_CUT_SEQ_RADIUS);
    const seqFontSize = seqRadius * 0.85;
    const cutSeq = piece.cutSequence;

    // Grain direction
    const hasGrain = piece.grain !== 'none';
    const grainArrowSize = clamp(minDim * GRAIN_ARROW_SIZE_RATIO, 8, 20);

    // Edge banding
    const edgeBanding = piece.edgeBanding;

    return (
      <g
        key={i}
        onMouseEnter={(e) => handlePieceEnter(e, piece)}
        onMouseMove={(e) => handlePieceMove(e, piece)}
        onMouseLeave={handlePieceLeave}
        style={{ cursor: 'pointer' }}
      >
        {/* Piece fill */}
        <rect
          x={px}
          y={py}
          width={pw}
          height={ph}
          fill={color}
          fillOpacity={0.2}
          stroke={color}
          strokeWidth={2}
          rx={2}
        />
        {/* Subtle overlay for depth */}
        <rect
          x={px}
          y={py}
          width={pw}
          height={ph}
          fill={color}
          fillOpacity={0.06}
          rx={2}
        />

        {/* Edge banding indicators */}
        {edgeBanding?.top && (
          <line
            x1={px}
            y1={py}
            x2={px + pw}
            y2={py}
            stroke={EDGE_BANDING_COLOR}
            strokeWidth={bandingThickness}
            strokeLinecap="round"
          />
        )}
        {edgeBanding?.bottom && (
          <line
            x1={px}
            y1={py + ph}
            x2={px + pw}
            y2={py + ph}
            stroke={EDGE_BANDING_COLOR}
            strokeWidth={bandingThickness}
            strokeLinecap="round"
          />
        )}
        {edgeBanding?.left && (
          <line
            x1={px}
            y1={py}
            x2={px}
            y2={py + ph}
            stroke={EDGE_BANDING_COLOR}
            strokeWidth={bandingThickness}
            strokeLinecap="round"
          />
        )}
        {edgeBanding?.right && (
          <line
            x1={px + pw}
            y1={py}
            x2={px + pw}
            y2={py + ph}
            stroke={EDGE_BANDING_COLOR}
            strokeWidth={bandingThickness}
            strokeLinecap="round"
          />
        )}

        {/* Label */}
        <text
          x={px + pw / 2}
          y={py + ph / 2 - fontSize * 0.3}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight={600}
          fill={color}
          fontFamily="Inter, sans-serif"
          className="select-none"
        >
          {piece.label}
        </text>

        {/* Dimensions */}
        <text
          x={px + pw / 2}
          y={py + ph / 2 + fontSize * 0.65}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={dimFontSize}
          fill="#6B7280"
          fontFamily="Inter, sans-serif"
          className="select-none"
        >
          {pw} x {ph}{piece.rotated ? ' (R)' : ''}
        </text>

        {/* Cut sequence number badge */}
        {cutSeq != null && (
          <g>
            <circle
              cx={px + seqRadius + 4}
              cy={py + seqRadius + 4}
              r={seqRadius}
              fill={ACCENT_COLOR}
              opacity={0.9}
            />
            <text
              x={px + seqRadius + 4}
              y={py + seqRadius + 4}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={seqFontSize}
              fontWeight={700}
              fill="#FFFFFF"
              fontFamily="Inter, sans-serif"
              className="select-none"
            >
              {cutSeq}
            </text>
          </g>
        )}

        {/* Grain direction indicator */}
        {hasGrain && (
          <g>
            {piece.grain === 'vertical' ? (
              // Vertical grain arrow (down)
              <>
                <text
                  x={px + pw - grainArrowSize - 2}
                  y={py + grainArrowSize + 4}
                  fontSize={grainArrowSize}
                  fill="#374151"
                  fontFamily="Inter, sans-serif"
                  className="select-none"
                  opacity={0.6}
                >
                  &#8595;
                </text>
              </>
            ) : (
              // Horizontal grain arrow (right)
              <>
                <text
                  x={px + pw - grainArrowSize - 2}
                  y={py + grainArrowSize + 4}
                  fontSize={grainArrowSize}
                  fill="#374151"
                  fontFamily="Inter, sans-serif"
                  className="select-none"
                  opacity={0.6}
                >
                  &#8594;
                </text>
              </>
            )}
          </g>
        )}
      </g>
    );
  }

  function renderRemnants() {
    if (remnants.length === 0) return null;
    const fontSize = clamp(sheetWidth * 0.014, 8, 14);

    return (
      <g>
        {remnants.map((rem, i) => {
          const rx = ox + rem.x;
          const ry = oy + rem.y;
          return (
            <g key={`rem-${i}`}>
              <rect
                x={rx}
                y={ry}
                width={rem.width}
                height={rem.height}
                fill="none"
                stroke="#059669"
                strokeWidth={2}
                strokeDasharray="8 4"
                rx={2}
              />
              <text
                x={rx + rem.width / 2}
                y={ry + rem.height / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={fontSize}
                fill="#059669"
                fontWeight={500}
                fontFamily="Inter, sans-serif"
                className="select-none"
              >
                {rem.width} x {rem.height}
              </text>
            </g>
          );
        })}
      </g>
    );
  }

  function renderTooltip() {
    if (!tooltip) return null;
    const p = tooltip.piece;
    const hasGrainTip = p.grain !== 'none';
    const edgeBanding = p.edgeBanding;
    const cutSeq = p.cutSequence;
    const bandingSides: string[] = [];
    if (edgeBanding?.top) bandingSides.push('Top');
    if (edgeBanding?.bottom) bandingSides.push('Bottom');
    if (edgeBanding?.left) bandingSides.push('Left');
    if (edgeBanding?.right) bandingSides.push('Right');

    return (
      <div
        className="absolute z-50 bg-gray-900 text-white text-xs font-inter rounded-md px-3 py-2 shadow-lg pointer-events-none whitespace-nowrap"
        style={{
          left: tooltip.x,
          top: tooltip.y,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="font-semibold mb-0.5">{p.label}</div>
        <div className="text-gray-300">
          {p.width} x {p.height} mm{p.rotated ? ' (Rotated)' : ''}
        </div>
        <div className="text-gray-300">
          Area: {(p.width * p.height).toLocaleString()} mm&sup2;
        </div>
        {cutSeq != null && (
          <div className="text-gray-300">Cut #{cutSeq}</div>
        )}
        {hasGrainTip && (
          <div className="text-gray-300">Grain: {p.grain}</div>
        )}
        {bandingSides.length > 0 && (
          <div className="text-gray-300">Banding: {bandingSides.join(', ')}</div>
        )}
      </div>
    );
  }

  // ── Main Render ──

  return (
    <div className="mb-8">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h4 className="text-sm font-semibold text-gray-800 font-open-sans">
          Sheet {index + 1}
        </h4>
        <div className="flex items-center gap-4 text-xs font-inter">
          <span className="text-gray-500">
            {sheet.pieces.length} piece{sheet.pieces.length !== 1 ? 's' : ''}
          </span>
          {remnants.length > 0 && (
            <span className="text-gray-500">
              {remnants.length} remnant{remnants.length !== 1 ? 's' : ''}
            </span>
          )}
          <span
            className="font-semibold"
            style={{ color: utilizationColor(utilization) }}
          >
            {utilization.toFixed(1)}% {utilizationLabel(utilization)}
          </span>
        </div>
      </div>

      {/* SVG Container */}
      <div
        className="relative border border-gray-300 rounded-lg overflow-hidden bg-white inline-block"
        style={{ maxWidth: MAX_DISPLAY_WIDTH + padding * 2 * scale }}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="block"
          style={{ maxWidth: displayW, maxHeight: displayHTot }}
        >
          {renderWastePattern()}

          {/* Sheet background */}
          <rect
            x={ox}
            y={oy}
            width={sheetWidth}
            height={sheetHeight}
            fill="#F3F4F6"
            stroke="#9CA3AF"
            strokeWidth={1.5}
          />

          {/* Waste hatching over entire sheet */}
          <rect
            x={ox}
            y={oy}
            width={sheetWidth}
            height={sheetHeight}
            fill={`url(#waste-hatch-${index})`}
          />

          {/* Edge trim areas */}
          {renderEdgeTrim()}

          {/* Placed pieces */}
          {sheet.pieces.map((piece, i) => renderPiece(piece, i))}

          {/* Remnants */}
          {renderRemnants()}

          {/* Sheet dimensions */}
          {renderDimensions()}
        </svg>

        {/* Tooltip overlay */}
        {renderTooltip()}
      </div>
    </div>
  );
}
