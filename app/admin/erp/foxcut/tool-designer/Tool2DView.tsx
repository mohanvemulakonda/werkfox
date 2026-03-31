'use client';

// Inline formatNumber utility
function formatNumber(value: number, decimals = 2): string {
  if (Number.isInteger(value)) return value.toString();
  return Number(value.toFixed(decimals)).toString();
}

const C = {
  body: '#94A3B8',
  bodyStroke: '#475569',
  cutting: '#F59E0B',
  cutStroke: '#B45309',
  brand: '#E03B12',
  dim: '#E03B12',
  dimLine: '#64748B',
  text: '#1E293B',
  centerLine: '#CBD5E1',
  hatch: '#B0BEC5',
};

interface DimensionMap {
  [key: string]: number;
}

interface Tool2DViewProps {
  toolType: string;
  dimensions: DimensionMap;
}

export default function Tool2DView({ toolType, dimensions }: Tool2DViewProps) {
  const dm = dimensions;

  switch (toolType) {
    case 'drill-bit':
      return <DrillDrawing dm={dm} />;
    case 'flat-end-mill':
      return <EndMillDrawing dm={dm} />;
    case 'ball-nose-end-mill':
      return <BallNoseDrawing dm={dm} />;
    case 'boring-bar':
      return <BoringBarDrawing dm={dm} />;
    case 'face-mill':
      return <FaceMillDrawing dm={dm} />;
    case 'turning-insert':
      return <InsertDrawing dm={dm} />;
    case 'tap':
      return <TapDrawing dm={dm} />;
    default:
      return <EndMillDrawing dm={dm} />;
  }
}

// ---- Drill ----

function DrillDrawing({ dm }: { dm: DimensionMap }) {
  const D = dm.diameter || 10;
  const OL = dm.overall_length || 80;
  const FL = dm.flute_length || 30;
  const SD = dm.shank_diameter || D;
  const PA = dm.point_angle || 140;

  const W = 700, H = 320;
  const sc = Math.min((W - 160) / OL, (H - 140) / Math.max(D, SD) / 2.5);
  const cy = H / 2 - 10;
  const totalW = OL * sc;
  const startX = (W - totalW) / 2;
  const dr = (D / 2) * sc;
  const sr = (SD / 2) * sc;
  const flW = FL * sc;
  const shW = totalW - flW;
  const tipH = dr / Math.tan(((PA / 2) * Math.PI) / 180);

  return (
    <Wrap W={W} H={H}>
      <line x1={startX - 15} y1={cy} x2={startX + totalW + 15} y2={cy}
        stroke={C.centerLine} strokeWidth="0.6" strokeDasharray="12,4,3,4" />
      <rect x={startX + flW} y={cy - sr} width={shW} height={sr * 2}
        fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.2" />
      <Hatch x={startX + flW} y={cy - sr} w={shW} h={sr * 2} />
      <rect x={startX + flW + shW * 0.55} y={cy - sr} width={shW * 0.1} height={sr * 2}
        fill={C.brand} opacity="0.7" />
      <rect x={startX + tipH} y={cy - dr} width={flW - tipH} height={dr * 2}
        fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.2" />
      {Array.from({ length: Math.max(3, Math.floor(flW / 15)) }).map((_, i) => {
        const xOff = startX + tipH + (i + 0.5) * ((flW - tipH) / Math.max(3, Math.floor(flW / 15)));
        return <line key={i} x1={xOff} y1={cy - dr} x2={xOff + 8} y2={cy + dr}
          stroke={C.hatch} strokeWidth="0.8" opacity="0.5" />;
      })}
      <polygon
        points={`${startX + tipH},${cy - dr} ${startX},${cy} ${startX + tipH},${cy + dr}`}
        fill={C.cutting} stroke={C.cutStroke} strokeWidth="1.2" />
      {Math.abs(SD - D) > 0.3 && (
        <>
          <line x1={startX + flW} y1={cy - Math.max(dr, sr)} x2={startX + flW} y2={cy - Math.min(dr, sr)}
            stroke={C.bodyStroke} strokeWidth="1.2" />
          <line x1={startX + flW} y1={cy + Math.min(dr, sr)} x2={startX + flW} y2={cy + Math.max(dr, sr)}
            stroke={C.bodyStroke} strokeWidth="1.2" />
        </>
      )}
      <VDim x={startX + flW * 0.4} y1={cy - dr} y2={cy + dr} label={`\u2300${formatNumber(D)}`} side="left" />
      {Math.abs(SD - D) > 0.3 && (
        <VDim x={startX + flW + shW * 0.4} y1={cy - sr} y2={cy + sr} label={`\u2300${formatNumber(SD)}`} side="right" />
      )}
      <HDim y={cy + Math.max(dr, sr) + 22} x1={startX} x2={startX + flW} label={formatNumber(FL)} />
      <HDim y={cy + Math.max(dr, sr) + 42} x1={startX} x2={startX + totalW} label={formatNumber(OL)} />
      <text x={startX + tipH + 8} y={cy - dr - 8} fontSize="11" fill={C.dim} fontWeight="600">
        {formatNumber(PA)}&deg;
      </text>
    </Wrap>
  );
}

// ---- End Mill ----

function EndMillDrawing({ dm }: { dm: DimensionMap }) {
  const D = dm.diameter || 10;
  const OL = dm.overall_length || 70;
  const FL = dm.flute_length || 20;
  const SD = dm.shank_diameter || D;
  const CR = dm.corner_radius || 0;

  const W = 700, H = 320;
  const sc = Math.min((W - 160) / OL, (H - 140) / Math.max(D, SD) / 2.5);
  const cy = H / 2 - 10;
  const totalW = OL * sc;
  const startX = (W - totalW) / 2;
  const dr = (D / 2) * sc;
  const sr = (SD / 2) * sc;
  const flW = FL * sc;
  const shW = totalW - flW;

  return (
    <Wrap W={W} H={H}>
      <line x1={startX - 15} y1={cy} x2={startX + totalW + 15} y2={cy}
        stroke={C.centerLine} strokeWidth="0.6" strokeDasharray="12,4,3,4" />
      <rect x={startX + flW} y={cy - sr} width={shW} height={sr * 2}
        fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.2" />
      <Hatch x={startX + flW} y={cy - sr} w={shW} h={sr * 2} />
      <rect x={startX + flW + shW * 0.55} y={cy - sr} width={shW * 0.1} height={sr * 2}
        fill={C.brand} opacity="0.7" />
      <rect x={startX} y={cy - dr} width={flW} height={dr * 2}
        fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.2" />
      {Array.from({ length: Math.max(3, Math.floor(flW / 12)) }).map((_, i) => {
        const xOff = startX + (i + 0.5) * (flW / Math.max(3, Math.floor(flW / 12)));
        return <line key={i} x1={xOff} y1={cy - dr} x2={xOff + 6} y2={cy + dr}
          stroke={C.hatch} strokeWidth="0.8" opacity="0.5" />;
      })}
      <line x1={startX} y1={cy - dr} x2={startX} y2={cy + dr}
        stroke={C.cutStroke} strokeWidth="2.5" />
      {CR > 0 && (
        <>
          <circle cx={startX} cy={cy - dr} r={3} fill="none" stroke={C.dim} strokeWidth="0.8" />
          <circle cx={startX} cy={cy + dr} r={3} fill="none" stroke={C.dim} strokeWidth="0.8" />
        </>
      )}
      {Math.abs(SD - D) > 0.3 && (
        <>
          <line x1={startX + flW} y1={cy - Math.max(dr, sr)} x2={startX + flW} y2={cy - Math.min(dr, sr)}
            stroke={C.bodyStroke} strokeWidth="1.2" />
          <line x1={startX + flW} y1={cy + Math.min(dr, sr)} x2={startX + flW} y2={cy + Math.max(dr, sr)}
            stroke={C.bodyStroke} strokeWidth="1.2" />
        </>
      )}
      <VDim x={startX + flW * 0.35} y1={cy - dr} y2={cy + dr} label={`\u2300${formatNumber(D)}`} side="left" />
      {Math.abs(SD - D) > 0.3 && (
        <VDim x={startX + flW + shW * 0.4} y1={cy - sr} y2={cy + sr} label={`\u2300${formatNumber(SD)}`} side="right" />
      )}
      <HDim y={cy + Math.max(dr, sr) + 22} x1={startX} x2={startX + flW} label={formatNumber(FL)} />
      <HDim y={cy + Math.max(dr, sr) + 42} x1={startX} x2={startX + totalW} label={formatNumber(OL)} />
      {CR > 0 && (
        <text x={startX - 8} y={cy - dr - 10} fontSize="10" fill={C.dim} textAnchor="end" fontWeight="500">
          R{formatNumber(CR)}
        </text>
      )}
    </Wrap>
  );
}

// ---- Ball Nose ----

function BallNoseDrawing({ dm }: { dm: DimensionMap }) {
  const D = dm.diameter || 8;
  const OL = dm.overall_length || 70;
  const FL = dm.flute_length || 8;
  const SD = dm.shank_diameter || D;
  const BR = dm.corner_radius || D / 2;

  const W = 700, H = 320;
  const sc = Math.min((W - 160) / OL, (H - 140) / Math.max(D, SD) / 2.5);
  const cy = H / 2 - 10;
  const totalW = OL * sc;
  const startX = (W - totalW) / 2;
  const dr = (D / 2) * sc;
  const sr = (SD / 2) * sc;
  const flW = FL * sc;
  const shW = totalW - flW;
  const ballR = dr;

  return (
    <Wrap W={W} H={H}>
      <line x1={startX - 15} y1={cy} x2={startX + totalW + 15} y2={cy}
        stroke={C.centerLine} strokeWidth="0.6" strokeDasharray="12,4,3,4" />
      <rect x={startX + flW} y={cy - sr} width={shW} height={sr * 2}
        fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.2" />
      <Hatch x={startX + flW} y={cy - sr} w={shW} h={sr * 2} />
      <rect x={startX + flW + shW * 0.55} y={cy - sr} width={shW * 0.1} height={sr * 2}
        fill={C.brand} opacity="0.7" />
      <rect x={startX + ballR} y={cy - dr} width={Math.max(0, flW - ballR)} height={dr * 2}
        fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.2" />
      <path
        d={`M ${startX + ballR} ${cy - dr} A ${ballR} ${ballR} 0 0 0 ${startX + ballR} ${cy + dr}`}
        fill={C.cutting} stroke={C.cutStroke} strokeWidth="1.5" />
      <VDim x={startX + flW * 0.5 + ballR} y1={cy - dr} y2={cy + dr} label={`\u2300${formatNumber(D)}`} side="left" />
      {Math.abs(SD - D) > 0.3 && (
        <VDim x={startX + flW + shW * 0.4} y1={cy - sr} y2={cy + sr} label={`\u2300${formatNumber(SD)}`} side="right" />
      )}
      <HDim y={cy + Math.max(dr, sr) + 22} x1={startX} x2={startX + flW} label={formatNumber(FL)} />
      <HDim y={cy + Math.max(dr, sr) + 42} x1={startX} x2={startX + totalW} label={formatNumber(OL)} />
      <text x={startX + ballR / 2 - 8} y={cy - dr - 8} fontSize="10" fill={C.dim} fontWeight="500">
        R{formatNumber(BR)}
      </text>
    </Wrap>
  );
}

// ---- Tap ----

function TapDrawing({ dm }: { dm: DimensionMap }) {
  const D = dm.diameter || 10;
  const OL = dm.overall_length || 80;
  const FL = dm.flute_length || 25;
  const SD = dm.shank_diameter || D;

  const W = 700, H = 320;
  const sc = Math.min((W - 160) / OL, (H - 140) / Math.max(D, SD) / 2.5);
  const cy = H / 2 - 10;
  const totalW = OL * sc;
  const startX = (W - totalW) / 2;
  const dr = (D / 2) * sc;
  const sr = (SD / 2) * sc;
  const flW = FL * sc;
  const shW = totalW - flW;

  return (
    <Wrap W={W} H={H}>
      <line x1={startX - 15} y1={cy} x2={startX + totalW + 15} y2={cy}
        stroke={C.centerLine} strokeWidth="0.6" strokeDasharray="12,4,3,4" />
      <rect x={startX + flW} y={cy - sr} width={shW} height={sr * 2}
        fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.2" />
      <Hatch x={startX + flW} y={cy - sr} w={shW} h={sr * 2} />
      <rect x={startX} y={cy - dr} width={flW} height={dr * 2}
        fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.2" />
      {Array.from({ length: Math.max(4, Math.floor(flW / 6)) }).map((_, i) => {
        const xOff = startX + (i + 0.5) * (flW / Math.max(4, Math.floor(flW / 6)));
        return <line key={i} x1={xOff} y1={cy - dr - 2} x2={xOff} y2={cy + dr + 2}
          stroke={C.bodyStroke} strokeWidth="0.6" opacity="0.4" />;
      })}
      <polygon
        points={`${startX},${cy - dr * 0.6} ${startX - dr * 0.4},${cy} ${startX},${cy + dr * 0.6}`}
        fill={C.cutting} stroke={C.cutStroke} strokeWidth="1" />
      <VDim x={startX + flW * 0.4} y1={cy - dr} y2={cy + dr} label={`\u2300${formatNumber(D)}`} side="left" />
      <HDim y={cy + Math.max(dr, sr) + 22} x1={startX} x2={startX + flW} label={formatNumber(FL)} />
      <HDim y={cy + Math.max(dr, sr) + 42} x1={startX} x2={startX + totalW} label={formatNumber(OL)} />
    </Wrap>
  );
}

// ---- Insert (Top View) ----

function InsertDrawing({ dm }: { dm: DimensionMap }) {
  const IC = dm.ic_diameter || dm.diameter || 12.7;
  const T = dm.thickness || 4.76;
  const NR = dm.nose_radius || dm.corner_radius || 0.8;
  const W = 500, H = 340;

  const sc = Math.min((W - 120) / IC, (H - 120) / IC) * 0.65;
  const cx = W / 2, cy = H / 2 - 10;
  const r = (IC / 2) * sc;

  return (
    <Wrap W={W} H={H}>
      <text x={cx} y={25} fontSize="11" fill={C.text} textAnchor="middle" fontWeight="500" opacity="0.6">TOP VIEW</text>
      <polygon points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
        fill={C.cutting} stroke={C.cutStroke} strokeWidth="2" opacity="0.85" />
      <polygon points={`${cx},${cy - r * 0.75} ${cx + r * 0.75},${cy} ${cx},${cy + r * 0.75} ${cx - r * 0.75},${cy}`}
        fill="none" stroke={C.cutStroke} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.4" />
      <circle cx={cx} cy={cy} r={r * 0.18} fill="#fff" stroke={C.bodyStroke} strokeWidth="1.5" />
      {([[0, -1], [1, 0], [0, 1], [-1, 0]] as [number, number][]).map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx * r} cy={cy + dy * r} r={4}
          fill="none" stroke={C.dim} strokeWidth="0.8" strokeDasharray="2,2" />
      ))}
      <HDim y={cy + r + 30} x1={cx - r} x2={cx + r} label={`IC ${formatNumber(IC)}`} />
      <text x={cx} y={cy + r + 55} fontSize="11" fill={C.text} textAnchor="middle" fontWeight="500">
        T = {formatNumber(T)} mm
      </text>
      <text x={cx} y={cy + r + 72} fontSize="11" fill={C.text} textAnchor="middle" fontWeight="500">
        r&epsilon; = {formatNumber(NR)} mm
      </text>
    </Wrap>
  );
}

// ---- Face Mill (Top View) ----

function FaceMillDrawing({ dm }: { dm: DimensionMap }) {
  const BD = dm.body_diameter || dm.diameter || 63;
  const BORE = dm.bore_diameter || 22;
  const IC = dm.insert_count || 6;
  const W = 500, H = 340;

  const sc = Math.min((W - 100) / BD, (H - 100) / BD) * 0.7;
  const cx = W / 2, cy = H / 2 - 10;
  const r = (BD / 2) * sc;
  const br = (BORE / 2) * sc;

  return (
    <Wrap W={W} H={H}>
      <text x={cx} y={25} fontSize="11" fill={C.text} textAnchor="middle" fontWeight="500" opacity="0.6">TOP VIEW</text>
      <circle cx={cx} cy={cy} r={r} fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r * 0.7} fill="none" stroke={C.brand} strokeWidth="2" opacity="0.5" />
      <circle cx={cx} cy={cy} r={br} fill="#fff" stroke={C.bodyStroke} strokeWidth="1.5" />
      <rect x={cx - br * 0.3} y={cy - br - 1} width={br * 0.6} height={br * 0.4} fill={C.bodyStroke} opacity="0.5" />
      {Array.from({ length: IC }).map((_, i) => {
        const angle = (i / IC) * Math.PI * 2 - Math.PI / 2;
        const ix = cx + Math.cos(angle) * (r - 6);
        const iy = cy + Math.sin(angle) * (r - 6);
        return <rect key={i} x={ix - 5} y={iy - 3.5} width={10} height={7} rx="1"
          fill={C.cutting} stroke={C.cutStroke} strokeWidth="0.8"
          transform={`rotate(${(angle * 180 / Math.PI) + 90}, ${ix}, ${iy})`} />;
      })}
      <HDim y={cy + r + 25} x1={cx - r} x2={cx + r} label={`\u2300${formatNumber(BD)}`} />
      <text x={cx} y={cy + 4} fontSize="10" fill={C.dim} textAnchor="middle" fontWeight="600">
        {'\u2300'}{formatNumber(BORE)}
      </text>
    </Wrap>
  );
}

// ---- Boring Bar ----

function BoringBarDrawing({ dm }: { dm: DimensionMap }) {
  const SD = dm.shank_diameter || dm.diameter || 20;
  const OL = dm.overall_length || 150;
  const W = 700, H = 280;
  const margin = 60;

  const scaleX = (W - margin * 2) / OL;
  const scaleY = (H - margin * 2) / (SD * 2.5);
  const sc = Math.min(scaleX, scaleY);
  const cy = H / 2 - 10;
  const totalW = OL * sc;
  const startX = (W - totalW) / 2;
  const sr = (SD / 2) * sc;

  return (
    <Wrap W={W} H={H}>
      <line x1={startX - 10} y1={cy} x2={startX + totalW + 10} y2={cy}
        stroke={C.centerLine} strokeWidth="0.6" strokeDasharray="12,4,3,4" />
      <rect x={startX} y={cy - sr} width={totalW} height={sr * 2}
        fill="#CFD8DC" stroke={C.bodyStroke} strokeWidth="1.2" rx="1" />
      <Hatch x={startX} y={cy - sr} w={totalW * 0.85} h={sr * 2} />
      <rect x={startX + totalW * 0.3} y={cy - sr} width={totalW * 0.07} height={sr * 2}
        fill={C.brand} opacity="0.7" />
      <polygon
        points={`${startX + totalW - sr * 0.3},${cy - sr} ${startX + totalW + 2},${cy - sr * 0.2} ${startX + totalW + 2},${cy + sr * 0.2} ${startX + totalW - sr * 0.3},${cy + sr}`}
        fill="#546E7A" stroke={C.bodyStroke} strokeWidth="1" />
      <rect x={startX + totalW - sr * 0.1} y={cy - sr * 0.8} width={sr * 0.6} height={sr * 0.5}
        fill={C.cutting} stroke={C.cutStroke} strokeWidth="1" rx="0.5"
        transform={`rotate(-8, ${startX + totalW}, ${cy - sr * 0.5})`} />
      <VDim x={startX + totalW * 0.5} y1={cy - sr} y2={cy + sr} label={`\u2300${formatNumber(SD)}`} side="left" />
      <HDim y={cy + sr + 25} x1={startX} x2={startX + totalW} label={formatNumber(OL)} />
    </Wrap>
  );
}

// ---- Shared Components ----

function Wrap({ W, H, children }: { W: number; H: number; children: React.ReactNode }) {
  return (
    <div className="h-96 bg-white border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ maxHeight: '22rem' }}>
        <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
        {children}
        <rect x={W - 170} y={H - 30} width={162} height={22} fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />
        <text x={W - 89} y={H - 15} fontSize="8" fill={C.brand} textAnchor="middle" fontWeight="700" letterSpacing="1" fontFamily="Montserrat, sans-serif">
          WERKFOX
        </text>
      </svg>
    </div>
  );
}

function Hatch({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const spacing = 6;
  const lines: React.ReactElement[] = [];
  for (let i = 0; i < (w + h) / spacing; i++) {
    const sx = x + i * spacing;
    lines.push(
      <line key={i} x1={Math.max(sx, x)} y1={Math.max(y, y + (sx - x) - w + h)}
        x2={Math.min(sx + h, x + w)} y2={Math.min(y + h, y + (sx - x) + h)}
        stroke={C.hatch} strokeWidth="0.3" opacity="0.3" />
    );
  }
  return (
    <g clipPath={`url(#clip-${x}-${y})`}>
      <defs><clipPath id={`clip-${x}-${y}`}><rect x={x} y={y} width={w} height={h} /></clipPath></defs>
      {lines}
    </g>
  );
}

function HDim({ y, x1, x2, label }: { y: number; x1: number; x2: number; label: string }) {
  const mid = (x1 + x2) / 2;
  const a = 4;
  return (
    <g>
      <line x1={x1} y1={y - 10} x2={x1} y2={y + 4} stroke={C.dimLine} strokeWidth="0.5" />
      <line x1={x2} y1={y - 10} x2={x2} y2={y + 4} stroke={C.dimLine} strokeWidth="0.5" />
      <line x1={x1 + a} y1={y} x2={x2 - a} y2={y} stroke={C.dimLine} strokeWidth="0.7" />
      <polygon points={`${x1},${y} ${x1 + a + 1},${y - a / 2} ${x1 + a + 1},${y + a / 2}`} fill={C.dimLine} />
      <polygon points={`${x2},${y} ${x2 - a - 1},${y - a / 2} ${x2 - a - 1},${y + a / 2}`} fill={C.dimLine} />
      <text x={mid} y={y - 4} fontSize="11" fill={C.dim} textAnchor="middle" fontWeight="600">{label}</text>
    </g>
  );
}

function VDim({ x, y1, y2, label, side = 'left' }: { x: number; y1: number; y2: number; label: string; side?: 'left' | 'right' }) {
  const mid = (y1 + y2) / 2;
  const a = 4;
  const offset = side === 'left' ? -28 : 28;
  const textAnchor = side === 'left' ? 'end' : 'start';
  const textX = x + offset + (side === 'left' ? -6 : 6);
  return (
    <g>
      <line x1={x - 4} y1={y1} x2={x + offset + (side === 'left' ? -4 : 4)} y2={y1} stroke={C.dimLine} strokeWidth="0.5" />
      <line x1={x - 4} y1={y2} x2={x + offset + (side === 'left' ? -4 : 4)} y2={y2} stroke={C.dimLine} strokeWidth="0.5" />
      <line x1={x + offset} y1={y1 + a} x2={x + offset} y2={y2 - a} stroke={C.dimLine} strokeWidth="0.7" />
      <polygon points={`${x + offset},${y1} ${x + offset - a / 2},${y1 + a + 1} ${x + offset + a / 2},${y1 + a + 1}`} fill={C.dimLine} />
      <polygon points={`${x + offset},${y2} ${x + offset - a / 2},${y2 - a - 1} ${x + offset + a / 2},${y2 - a - 1}`} fill={C.dimLine} />
      <text x={textX} y={mid + 4} fontSize="11" fill={C.dim} textAnchor={textAnchor} fontWeight="600">{label}</text>
    </g>
  );
}
