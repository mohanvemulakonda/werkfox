'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

const S = 0.5;

const COLORS = {
  shank: '#C0C8D4',
  brand: '#E03B12',
  pocket: '#334155',
  insert: '#F59E0B',
};

interface Dims {
  shankDiameter?: number;
  overallLength?: number;
  insertWidth?: number;
  insertLength?: number;
  pocketAngle?: number;
  [key: string]: number | undefined;
}

export function BoringBarGeometry({ dims }: { dims: Dims }) {
  const { shankGeo, pocketGeo, insertGeo, brandGeo } = useMemo(() => {
    const {
      shankDiameter = 20,
      overallLength = 150,
      insertWidth = 8,
      insertLength = 12,
    } = dims;
    const sr = (shankDiameter / 2) * S;
    const ol = overallLength * S;
    const iw = insertWidth * S;
    const il = insertLength * S;

    const shank = new THREE.CylinderGeometry(sr, sr, ol, 32);
    const pocketSize = sr * 1.2;
    const pocket = new THREE.BoxGeometry(pocketSize, il * 1.5, pocketSize);
    const insert = new THREE.BoxGeometry(iw, il, iw * 0.5);

    const bandWidth = Math.min(ol * 0.08, 4 * S);
    const brand = new THREE.CylinderGeometry(sr * 1.02, sr * 1.02, bandWidth, 32);

    return { shankGeo: shank, pocketGeo: pocket, insertGeo: insert, brandGeo: brand };
  }, [dims]);

  const sr = ((dims.shankDiameter || 20) / 2) * S;
  const ol = (dims.overallLength || 150) * S;
  const il = (dims.insertLength || 12) * S;
  const pAngle = ((dims.pocketAngle || 93) * Math.PI) / 180;

  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh geometry={shankGeo} position={[0, 0, 0]}>
        <meshStandardMaterial color={COLORS.shank} metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh geometry={brandGeo} position={[0, -ol * 0.3, 0]}>
        <meshStandardMaterial color={COLORS.brand} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh geometry={pocketGeo} position={[sr * 0.4, ol / 2 - il * 0.8, 0]} rotation={[0, 0, pAngle]}>
        <meshStandardMaterial color={COLORS.pocket} metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh geometry={insertGeo} position={[sr * 0.7, ol / 2 - il * 0.5, 0]} rotation={[0, 0, pAngle]}>
        <meshStandardMaterial color={COLORS.insert} metalness={0.6} roughness={0.25} />
      </mesh>
    </group>
  );
}
