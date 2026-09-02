'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

const S = 0.5;

const COLORS = {
  body: '#C0C8D4',
  brand: '#E03B12',
  insert: '#F59E0B',
};

interface Dims {
  diameter?: number;
  boreDiameter?: number;
  height?: number;
  insertCount?: number;
  insertWidth?: number;
  insertLength?: number;
  [key: string]: number | undefined;
}

export function FaceMillGeometry({ dims }: { dims: Dims }) {
  const { bodyGeo, insertGeos, brandGeo } = useMemo(() => {
    const {
      diameter = 63,
      boreDiameter = 22,
      height = 40,
      insertCount = 6,
      insertWidth = 8,
      insertLength = 12,
    } = dims;
    const outerR = (diameter / 2) * S;
    const boreR = (boreDiameter / 2) * S;
    const h = height * S;
    const iw = insertWidth * S;
    const il = insertLength * S;

    const bodyShape = new THREE.Shape();
    bodyShape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, boreR, 0, Math.PI * 2, true);
    bodyShape.holes.push(hole);

    const body = new THREE.ExtrudeGeometry(bodyShape, { depth: h, bevelEnabled: false });

    const brandShape = new THREE.Shape();
    brandShape.absarc(0, 0, outerR * 0.75, 0, Math.PI * 2, false);
    const brandHole = new THREE.Path();
    brandHole.absarc(0, 0, outerR * 0.65, 0, Math.PI * 2, true);
    brandShape.holes.push(brandHole);
    const brand = new THREE.ExtrudeGeometry(brandShape, { depth: h * 0.05, bevelEnabled: false });

    const inserts: { geo: THREE.BoxGeometry; angle: number }[] = [];
    for (let i = 0; i < insertCount; i++) {
      const geo = new THREE.BoxGeometry(iw, il, iw * 0.6);
      inserts.push({ geo, angle: (i / insertCount) * Math.PI * 2 });
    }

    return { bodyGeo: body, insertGeos: inserts, brandGeo: brand };
  }, [dims]);

  const outerR = ((dims.diameter || 63) / 2) * S;
  const h = (dims.height || 40) * S;

  return (
    <group>
      <mesh geometry={bodyGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, h / 2, 0]}>
        <meshStandardMaterial color={COLORS.body} metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={brandGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, h + 0.1, 0]}>
        <meshStandardMaterial color={COLORS.brand} metalness={0.3} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {insertGeos.map(({ geo, angle }, i) => {
        const x = Math.cos(angle) * (outerR - 1 * S);
        const z = Math.sin(angle) * (outerR - 1 * S);
        return (
          <mesh key={i} geometry={geo} position={[x, h * 0.85, z]} rotation={[0, -angle, 0]}>
            <meshStandardMaterial color={COLORS.insert} metalness={0.6} roughness={0.25} />
          </mesh>
        );
      })}
    </group>
  );
}
