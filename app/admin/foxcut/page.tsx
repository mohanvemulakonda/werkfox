'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  CutPiece,
  OptimizationConfig,
  OptimizationResult,
  PIECE_COLORS,
  optimizeCutting,
} from './cutting-engine';
import SheetVisual from './SheetVisual';

// ─── Material Library ────────────────────────────────────────
interface MaterialPreset {
  name: string;
  category: string;
  sheetWidth: number;
  sheetHeight: number;
  thicknesses: number[];
  defaultThickness: number;
  priceRange: string;
}

const MATERIAL_LIBRARY: MaterialPreset[] = [
  // Plywood
  { name: 'BWR Plywood', category: 'Plywood', sheetWidth: 2440, sheetHeight: 1220, thicknesses: [6, 9, 12, 18, 25], defaultThickness: 18, priceRange: '₹80-150/sqft' },
  { name: 'BWP (Marine) Plywood', category: 'Plywood', sheetWidth: 2440, sheetHeight: 1220, thicknesses: [6, 9, 12, 18, 25], defaultThickness: 18, priceRange: '₹120-200/sqft' },
  { name: 'Commercial Plywood', category: 'Plywood', sheetWidth: 2440, sheetHeight: 1220, thicknesses: [6, 9, 12, 18], defaultThickness: 18, priceRange: '₹40-80/sqft' },
  // HDHMR / MDF
  { name: 'HDHMR', category: 'Engineered', sheetWidth: 2440, sheetHeight: 1220, thicknesses: [8, 12, 16, 18, 25], defaultThickness: 18, priceRange: '₹60-100/sqft' },
  { name: 'MDF', category: 'Engineered', sheetWidth: 2440, sheetHeight: 1220, thicknesses: [6, 9, 12, 16, 18, 25], defaultThickness: 18, priceRange: '₹30-60/sqft' },
  { name: 'Pre-Laminated MDF', category: 'Engineered', sheetWidth: 2440, sheetHeight: 1220, thicknesses: [8, 12, 18], defaultThickness: 18, priceRange: '₹50-90/sqft' },
  { name: 'Pre-Laminated Particle Board', category: 'Engineered', sheetWidth: 2440, sheetHeight: 1220, thicknesses: [8, 12, 16, 18, 25], defaultThickness: 16, priceRange: '₹25-50/sqft' },
  // Specialty
  { name: 'Acrylic Sheet', category: 'Specialty', sheetWidth: 2440, sheetHeight: 1220, thicknesses: [3, 4, 6, 8], defaultThickness: 4, priceRange: '₹150-400/sqft' },
  { name: 'Laminate (HPL)', category: 'Specialty', sheetWidth: 2440, sheetHeight: 1220, thicknesses: [0.8, 1, 1.5], defaultThickness: 1, priceRange: '₹15-40/sqft' },
];

// ─── Kitchen Module Presets ──────────────────────────────────
interface ModulePreset {
  name: string;
  category: string;
  parts: { label: string; width: number; height: number; qty: number; grain: 'none' | 'horizontal' | 'vertical'; banding: { top: boolean; bottom: boolean; left: boolean; right: boolean } }[];
}

const MODULE_PRESETS: ModulePreset[] = [
  {
    name: 'Base Unit 600mm',
    category: 'Base Units',
    parts: [
      { label: 'Side Panel L', width: 560, height: 720, qty: 1, grain: 'vertical', banding: { top: false, bottom: false, left: true, right: false } },
      { label: 'Side Panel R', width: 560, height: 720, qty: 1, grain: 'vertical', banding: { top: false, bottom: false, left: false, right: true } },
      { label: 'Top Panel', width: 564, height: 560, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
      { label: 'Bottom Panel', width: 564, height: 560, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
      { label: 'Back Panel', width: 600, height: 720, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
      { label: 'Shelf', width: 560, height: 540, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
    ],
  },
  {
    name: 'Wall Unit 600mm',
    category: 'Wall Units',
    parts: [
      { label: 'Side Panel L', width: 330, height: 720, qty: 1, grain: 'vertical', banding: { top: false, bottom: true, left: true, right: false } },
      { label: 'Side Panel R', width: 330, height: 720, qty: 1, grain: 'vertical', banding: { top: false, bottom: true, left: false, right: true } },
      { label: 'Top Panel', width: 564, height: 330, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
      { label: 'Bottom Panel', width: 564, height: 330, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
      { label: 'Back Panel', width: 600, height: 720, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
      { label: 'Shelf', width: 560, height: 310, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
    ],
  },
  {
    name: 'Tall Unit 600mm',
    category: 'Tall Units',
    parts: [
      { label: 'Side Panel L', width: 560, height: 2100, qty: 1, grain: 'vertical', banding: { top: false, bottom: false, left: true, right: false } },
      { label: 'Side Panel R', width: 560, height: 2100, qty: 1, grain: 'vertical', banding: { top: false, bottom: false, left: false, right: true } },
      { label: 'Top Panel', width: 564, height: 560, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
      { label: 'Bottom Panel', width: 564, height: 560, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
      { label: 'Back Panel', width: 600, height: 2100, qty: 1, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
      { label: 'Shelf', width: 560, height: 540, qty: 3, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
    ],
  },
  {
    name: 'Drawer Unit 600mm (3 Drawers)',
    category: 'Base Units',
    parts: [
      { label: 'Side Panel L', width: 560, height: 720, qty: 1, grain: 'vertical', banding: { top: false, bottom: false, left: true, right: false } },
      { label: 'Side Panel R', width: 560, height: 720, qty: 1, grain: 'vertical', banding: { top: false, bottom: false, left: false, right: true } },
      { label: 'Drawer Front', width: 596, height: 200, qty: 3, grain: 'horizontal', banding: { top: true, bottom: true, left: true, right: true } },
      { label: 'Drawer Side', width: 500, height: 150, qty: 6, grain: 'none', banding: { top: true, bottom: false, left: false, right: false } },
      { label: 'Drawer Back', width: 530, height: 150, qty: 3, grain: 'none', banding: { top: true, bottom: false, left: false, right: false } },
      { label: 'Drawer Bottom', width: 534, height: 500, qty: 3, grain: 'none', banding: { top: false, bottom: false, left: false, right: false } },
    ],
  },
  {
    name: 'Shutter 600x720',
    category: 'Shutters',
    parts: [
      { label: 'Shutter Panel', width: 596, height: 716, qty: 1, grain: 'vertical', banding: { top: true, bottom: true, left: true, right: true } },
    ],
  },
  {
    name: 'Shutter Pair 600x720',
    category: 'Shutters',
    parts: [
      { label: 'Shutter L', width: 296, height: 716, qty: 1, grain: 'vertical', banding: { top: true, bottom: true, left: true, right: true } },
      { label: 'Shutter R', width: 296, height: 716, qty: 1, grain: 'vertical', banding: { top: true, bottom: true, left: true, right: true } },
    ],
  },
];

// ─── Sheet Size Presets ──────────────────────────────────────
const SHEET_PRESETS = [
  { label: '8×4 ft', w: 2440, h: 1220 },
  { label: '8×6 ft', w: 2440, h: 1830 },
  { label: '7×4 ft', w: 2135, h: 1220 },
  { label: '6×4 ft', w: 1830, h: 1220 },
  { label: '6×3 ft', w: 1830, h: 915 },
];

// ─── Default piece ───────────────────────────────────────────
function newPiece(label?: string): CutPiece {
  return {
    id: crypto.randomUUID(),
    label: label || 'Part',
    width: 600,
    height: 400,
    quantity: 1,
    grain: 'none',
    edgeBanding: { top: false, bottom: false, left: false, right: false },
  };
}

// ─── Main Page ───────────────────────────────────────────────
export default function FoxCutPage() {
  // Sheet config
  const [sheetWidth, setSheetWidth] = useState(2440);
  const [sheetHeight, setSheetHeight] = useState(1220);
  const [kerf, setKerf] = useState(4);
  const [edgeTrim, setEdgeTrim] = useState(10);
  const [bandingThickness, setBandingThickness] = useState(0.5);
  const [minRemnant, setMinRemnant] = useState(100);
  const [materialName, setMaterialName] = useState('18mm BWR Plywood');
  const [thickness, setThickness] = useState(18);
  const [sheetPrice, setSheetPrice] = useState(0);

  // Pieces
  const [pieces, setPieces] = useState<CutPiece[]>([newPiece('Part 1')]);
  const [showModules, setShowModules] = useState(false);

  // Result
  const [result, setResult] = useState<OptimizationResult | null>(null);

  // Save
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [planName, setPlanName] = useState('');

  // CSV import ref
  const csvInputRef = useRef<HTMLInputElement>(null);

  // Active section for mobile
  const [activeTab, setActiveTab] = useState<'input' | 'result'>('input');

  // ─── Piece CRUD ──────────────────────────────────────────
  const addPiece = () => {
    setPieces(prev => [...prev, newPiece(`Part ${prev.length + 1}`)]);
  };

  const removePiece = (id: string) => {
    if (pieces.length > 1) setPieces(prev => prev.filter(p => p.id !== id));
  };

  const updatePiece = (id: string, updates: Partial<CutPiece>) => {
    setPieces(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const toggleEdgeBanding = (id: string, edge: 'top' | 'bottom' | 'left' | 'right') => {
    setPieces(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, edgeBanding: { ...p.edgeBanding, [edge]: !p.edgeBanding[edge] } };
    }));
  };

  const clearAllPieces = () => {
    setPieces([newPiece('Part 1')]);
    setResult(null);
  };

  // ─── Add Module Preset ───────────────────────────────────
  const addModule = (preset: ModulePreset) => {
    const newPieces: CutPiece[] = preset.parts.map((part, i) => ({
      id: crypto.randomUUID(),
      label: `${preset.name} - ${part.label}`,
      width: part.width,
      height: part.height,
      quantity: part.qty,
      grain: part.grain,
      edgeBanding: { ...part.banding },
    }));
    setPieces(prev => [...prev, ...newPieces]);
    setShowModules(false);
  };

  // ─── Apply Material Preset ───────────────────────────────
  const applyMaterial = (preset: MaterialPreset) => {
    setSheetWidth(preset.sheetWidth);
    setSheetHeight(preset.sheetHeight);
    setMaterialName(preset.name);
    setThickness(preset.defaultThickness);
  };

  // ─── CSV Import ──────────────────────────────────────────
  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim());
      const imported: CutPiece[] = [];
      // Skip header row if present
      const start = lines[0]?.toLowerCase().includes('label') ? 1 : 0;
      for (let i = start; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.trim());
        if (cols.length >= 4) {
          imported.push({
            id: crypto.randomUUID(),
            label: cols[0] || `Part ${i}`,
            width: parseFloat(cols[1]) || 600,
            height: parseFloat(cols[2]) || 400,
            quantity: parseInt(cols[3]) || 1,
            grain: (cols[4] as CutPiece['grain']) || 'none',
            edgeBanding: {
              top: cols[5] === '1' || cols[5] === 'true',
              bottom: cols[6] === '1' || cols[6] === 'true',
              left: cols[7] === '1' || cols[7] === 'true',
              right: cols[8] === '1' || cols[8] === 'true',
            },
          });
        }
      }
      if (imported.length > 0) {
        setPieces(prev => [...prev, ...imported]);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ─── CSV Export ──────────────────────────────────────────
  const exportCSV = () => {
    const header = 'Label,Width,Height,Quantity,Grain,BandTop,BandBottom,BandLeft,BandRight';
    const rows = pieces.map(p =>
      `${p.label},${p.width},${p.height},${p.quantity},${p.grain},${p.edgeBanding.top ? 1 : 0},${p.edgeBanding.bottom ? 1 : 0},${p.edgeBanding.left ? 1 : 0},${p.edgeBanding.right ? 1 : 0}`
    );
    const blob = new Blob([header + '\n' + rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foxcut-parts-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Optimize ────────────────────────────────────────────
  const handleOptimize = useCallback(() => {
    const validPieces = pieces.filter(p => p.width > 0 && p.height > 0 && p.quantity > 0);
    if (validPieces.length === 0) return;
    const config: OptimizationConfig = {
      sheetWidth,
      sheetHeight,
      kerf,
      edgeTrim,
      bandingThickness,
      minRemnantSize: minRemnant,
    };
    const optimized = optimizeCutting(validPieces, config);
    setResult(optimized);
    setActiveTab('result');
  }, [pieces, sheetWidth, sheetHeight, kerf, edgeTrim, bandingThickness, minRemnant]);

  // ─── Save Plan ───────────────────────────────────────────
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
          material: `${thickness}mm ${materialName}`,
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

  // ─── Print ───────────────────────────────────────────────
  const handlePrint = () => {
    window.print();
  };

  const totalPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const totalBandingPieces = pieces.filter(p => p.edgeBanding.top || p.edgeBanding.bottom || p.edgeBanding.left || p.edgeBanding.right).length;

  return (
    <div className="print:bg-white">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between print:mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-open-sans flex items-center gap-3">
            <span className="w-10 h-10 bg-[#E03B12] text-white flex items-center justify-center text-lg font-bold rounded">
              FC
            </span>
            FoxCut — Panel Cutting Optimizer
          </h1>
          <p className="text-sm text-gray-500 font-inter mt-1">
            Guillotine-optimized sheet cutting for modular kitchens & cabinetry
          </p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Link
            href="/admin/foxcut/history"
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-inter rounded transition-colors"
          >
            Saved Plans
          </Link>
        </div>
      </div>

      {/* Mobile Tab Toggle */}
      <div className="lg:hidden flex mb-4 bg-gray-100 rounded-lg p-1 print:hidden">
        <button
          onClick={() => setActiveTab('input')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'input' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
        >
          Input
        </button>
        <button
          onClick={() => setActiveTab('result')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'result' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
        >
          Results {result ? `(${result.totalSheets} sheets)` : ''}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* ─── INPUT PANEL ─── */}
        <div className={`w-full lg:w-[38%] space-y-4 print:hidden ${activeTab !== 'input' ? 'hidden lg:block' : ''}`}>

          {/* Material Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-gray-800 font-open-sans uppercase tracking-wider mb-3">
              Material & Sheet
            </h3>

            {/* Material presets */}
            <div className="mb-3">
              <label className="block text-[11px] text-gray-500 font-inter mb-1.5">Material</label>
              <select
                value={materialName}
                onChange={(e) => {
                  const preset = MATERIAL_LIBRARY.find(m => m.name === e.target.value);
                  if (preset) applyMaterial(preset);
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none bg-white"
              >
                {Object.entries(
                  MATERIAL_LIBRARY.reduce((acc, m) => {
                    if (!acc[m.category]) acc[m.category] = [];
                    acc[m.category].push(m);
                    return acc;
                  }, {} as Record<string, MaterialPreset[]>)
                ).map(([cat, materials]) => (
                  <optgroup key={cat} label={cat}>
                    {materials.map(m => (
                      <option key={m.name} value={m.name}>{m.name} — {m.priceRange}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Thickness */}
            <div className="mb-3">
              <label className="block text-[11px] text-gray-500 font-inter mb-1.5">Thickness</label>
              <div className="flex flex-wrap gap-1.5">
                {(MATERIAL_LIBRARY.find(m => m.name === materialName)?.thicknesses || [6, 9, 12, 18, 25]).map(t => (
                  <button
                    key={t}
                    onClick={() => setThickness(t)}
                    className={`px-2.5 py-1 text-xs rounded font-inter transition-colors ${
                      thickness === t
                        ? 'bg-[#E03B12] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t}mm
                  </button>
                ))}
              </div>
            </div>

            {/* Sheet size & config */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="block text-[11px] text-gray-500 font-inter mb-1">Sheet W (mm)</label>
                <input type="number" value={sheetWidth} onChange={e => setSheetWidth(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 font-inter mb-1">Sheet H (mm)</label>
                <input type="number" value={sheetHeight} onChange={e => setSheetHeight(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
              </div>
            </div>

            {/* Sheet presets */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {SHEET_PRESETS.map(p => (
                <button key={p.label} onClick={() => { setSheetWidth(p.w); setSheetHeight(p.h); }}
                  className={`text-[11px] px-2 py-1 rounded font-inter transition-colors ${
                    sheetWidth === p.w && sheetHeight === p.h
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Advanced settings */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-gray-500 font-inter mb-1">Blade Kerf (mm)</label>
                <input type="number" value={kerf} onChange={e => setKerf(Number(e.target.value))} step={0.5}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 font-inter mb-1">Edge Trim (mm)</label>
                <input type="number" value={edgeTrim} onChange={e => setEdgeTrim(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 font-inter mb-1">Banding (mm)</label>
                <input type="number" value={bandingThickness} onChange={e => setBandingThickness(Number(e.target.value))} step={0.1}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 font-inter mb-1">Sheet Price (₹)</label>
                <input type="number" value={sheetPrice} onChange={e => setSheetPrice(Number(e.target.value))} placeholder="0"
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
              </div>
            </div>
          </div>

          {/* Cut Pieces */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-800 font-open-sans uppercase tracking-wider">
                Cut Pieces
                <span className="ml-2 text-gray-400 font-normal normal-case">
                  {totalPieces} pcs from {pieces.length} parts
                </span>
              </h3>
              <div className="flex gap-1.5">
                <button onClick={() => setShowModules(!showModules)}
                  className="text-[11px] px-2.5 py-1 bg-[#E03B12]/10 text-[#E03B12] hover:bg-[#E03B12]/20 rounded font-inter transition-colors">
                  + Module
                </button>
                <button onClick={addPiece}
                  className="text-[11px] px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded font-inter transition-colors">
                  + Part
                </button>
              </div>
            </div>

            {/* Module Presets Dropdown */}
            {showModules && (
              <div className="mb-3 bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1.5">
                <p className="text-[11px] text-gray-500 font-inter mb-2">Add a kitchen module (auto-generates all parts):</p>
                {Object.entries(
                  MODULE_PRESETS.reduce((acc, m) => {
                    if (!acc[m.category]) acc[m.category] = [];
                    acc[m.category].push(m);
                    return acc;
                  }, {} as Record<string, ModulePreset[]>)
                ).map(([cat, modules]) => (
                  <div key={cat}>
                    <p className="text-[10px] text-gray-400 font-inter uppercase tracking-wider mb-1">{cat}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {modules.map(m => (
                        <button key={m.name} onClick={() => addModule(m)}
                          className="text-[11px] px-2.5 py-1.5 border border-dashed border-[#E03B12]/40 text-[#E03B12] rounded hover:bg-[#E03B12]/5 font-inter transition-colors">
                          {m.name} ({m.parts.reduce((s, p) => s + p.qty, 0)} pcs)
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Import/Export */}
            <div className="flex gap-1.5 mb-3">
              <input ref={csvInputRef} type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
              <button onClick={() => csvInputRef.current?.click()}
                className="text-[11px] px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded font-inter transition-colors">
                Import CSV
              </button>
              <button onClick={exportCSV}
                className="text-[11px] px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded font-inter transition-colors">
                Export CSV
              </button>
              <button onClick={clearAllPieces}
                className="text-[11px] px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-inter transition-colors ml-auto">
                Clear All
              </button>
            </div>

            {/* Piece List */}
            <div className="space-y-2.5 max-h-[450px] overflow-y-auto pr-1">
              {pieces.map((piece, idx) => (
                <div key={piece.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  {/* Row 1: Label, Dimensions, Qty */}
                  <div className="flex items-end gap-2 mb-2">
                    <div className="w-4 h-4 rounded flex-shrink-0 mt-4" style={{ backgroundColor: PIECE_COLORS[idx % PIECE_COLORS.length] }} />
                    <div className="flex-1 min-w-0">
                      <label className="block text-[10px] text-gray-400 font-inter mb-0.5">Label</label>
                      <input type="text" value={piece.label}
                        onChange={e => updatePiece(piece.id, { label: e.target.value })}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
                    </div>
                    <div className="w-[70px]">
                      <label className="block text-[10px] text-gray-400 font-inter mb-0.5">W (mm)</label>
                      <input type="number" value={piece.width}
                        onChange={e => updatePiece(piece.id, { width: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
                    </div>
                    <div className="w-[70px]">
                      <label className="block text-[10px] text-gray-400 font-inter mb-0.5">H (mm)</label>
                      <input type="number" value={piece.height}
                        onChange={e => updatePiece(piece.id, { height: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
                    </div>
                    <div className="w-[50px]">
                      <label className="block text-[10px] text-gray-400 font-inter mb-0.5">Qty</label>
                      <input type="number" min={1} value={piece.quantity}
                        onChange={e => updatePiece(piece.id, { quantity: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
                    </div>
                    <button onClick={() => removePiece(piece.id)}
                      className="text-gray-400 hover:text-red-500 pb-1 transition-colors flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {/* Row 2: Grain + Edge Banding */}
                  <div className="flex items-center gap-3 pl-6">
                    {/* Grain */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 font-inter">Grain:</span>
                      {(['none', 'horizontal', 'vertical'] as const).map(g => (
                        <button key={g} onClick={() => updatePiece(piece.id, { grain: g })}
                          className={`text-[10px] px-1.5 py-0.5 rounded font-inter transition-colors ${
                            piece.grain === g
                              ? 'bg-gray-800 text-white'
                              : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                          }`}
                        >
                          {g === 'none' ? '—' : g === 'horizontal' ? '→' : '↓'}
                        </button>
                      ))}
                    </div>

                    {/* Edge Banding */}
                    <div className="flex items-center gap-1.5 ml-2">
                      <span className="text-[10px] text-gray-400 font-inter">Band:</span>
                      {(['top', 'bottom', 'left', 'right'] as const).map(edge => (
                        <button key={edge} onClick={() => toggleEdgeBanding(piece.id, edge)}
                          className={`text-[10px] w-5 h-5 flex items-center justify-center rounded transition-colors font-inter ${
                            piece.edgeBanding[edge]
                              ? 'bg-amber-500 text-white'
                              : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                          }`}
                          title={`${edge} edge banding`}
                        >
                          {edge[0].toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimize Button */}
          <button onClick={handleOptimize}
            className="w-full py-3 bg-[#E03B12] hover:bg-[#c73210] text-white font-semibold text-sm font-inter tracking-wide transition-colors rounded-lg">
            Optimize Cutting Layout
          </button>

          {/* Save Section */}
          {result && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-xs font-semibold text-gray-800 font-open-sans mb-2 uppercase tracking-wider">Save Plan</h3>
              <div className="flex gap-2">
                <input type="text" value={planName} onChange={e => setPlanName(e.target.value)}
                  placeholder="e.g. Kitchen - Sharma Residence"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm font-inter focus:ring-1 focus:ring-[#E03B12] focus:border-[#E03B12] outline-none" />
                <button onClick={handleSave} disabled={saving}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-inter transition-colors rounded disabled:opacity-50">
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

        {/* ─── OUTPUT PANEL ─── */}
        <div className={`w-full lg:w-[62%] ${activeTab !== 'result' ? 'hidden lg:block' : ''}`}>
          {!result ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center min-h-[500px]">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={1.5}>
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                </svg>
              </div>
              <p className="text-gray-500 font-inter text-sm mb-1">
                Add parts and click <strong>Optimize</strong> to see cutting layouts
              </p>
              <p className="text-gray-400 font-inter text-xs">
                Guillotine-optimized with edge banding, grain direction & kerf
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white border border-gray-200 rounded-lg p-3.5">
                  <p className="text-[11px] text-gray-500 font-inter">Sheets Needed</p>
                  <p className="text-2xl font-bold text-gray-900 font-open-sans">{result.totalSheets}</p>
                  {sheetPrice > 0 && (
                    <p className="text-xs text-gray-400 font-inter mt-0.5">
                      ₹{(result.totalSheets * sheetPrice).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3.5">
                  <p className="text-[11px] text-gray-500 font-inter">Utilization</p>
                  <p className="text-2xl font-bold font-open-sans" style={{
                    color: result.overallUtilization >= 80 ? '#059669' : result.overallUtilization >= 60 ? '#D97706' : '#DC2626'
                  }}>
                    {result.overallUtilization.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-400 font-inter mt-0.5">
                    {(100 - result.overallUtilization).toFixed(1)}% waste
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3.5">
                  <p className="text-[11px] text-gray-500 font-inter">Pieces Placed</p>
                  <p className="text-2xl font-bold text-gray-900 font-open-sans">
                    {result.piecesPlaced}<span className="text-sm text-gray-400 font-normal">/{result.piecesTotal}</span>
                  </p>
                  {result.unplacedPieces.length > 0 && (
                    <p className="text-xs text-red-500 font-inter mt-0.5">
                      {result.unplacedPieces.length} won&apos;t fit
                    </p>
                  )}
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3.5">
                  <p className="text-[11px] text-gray-500 font-inter">Edge Banding</p>
                  <p className="text-2xl font-bold text-gray-900 font-open-sans">
                    {(result.edgeBandingSummary.totalLength / 1000).toFixed(1)}<span className="text-sm text-gray-400 font-normal">m</span>
                  </p>
                  <p className="text-xs text-gray-400 font-inter mt-0.5">
                    {totalBandingPieces} parts with banding
                  </p>
                </div>
              </div>

              {/* Unplaced Warning */}
              {result.unplacedPieces.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-red-800 font-inter">Some pieces couldn&apos;t fit on any sheet</p>
                    <p className="text-xs text-red-600 font-inter mt-0.5">{result.unplacedPieces.join(', ')}</p>
                  </div>
                </div>
              )}

              {/* Print Button */}
              <div className="flex justify-end gap-2 print:hidden">
                <button onClick={handlePrint}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-inter rounded transition-colors flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                  </svg>
                  Print / PDF
                </button>
              </div>

              {/* Sheet Layouts */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-gray-800 font-open-sans mb-4 uppercase tracking-wider">
                  Cutting Layouts — {thickness}mm {materialName}
                </h3>
                {result.sheets.map((sheet, i) => (
                  <SheetVisual
                    key={i}
                    sheet={sheet}
                    sheetWidth={sheetWidth}
                    sheetHeight={sheetHeight}
                    index={i}
                    edgeTrim={edgeTrim}
                  />
                ))}
              </div>

              {/* Remnants */}
              {result.totalRemnants.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-gray-800 font-open-sans mb-3 uppercase tracking-wider">
                    Usable Remnants ({result.totalRemnants.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {result.totalRemnants.map((r, i) => (
                      <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-2.5">
                        <p className="text-sm font-semibold text-green-800 font-mono">{r.width} × {r.height}mm</p>
                        <p className="text-[11px] text-green-600 font-inter">{(r.area / 1000000).toFixed(3)} m²</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Edge Banding Summary */}
              {result.edgeBandingSummary.totalLength > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-gray-800 font-open-sans mb-3 uppercase tracking-wider">
                    Edge Banding Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 col-span-2 md:col-span-1">
                      <p className="text-[11px] text-amber-600 font-inter">Total</p>
                      <p className="text-lg font-bold text-amber-800 font-mono">{(result.edgeBandingSummary.totalLength / 1000).toFixed(1)}m</p>
                    </div>
                    {Object.entries(result.edgeBandingSummary.byEdge).map(([edge, length]) => (
                      <div key={edge} className="bg-gray-50 border border-gray-200 rounded-lg p-2.5">
                        <p className="text-[11px] text-gray-500 font-inter capitalize">{edge}</p>
                        <p className="text-sm font-semibold text-gray-800 font-mono">{(length / 1000).toFixed(1)}m</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parts Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-gray-800 font-open-sans mb-3 uppercase tracking-wider">
                  Parts List
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-inter">
                    <thead>
                      <tr className="border-b border-gray-200 text-left">
                        <th className="py-2 px-2 text-[11px] text-gray-500 font-medium">#</th>
                        <th className="py-2 px-2 text-[11px] text-gray-500 font-medium">Label</th>
                        <th className="py-2 px-2 text-[11px] text-gray-500 font-medium">Size (mm)</th>
                        <th className="py-2 px-2 text-[11px] text-gray-500 font-medium">Qty</th>
                        <th className="py-2 px-2 text-[11px] text-gray-500 font-medium">Grain</th>
                        <th className="py-2 px-2 text-[11px] text-gray-500 font-medium">Banding</th>
                        <th className="py-2 px-2 text-[11px] text-gray-500 font-medium text-right">Area (mm²)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pieces.map((p, i) => (
                        <tr key={p.id} className="border-b border-gray-100">
                          <td className="py-1.5 px-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: PIECE_COLORS[i % PIECE_COLORS.length] }} />
                          </td>
                          <td className="py-1.5 px-2 text-gray-800 text-xs">{p.label}</td>
                          <td className="py-1.5 px-2 text-gray-600 text-xs font-mono">{p.width} × {p.height}</td>
                          <td className="py-1.5 px-2 text-gray-600 text-xs">{p.quantity}</td>
                          <td className="py-1.5 px-2 text-gray-600 text-xs">
                            {p.grain === 'none' ? '—' : p.grain === 'horizontal' ? '→' : '↓'}
                          </td>
                          <td className="py-1.5 px-2 text-xs">
                            {Object.entries(p.edgeBanding).filter(([, v]) => v).map(([e]) => e[0].toUpperCase()).join('') || '—'}
                          </td>
                          <td className="py-1.5 px-2 text-gray-600 text-xs font-mono text-right">
                            {(p.width * p.height * p.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cost Summary */}
              {sheetPrice > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-gray-800 font-open-sans mb-3 uppercase tracking-wider">
                    Cost Summary
                  </h3>
                  <div className="space-y-2 text-sm font-inter">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{result.totalSheets} sheets × ₹{sheetPrice.toLocaleString()}</span>
                      <span className="font-semibold text-gray-900">₹{(result.totalSheets * sheetPrice).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Waste cost ({(100 - result.overallUtilization).toFixed(1)}%)</span>
                      <span className="text-red-500">₹{Math.round(result.totalSheets * sheetPrice * (100 - result.overallUtilization) / 100).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-semibold text-gray-900">Material Cost</span>
                      <span className="font-bold text-gray-900 text-base">₹{(result.totalSheets * sheetPrice).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
