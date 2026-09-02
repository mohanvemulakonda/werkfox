'use client';

import { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false });
const Environment = dynamic(() => import('@react-three/drei').then(mod => mod.Environment), { ssr: false });
const Center = dynamic(() => import('@react-three/drei').then(mod => mod.Center), { ssr: false });
const ContactShadows = dynamic(() => import('@react-three/drei').then(mod => mod.ContactShadows), { ssr: false });
const Text = dynamic(() => import('@react-three/drei').then(mod => mod.Text), { ssr: false });

import { DrillBitGeometry } from './geometry/drill-bit-geometry';
import { FlatEndMillGeometry } from './geometry/flat-end-mill-geometry';
import { BallNoseEndMillGeometry } from './geometry/ball-nose-end-mill-geometry';
import { FaceMillGeometry } from './geometry/face-mill-geometry';
import { BoringBarGeometry } from './geometry/boring-bar-geometry';

type GeometryComponent = typeof DrillBitGeometry;

const GEOMETRY_MAP: Record<string, GeometryComponent> = {
  'drill-bit': DrillBitGeometry,
  'flat-end-mill': FlatEndMillGeometry,
  'ball-nose-end-mill': BallNoseEndMillGeometry,
  'face-mill': FaceMillGeometry,
  'boring-bar': BoringBarGeometry,
};

interface DimensionMap {
  [key: string]: number;
}

interface Dims {
  diameter: number;
  fluteLength: number;
  overallLength: number;
  shankDiameter: number;
  pointAngle: number;
  fluteCount: number;
  helixAngle: number;
  ballRadius: number;
  boreDiameter: number;
  height: number;
  insertCount: number;
  insertWidth: number;
  insertLength: number;
  pocketAngle: number;
}

function buildDims(dimensions: DimensionMap): Dims {
  return {
    diameter: dimensions.diameter || dimensions.body_diameter || 12,
    fluteLength: dimensions.flute_length || 40,
    overallLength: dimensions.overall_length || 80,
    shankDiameter: dimensions.shank_diameter || dimensions.diameter || 12,
    pointAngle: dimensions.point_angle || 118,
    fluteCount: 2,
    helixAngle: 30,
    ballRadius: dimensions.corner_radius || (dimensions.diameter || 10) / 2,
    boreDiameter: dimensions.bore_diameter || 22,
    height: dimensions.thickness || 40,
    insertCount: dimensions.insert_count || 6,
    insertWidth: 8,
    insertLength: 12,
    pocketAngle: 93,
  };
}

function BrandText({ position, rotation, shankRadius }: { position: [number, number, number]; rotation: [number, number, number]; shankRadius: number }) {
  return (
    <Text
      position={position}
      rotation={rotation}
      fontSize={shankRadius * 0.6}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.1}
    >
      WERKFOX
    </Text>
  );
}

interface Tool3DViewerProps {
  toolType: string;
  dimensions: DimensionMap;
}

export default function Tool3DViewer({ toolType, dimensions }: Tool3DViewerProps) {
  const GeometryComponent = GEOMETRY_MAP[toolType];

  if (!GeometryComponent) {
    return (
      <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center flex-col gap-2">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
        <span className="text-sm text-gray-400">3D preview not available for this tool type</span>
      </div>
    );
  }

  const dims = buildDims(dimensions);
  const sr = ((dims.shankDiameter || 12) / 2) * 0.5;
  const fl = (dims.fluteLength || 40) * 0.5;
  const ol = (dims.overallLength || 80) * 0.5;
  const shankLen = ol - fl;

  return (
    <div className="h-96 bg-[#f0f2f5] border border-gray-200 rounded-xl overflow-hidden relative">
      <Suspense fallback={
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]" />
        </div>
      }>
        <Canvas camera={{ position: [0, 30, 80], fov: 35 }} style={{ height: '100%' }}>
          <Environment preset="studio" />
          <ambientLight intensity={0.3} />
          <directionalLight position={[50, 80, 50]} intensity={0.8} castShadow />
          <directionalLight position={[-30, 40, -20]} intensity={0.4} />
          <Center>
            <GeometryComponent dims={dims} />
            <BrandText
              position={[sr * 1.03, fl + shankLen * 0.7, 0]}
              rotation={[0, 0, 0]}
              shankRadius={sr}
            />
            <BrandText
              position={[-sr * 1.03, fl + shankLen * 0.7, 0]}
              rotation={[0, Math.PI, 0]}
              shankRadius={sr}
            />
          </Center>
          <ContactShadows position={[0, -1, 0]} opacity={0.4} blur={2} far={20} />
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      </Suspense>
    </div>
  );
}
