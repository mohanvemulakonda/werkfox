'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Tool2DView from './Tool2DView';

const Tool3DViewer = dynamic(() => import('./Tool3DViewer'), { ssr: false });

// ---- Tool type definitions with default dimensions ----

type ToolTypeKey =
  | 'drill-bit'
  | 'flat-end-mill'
  | 'ball-nose-end-mill'
  | 'boring-bar'
  | 'face-mill'
  | 'turning-insert'
  | 'tap';

interface DimensionField {
  key: string;
  label: string;
  unit: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
}

interface ToolTypeConfig {
  label: string;
  icon: string;
  fields: DimensionField[];
}

const TOOL_TYPES: Record<ToolTypeKey, ToolTypeConfig> = {
  'drill-bit': {
    label: 'Drill Bit',
    icon: '\uD83D\uDD29',
    fields: [
      { key: 'diameter', label: 'Diameter', unit: 'mm', defaultValue: 10, min: 0.5, max: 100, step: 0.5 },
      { key: 'overall_length', label: 'Overall Length', unit: 'mm', defaultValue: 80, min: 10, max: 500, step: 1 },
      { key: 'flute_length', label: 'Flute Length', unit: 'mm', defaultValue: 30, min: 5, max: 300, step: 1 },
      { key: 'shank_diameter', label: 'Shank Diameter', unit: 'mm', defaultValue: 10, min: 0.5, max: 100, step: 0.5 },
      { key: 'point_angle', label: 'Point Angle', unit: '\u00B0', defaultValue: 140, min: 60, max: 180, step: 1 },
    ],
  },
  'flat-end-mill': {
    label: 'Flat End Mill',
    icon: '\uD83D\uDEE0',
    fields: [
      { key: 'diameter', label: 'Diameter', unit: 'mm', defaultValue: 10, min: 0.5, max: 100, step: 0.5 },
      { key: 'overall_length', label: 'Overall Length', unit: 'mm', defaultValue: 70, min: 10, max: 500, step: 1 },
      { key: 'flute_length', label: 'Flute Length', unit: 'mm', defaultValue: 20, min: 5, max: 300, step: 1 },
      { key: 'shank_diameter', label: 'Shank Diameter', unit: 'mm', defaultValue: 10, min: 0.5, max: 100, step: 0.5 },
      { key: 'corner_radius', label: 'Corner Radius', unit: 'mm', defaultValue: 0, min: 0, max: 20, step: 0.1 },
    ],
  },
  'ball-nose-end-mill': {
    label: 'Ball Nose End Mill',
    icon: '\u26BD',
    fields: [
      { key: 'diameter', label: 'Diameter', unit: 'mm', defaultValue: 8, min: 0.5, max: 100, step: 0.5 },
      { key: 'overall_length', label: 'Overall Length', unit: 'mm', defaultValue: 70, min: 10, max: 500, step: 1 },
      { key: 'flute_length', label: 'Flute Length', unit: 'mm', defaultValue: 8, min: 2, max: 300, step: 1 },
      { key: 'shank_diameter', label: 'Shank Diameter', unit: 'mm', defaultValue: 8, min: 0.5, max: 100, step: 0.5 },
      { key: 'corner_radius', label: 'Ball Radius', unit: 'mm', defaultValue: 4, min: 0.1, max: 50, step: 0.1 },
    ],
  },
  'boring-bar': {
    label: 'Boring Bar',
    icon: '\uD83D\uDD27',
    fields: [
      { key: 'shank_diameter', label: 'Shank Diameter', unit: 'mm', defaultValue: 20, min: 3, max: 100, step: 0.5 },
      { key: 'overall_length', label: 'Overall Length', unit: 'mm', defaultValue: 150, min: 20, max: 500, step: 1 },
    ],
  },
  'face-mill': {
    label: 'Face Mill',
    icon: '\u2699\uFE0F',
    fields: [
      { key: 'body_diameter', label: 'Body Diameter', unit: 'mm', defaultValue: 63, min: 20, max: 300, step: 1 },
      { key: 'bore_diameter', label: 'Bore Diameter', unit: 'mm', defaultValue: 22, min: 5, max: 100, step: 0.5 },
      { key: 'insert_count', label: 'Number of Inserts', unit: '', defaultValue: 6, min: 2, max: 20, step: 1 },
    ],
  },
  'turning-insert': {
    label: 'Turning Insert',
    icon: '\u25C7',
    fields: [
      { key: 'ic_diameter', label: 'IC Diameter', unit: 'mm', defaultValue: 12.7, min: 3, max: 50, step: 0.1 },
      { key: 'thickness', label: 'Thickness', unit: 'mm', defaultValue: 4.76, min: 1, max: 20, step: 0.01 },
      { key: 'nose_radius', label: 'Nose Radius', unit: 'mm', defaultValue: 0.8, min: 0.1, max: 5, step: 0.1 },
    ],
  },
  tap: {
    label: 'Tap',
    icon: '\uD83E\uDE9B',
    fields: [
      { key: 'diameter', label: 'Diameter', unit: 'mm', defaultValue: 10, min: 1, max: 100, step: 0.5 },
      { key: 'overall_length', label: 'Overall Length', unit: 'mm', defaultValue: 80, min: 10, max: 300, step: 1 },
      { key: 'flute_length', label: 'Flute Length', unit: 'mm', defaultValue: 25, min: 5, max: 200, step: 1 },
      { key: 'shank_diameter', label: 'Shank Diameter', unit: 'mm', defaultValue: 10, min: 1, max: 100, step: 0.5 },
    ],
  },
};

type ViewTab = '2d' | '3d';

export default function ToolDesignerPage() {
  const [toolType, setToolType] = useState<ToolTypeKey>('drill-bit');
  const [dimensions, setDimensions] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    for (const f of TOOL_TYPES['drill-bit'].fields) {
      defaults[f.key] = f.defaultValue;
    }
    return defaults;
  });
  const [viewTab, setViewTab] = useState<ViewTab>('2d');

  const handleToolTypeChange = useCallback((newType: ToolTypeKey) => {
    setToolType(newType);
    const defaults: Record<string, number> = {};
    for (const f of TOOL_TYPES[newType].fields) {
      defaults[f.key] = f.defaultValue;
    }
    setDimensions(defaults);
  }, []);

  const handleDimensionChange = useCallback((key: string, value: number) => {
    setDimensions(prev => ({ ...prev, [key]: value }));
  }, []);

  const config = TOOL_TYPES[toolType];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center gap-4">
          <Link href="/admin/erp/foxcut" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 font-open-sans">Tool Designer</h1>
            <p className="text-sm text-gray-500">Parametric 2D/3D cutting tool visualization</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex gap-6" style={{ minHeight: 'calc(100vh - 140px)' }}>
          {/* ---- Left Panel: Inputs (35%) ---- */}
          <div className="w-[35%] flex-shrink-0 space-y-5">
            {/* Tool Type Selector */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Tool Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(TOOL_TYPES) as ToolTypeKey[]).map((key) => {
                  const t = TOOL_TYPES[key];
                  const isActive = toolType === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleToolTypeChange(key)}
                      className={`
                        flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                        ${isActive
                          ? 'bg-[#E03B12] text-white shadow-sm'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }
                      `}
                    >
                      <span className="text-base">{t.icon}</span>
                      <span className="truncate">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dimension Inputs */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Dimensions</h3>
              <div className="space-y-4">
                {config.fields.map((field) => (
                  <div key={field.key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm text-gray-600 font-medium">{field.label}</label>
                      <span className="text-xs text-gray-400">{field.unit}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={field.min ?? 0}
                        max={field.max ?? 500}
                        step={field.step ?? 1}
                        value={dimensions[field.key] ?? field.defaultValue}
                        onChange={(e) => handleDimensionChange(field.key, parseFloat(e.target.value))}
                        className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E03B12]"
                      />
                      <input
                        type="number"
                        min={field.min ?? 0}
                        max={field.max ?? 500}
                        step={field.step ?? 1}
                        value={dimensions[field.key] ?? field.defaultValue}
                        onChange={(e) => handleDimensionChange(field.key, parseFloat(e.target.value) || 0)}
                        className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-[#E03B12]/30 focus:border-[#E03B12]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                Adjust dimensions using the sliders or type exact values. The visualization updates in real-time.
                Switch between 2D technical drawing and 3D model views.
              </p>
            </div>
          </div>

          {/* ---- Right Panel: Visualization (65%) ---- */}
          <div className="flex-1 space-y-4">
            {/* View Toggle Tabs */}
            <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1.5 w-fit">
              <button
                onClick={() => setViewTab('2d')}
                className={`
                  px-5 py-2 rounded-lg text-sm font-semibold transition-all
                  ${viewTab === '2d'
                    ? 'bg-[#E03B12] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                2D Drawing
              </button>
              <button
                onClick={() => setViewTab('3d')}
                className={`
                  px-5 py-2 rounded-lg text-sm font-semibold transition-all
                  ${viewTab === '3d'
                    ? 'bg-[#E03B12] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                3D View
              </button>
            </div>

            {/* Visualization Area */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">
                  {config.label} &mdash; {viewTab === '2d' ? 'Technical Drawing' : '3D Model'}
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  {viewTab === '2d' ? 'SVG' : 'WebGL'}
                </span>
              </div>

              {viewTab === '2d' ? (
                <Tool2DView toolType={toolType} dimensions={dimensions} />
              ) : (
                <Tool3DViewer toolType={toolType} dimensions={dimensions} />
              )}
            </div>

            {/* Dimension Summary Table */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Dimension Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {config.fields.map((field) => (
                  <div key={field.key} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-0.5">{field.label}</div>
                    <div className="text-lg font-semibold text-gray-900 font-mono">
                      {dimensions[field.key] ?? field.defaultValue}
                      <span className="text-xs text-gray-400 ml-1 font-normal">{field.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
