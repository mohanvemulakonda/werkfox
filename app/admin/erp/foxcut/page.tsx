'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────
interface CutPiece {
  id: string;
  label: string;
  width: number;
  height: number;
  quantity: number;
}

interface PlacedPiece {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
  colorIndex: number;
}

interface SheetResult {
  pieces: PlacedPiece[];
  usedArea: number;
  wasteArea: number;
  utilization: number;
}

interface OptimizationResult {
  sheets: SheetResult[];
  totalSheets: number;
  overallUtilization: number;
  totalWasteArea: number;
  totalUsedArea: number;
}

// ─── Color palette for pieces ────────────────────────────────
const PIECE_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
  '#14B8A6', '#E11D48', '#7C3AED', '#0EA5E9', '#D97706',
  '#059669', '#DC2626', '#9333EA', '#2563EB', '#CA8A04',
];

// ─── Quick-add presets for kitchen modules ───────────────────
const KITCHEN_PRESETS = [
  { label: 'Base 600', width: 600, height: 720 },
  { label: 'Base 900', width: 900, height: 720 },
  { label: 'Wall 600', width: 600, height: 360 },
  { label: 'Tall 2100', width: 600, height: 2100 },
  { label: 'Drawer 600', width: 600, height: 200 },
  { label: 'Shelf 800', width: 800, height: 400 },
];

// ─── FFDH Bin-Packing Algorithm ─────────────────────────────
function optimizeCutting(
  pieces: CutPiece[],
  sheetWidth: number,
  sheetHeight: number,
  kerf: number
): OptimizationResult {
  // Expand quantities into individual pieces
  const expandedPieces: { label: string; width: number; height: number; originalIndex: number }[] = [];
  let colorIdx = 0;
  pieces.forEach((p) => {
    for (let i = 0; i < p.quantity; i++) {
      expandedPieces.push({
        label: p.quantity > 1 ? `${p.label} #${i + 1}` : p.label,
        width: p.width,
        height: p.height,
        originalIndex: colorIdx,
      });
    }
    colorIdx++;
  });

  // Sort by height descending (FFDH)
  expandedPieces.sort((a, b) => b.height - a.height);

  const sheets: SheetResult[] = [];
  const remaining = [...expandedPieces];

  while (remaining.length > 0) {
    const sheet: SheetResult = { pieces: [], usedArea: 0, wasteArea: 0, utilization: 0 };
    const shelves: { y: number; height: number; xOffset: number }[] = [];
    let currentY = 0;

    const toPlace = [...remaining];
    const placed: number[] = [];

    for (let i = 0; i < toPlace.length; i++) {
      const piece = toPlace[i];
      let didPlace = false;

      // Try each orientation: original, then rotated
      const orientations = [
        { w: piece.width, h: piece.height, rotated: false },
        { w: piece.height, h: piece.width, rotated: true },
      ];

      for (const orient of orientations) {
        if (orient.w > sheetWidth || orient.h > sheetHeight) continue;

        // Try existing shelves
        for (const shelf of shelves) {
          if (orient.h <= shelf.height && shelf.xOffset + orient.w + kerf <= sheetWidth + kerf) {
            sheet.pieces.push({
              label: piece.label,
              x: shelf.xOffset,
              y: shelf.y,
              width: orient.w,
              height: orient.h,
              rotated: orient.rotated,
              colorIndex: piece.originalIndex % PIECE_COLORS.length,
            });
            shelf.xOffset += orient.w + kerf;
            sheet.usedArea += orient.w * orient.h;
            placed.push(i);
            didPlace = true;
            break;
          }
        }

        if (didPlace) break;

        // Create new shelf
        if (currentY + orient.h + kerf <= sheetHeight + kerf) {
          shelves.push({ y: currentY, height: orient.h, xOffset: orient.w + kerf });
          sheet.pieces.push({
            label: piece.label,
            x: 0,
            y: currentY,
            width: orient.w,
            height: orient.h,
            rotated: orient.rotated,
            colorIndex: piece.originalIndex % PIECE_COLORS.length,
          });
          currentY += orient.h + kerf;
          sheet.usedArea += orient.w * orient.h;
          placed.push(i);
          didPlace = true;
          break;
        }
      }
    }

    const totalArea = sheetWidth * sheetHeight;
    sheet.wasteArea = totalArea - sheet.usedArea;
    sheet.utilization = (sheet.usedArea / totalArea) * 100;

    // Remove placed pieces from remaining
    const placedSet = new Set(placed);
    const newRemaining: typeof remaining = [];
    for (let i = 0; i < remaining.length; i++) {
      if (!placedSet.has(i)) {
        newRemaining.push(remaining[i]);
      }
    }
    remaining.length = 0;
    remaining.push(...newRemaining);

    if (sheet.pieces.length === 0) {
      // Pieces too large for the sheet — skip them
      break;
    }

    sheets.push(sheet);
  }

  const totalSheetArea = sheetWidth * sheetHeight * sheets.length;
  const totalUsedArea = sheets.reduce((s, sh) => s + sh.usedArea, 0);

  return {
    sheets,
    totalSheets: sheets.length,
    overallUtilization: totalSheetArea > 0 ? (totalUsedArea / totalSheetArea) * 100 : 0,
    totalWasteArea: totalSheetArea - totalUsedArea,
    totalUsedArea,
  };
}

// ─── SVG Sheet Visualizer ────────────────────────────────────
function SheetVisual({
  sheet,
  sheetWidth,
  sheetHeight,
  index,
}: {
  sheet: SheetResult;
  sheetWidth: number;
  sheetHeight: number;
  index: number;
}) {
  const maxDisplayWidth = 700;
  const scale = maxDisplayWidth / sheetWidth;
  const displayHeight = sheetHeight * scale;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-700 font-open-sans">
          Sheet {index + 1}
        </h4>
        <span className="text-xs text-gray-500 font-inter">
          {sheet.utilization.toFixed(1)}% utilization — {sheet.pieces.length} pieces
        </span>
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white inline-block">
        <svg
          width={maxDisplayWidth}
          height={displayHeight}
          viewBox={`0 0 ${sheetWidth} ${sheetHeight}`}
          className="block"
        >
          {/* Sheet background */}
          <rect
            x={0}
            y={0}
            width={sheetWidth}
            height={sheetHeight}
            fill="#F3F4F6"
            stroke="#D1D5DB"
            strokeWidth={2}
          />
          {/* Waste pattern */}
          <defs>
            <pattern id={`waste-${index}`} patternUnits="userSpaceOnUse" width={20} height={20}>
              <line x1={0} y1={20} x2={20} y2={0} stroke="#E5E7EB" strokeWidth={1} />
            </pattern>
          </defs>
          <rect
            x={0}
            y={0}
            width={sheetWidth}
            height={sheetHeight}
            fill={`url(#waste-${index})`}
          />
          {/* Placed pieces */}
          {sheet.pieces.map((piece, i) => {
            const color = PIECE_COLORS[piece.colorIndex];
            const fontSize = Math.min(piece.width, piece.height) * 0.15;
            const clampedFontSize = Math.max(10, Math.min(fontSize, 28));
            return (
              <g key={i}>
                <rect
                  x={piece.x}
                  y={piece.y}
                  width={piece.width}
                  height={piece.height}
                  fill={color}
                  fillOpacity={0.25}
                  stroke={color}
                  strokeWidth={2}
                  rx={2}
                />
                <rect
                  x={piece.x}
                  y={piece.y}
                  width={piece.width}
                  height={piece.height}
                  fill={color}
                  fillOpacity={0.08}
                />
                <text
                  x={piece.x + piece.width / 2}
                  y={piece.y + piece.height / 2 - clampedFontSize * 0.3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={clampedFontSize}
                  fontWeight={600}
                  fill={color}
                  className="select-none"
                >
                  {piece.label}
                </text>
                <text
                  x={piece.x + piece.width / 2}
                  y={piece.y + piece.height / 2 + clampedFontSize * 0.7}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={clampedFontSize * 0.7}
                  fill="#6B7280"
                  className="select-none"
                >
                  {piece.width}x{piece.height}{piece.rotated ? ' (R)' : ''}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function FoxCutPage() {
  const [sheetWidth, setSheetWidth] = useState(2440);
  const [sheetHeight, setSheetHeight] = useState(1220);
  const [kerf, setKerf] = useState(4);
  const [material, setMaterial] = useState('');
  const [sheetPrice, setSheetPrice] = useState(0);
  const [pieces, setPieces] = useState<CutPiece[]>([
    { id: crypto.randomUUID(), label: 'Part 1', width: 600, height: 400, quantity: 1 },
  ]);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [planName, setPlanName] = useState('');

  const addPiece = () => {
    setPieces([
      ...pieces,
      {
        id: crypto.randomUUID(),
        label: `Part ${pieces.length + 1}`,
        width: 600,
        height: 400,
        quantity: 1,
      },
    ]);
  };

  const removePiece = (id: string) => {
    if (pieces.length > 1) {
      setPieces(pieces.filter((p) => p.id !== id));
    }
  };

  const updatePiece = (id: string, field: keyof CutPiece, value: string | number) => {
    setPieces(
      pieces.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addPreset = (preset: { label: string; width: number; height: number }) => {
    setPieces([
      ...pieces,
      {
        id: crypto.randomUUID(),
        label: preset.label,
        width: preset.width,
        height: preset.height,
        quantity: 1,
      },
    ]);
  };

  const handleOptimize = useCallback(() => {
    const validPieces = pieces.filter(
      (p) => p.width > 0 && p.height > 0 && p.quantity > 0
    );
    if (validPieces.length === 0) return;
    const optimized = optimizeCutting(validPieces, sheetWidth, sheetHeight, kerf);
    setResult(optimized);
  }, [pieces, sheetWidth, sheetHeight, kerf]);

  const handleSave = async () => {
    if (!result || !planName.trim()) {
      setSaveMessage('Enter a plan name before saving.');
      return;
    }
    setSaving(true);
    setSaveMessage('');
    try {
      const res = await fetch('/api/foxcut', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: planName,
          material: material || null,
          sheetWidth,
          sheetHeight,
          kerf,
          pieces,
          result,
          utilization: result.overallUtilization,
          sheetsUsed: result.totalSheets,
        }),
      });
      if (res.ok) {
        setSaveMessage('Plan saved successfully.');
        setPlanName('');
      } else {
        const data = await res.json();
        setSaveMessage(data.error || 'Failed to save plan.');
      }
    } catch {
      setSaveMessage('Failed to save plan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">
            FoxCut — Sheet Cutting Optimizer
          </h1>
          <p className="text-gray-600 font-inter font-light">
            Optimize rectangular sheet cutting to minimize material waste
          </p>
        </div>
        <Link
          href="/admin/erp/foxcut/history"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">Saved Plans</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ─── Input Panel (Left) ─── */}
        <div className="w-full lg:w-[40%] space-y-5">
          {/* Sheet Configuration */}
          <div className="bg-white border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-800 font-open-sans mb-4 uppercase tracking-wider">
              Sheet Configuration
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 font-inter mb-1">Width (mm)</label>
                <input
                  type="number"
                  value={sheetWidth}
                  onChange={(e) => setSheetWidth(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-inter mb-1">Height (mm)</label>
                <input
                  type="number"
                  value={sheetHeight}
                  onChange={(e) => setSheetHeight(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-inter mb-1">Blade Kerf (mm)</label>
                <input
                  type="number"
                  value={kerf}
                  onChange={(e) => setKerf(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-inter mb-1">Sheet Price</label>
                <input
                  type="number"
                  value={sheetPrice}
                  onChange={(e) => setSheetPrice(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs text-gray-500 font-inter mb-1">Material</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. 18mm BWR Plywood, MDF, Laminate"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
              />
            </div>
            {/* Standard sheet presets */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-gray-400 font-inter self-center mr-1">Presets:</span>
              {[
                { label: '8x4 ft', w: 2440, h: 1220 },
                { label: '7x4 ft', w: 2135, h: 1220 },
                { label: '6x4 ft', w: 1830, h: 1220 },
                { label: '6x3 ft', w: 1830, h: 915 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => { setSheetWidth(preset.w); setSheetHeight(preset.h); }}
                  className="text-xs px-2.5 py-1 border border-gray-300 rounded hover:bg-gray-50 font-inter transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cut Pieces */}
          <div className="bg-white border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 font-open-sans uppercase tracking-wider">
                Cut Pieces
              </h3>
              <button
                onClick={addPiece}
                className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded font-inter transition-colors"
              >
                + Add Piece
              </button>
            </div>

            {/* Quick-add presets */}
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="text-xs text-gray-400 font-inter self-center mr-1">Quick add:</span>
              {KITCHEN_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => addPreset(preset)}
                  className="text-xs px-2.5 py-1 border border-dashed border-[#E03B12]/40 text-[#E03B12] rounded hover:bg-[#E03B12]/5 font-inter transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {pieces.map((piece, idx) => (
                <div key={piece.id} className="flex items-end gap-2 p-3 bg-gray-50 rounded border border-gray-100">
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] text-gray-400 font-inter mb-0.5">Label</label>
                    <input
                      type="text"
                      value={piece.label}
                      onChange={(e) => updatePiece(piece.id, 'label', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
                    />
                  </div>
                  <div className="w-20">
                    <label className="block text-[10px] text-gray-400 font-inter mb-0.5">W (mm)</label>
                    <input
                      type="number"
                      value={piece.width}
                      onChange={(e) => updatePiece(piece.id, 'width', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
                    />
                  </div>
                  <div className="w-20">
                    <label className="block text-[10px] text-gray-400 font-inter mb-0.5">H (mm)</label>
                    <input
                      type="number"
                      value={piece.height}
                      onChange={(e) => updatePiece(piece.id, 'height', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
                    />
                  </div>
                  <div className="w-16">
                    <label className="block text-[10px] text-gray-400 font-inter mb-0.5">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={piece.quantity}
                      onChange={(e) => updatePiece(piece.id, 'quantity', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
                    />
                  </div>
                  <button
                    onClick={() => removePiece(piece.id)}
                    className="text-gray-400 hover:text-red-500 pb-1.5 transition-colors"
                    title="Remove piece"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-400 font-inter mt-3">
              {pieces.reduce((s, p) => s + p.quantity, 0)} total pieces from {pieces.length} unique parts
            </div>
          </div>

          {/* Optimize Button */}
          <button
            onClick={handleOptimize}
            className="w-full py-3.5 bg-[#E03B12] hover:bg-[#c73210] text-white font-semibold text-sm font-inter tracking-wide transition-colors rounded"
          >
            Optimize Cutting Layout
          </button>

          {/* Save Section */}
          {result && (
            <div className="bg-white border border-gray-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 font-open-sans mb-3 uppercase tracking-wider">
                Save Plan
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Plan name (e.g. Kitchen - Sharma Residence)"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none"
                />
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-inter transition-colors rounded disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
              {saveMessage && (
                <p className={`text-xs mt-2 font-inter ${saveMessage.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
                  {saveMessage}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ─── Output Panel (Right) ─── */}
        <div className="w-full lg:w-[60%]">
          {!result ? (
            <div className="bg-white border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px]">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth={1.5}>
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
              <p className="text-gray-400 font-inter mt-4 text-sm">
                Add your cut pieces and click <strong>Optimize</strong> to see the cutting layout
              </p>
              <p className="text-gray-300 font-inter mt-1 text-xs">
                The algorithm minimizes sheet waste using First Fit Decreasing Height
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white border border-gray-200 shadow-sm p-4">
                  <p className="text-xs text-gray-500 font-inter">Sheets Needed</p>
                  <p className="text-2xl font-bold text-gray-900 font-open-sans">{result.totalSheets}</p>
                </div>
                <div className="bg-white border border-gray-200 shadow-sm p-4">
                  <p className="text-xs text-gray-500 font-inter">Utilization</p>
                  <p className="text-2xl font-bold font-open-sans" style={{
                    color: result.overallUtilization >= 80 ? '#059669' : result.overallUtilization >= 60 ? '#D97706' : '#DC2626'
                  }}>
                    {result.overallUtilization.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-white border border-gray-200 shadow-sm p-4">
                  <p className="text-xs text-gray-500 font-inter">Total Waste</p>
                  <p className="text-2xl font-bold text-gray-900 font-open-sans">
                    {(result.totalWasteArea / 1000000).toFixed(2)} <span className="text-sm font-normal text-gray-500">m&sup2;</span>
                  </p>
                </div>
                <div className="bg-white border border-gray-200 shadow-sm p-4">
                  <p className="text-xs text-gray-500 font-inter">Estimated Cost</p>
                  <p className="text-2xl font-bold text-gray-900 font-open-sans">
                    {sheetPrice > 0 ? `${(result.totalSheets * sheetPrice).toLocaleString()}` : '---'}
                  </p>
                </div>
              </div>

              {/* Sheet Layouts */}
              <div className="bg-white border border-gray-200 shadow-sm p-5 overflow-x-auto">
                <h3 className="text-sm font-semibold text-gray-800 font-open-sans mb-4 uppercase tracking-wider">
                  Cutting Layouts
                </h3>
                {result.sheets.map((sheet, i) => (
                  <SheetVisual
                    key={i}
                    sheet={sheet}
                    sheetWidth={sheetWidth}
                    sheetHeight={sheetHeight}
                    index={i}
                  />
                ))}
              </div>

              {/* Pieces Summary Table */}
              <div className="bg-white border border-gray-200 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 font-open-sans mb-4 uppercase tracking-wider">
                  Pieces Summary
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-inter">
                    <thead>
                      <tr className="border-b border-gray-200 text-left">
                        <th className="py-2 px-3 text-xs text-gray-500 font-medium">Label</th>
                        <th className="py-2 px-3 text-xs text-gray-500 font-medium">Size (mm)</th>
                        <th className="py-2 px-3 text-xs text-gray-500 font-medium">Qty</th>
                        <th className="py-2 px-3 text-xs text-gray-500 font-medium">Area (mm&sup2;)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pieces.map((piece) => (
                        <tr key={piece.id} className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-800">{piece.label}</td>
                          <td className="py-2 px-3 text-gray-600">{piece.width} x {piece.height}</td>
                          <td className="py-2 px-3 text-gray-600">{piece.quantity}</td>
                          <td className="py-2 px-3 text-gray-600">
                            {(piece.width * piece.height * piece.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
