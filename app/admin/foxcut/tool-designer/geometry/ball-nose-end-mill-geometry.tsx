'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

const S = 0.5;

const COLORS = {
  shank: '#C0C8D4',
  brand: '#E03B12',
  flute: '#64748B',
  helix: '#334155',
  tip: '#F59E0B',
};

function createHelixCurve(radius: number, height: number, turns: number, startAngle: number) {
  const points: THREE.Vector3[] = [];
  const segments = turns * 32;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = startAngle + t * turns * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, t * height, Math.sin(angle) * radius));
  }
  return new THREE.CatmullRomCurve3(points);
}

interface Dims {
  diameter?: number;
  ballRadius?: number;
  fluteLength?: number;
  overallLength?: number;
  shankDiameter?: number;
  fluteCount?: number;
  helixAngle?: number;
  [key: string]: number | undefined;
}

export function BallNoseEndMillGeometry({ dims }: { dims: Dims }) {
  const { shankGeo, fluteGeo, ballGeo, helixGeos, brandGeo } = useMemo(() => {
    const {
      diameter = 10,
      ballRadius = 5,
      fluteLength = 40,
      overallLength = 80,
      shankDiameter = 10,
      fluteCount = 2,
      helixAngle = 30,
    } = dims;
    const r = (diameter / 2) * S;
    const br = ballRadius * S;
    const sr = (shankDiameter / 2) * S;
    const fl = fluteLength * S;
    const ol = overallLength * S;
    const shankLen = ol - fl;

    const shank = new THREE.CylinderGeometry(sr, sr, shankLen, 32);
    const flute = new THREE.CylinderGeometry(r, r, fl - br, 32);
    const ball = new THREE.SphereGeometry(br, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);

    const bandWidth = Math.min(shankLen * 0.15, 3 * S);
    const brand = new THREE.CylinderGeometry(sr * 1.02, sr * 1.02, bandWidth, 32);

    const helixTurns = (fl - br) / (Math.PI * diameter * Math.tan((helixAngle * Math.PI) / 180));
    const helixes: THREE.TubeGeometry[] = [];
    for (let i = 0; i < fluteCount; i++) {
      const startAngle = (i / fluteCount) * Math.PI * 2;
      const curve = createHelixCurve(r * 1.01, fl - br, Math.max(1, helixTurns), startAngle);
      helixes.push(new THREE.TubeGeometry(curve, 64, 0.35 * S, 6, false));
    }

    return { shankGeo: shank, fluteGeo: flute, ballGeo: ball, helixGeos: helixes, brandGeo: brand };
  }, [dims]);

  const br = (dims.ballRadius || 5) * S;
  const fl = (dims.fluteLength || 40) * S;
  const ol = (dims.overallLength || 80) * S;
  const shankLen = ol - fl;

  return (
    <group>
      <mesh geometry={shankGeo} position={[0, fl + shankLen / 2, 0]}>
        <meshStandardMaterial color={COLORS.shank} metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh geometry={brandGeo} position={[0, fl + shankLen * 0.7, 0]}>
        <meshStandardMaterial color={COLORS.brand} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh geometry={fluteGeo} position={[0, br + (fl - br) / 2, 0]}>
        <meshStandardMaterial color={COLORS.flute} metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh geometry={ballGeo} position={[0, br, 0]}>
        <meshStandardMaterial color={COLORS.tip} metalness={0.6} roughness={0.25} />
      </mesh>
      {helixGeos.map((geo, i) => (
        <mesh key={i} geometry={geo} position={[0, br, 0]}>
          <meshStandardMaterial color={COLORS.helix} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
