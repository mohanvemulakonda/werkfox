import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const OUT = path.resolve('public/branding');

// Thick brush-stroke curved arrow pointing right — like hand-painted ink
const arrowRight = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="120" viewBox="0 0 300 120">
  <path d="M 15 70 Q 60 25, 130 30 Q 200 35, 250 55"
    stroke="#E03B12" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.85"/>
  <path d="M 15 70 Q 60 30, 130 33 Q 195 36, 245 52"
    stroke="#E03B12" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.4"/>
  <polygon points="240,40 270,55 242,65" fill="#E03B12" opacity="0.85"/>
</svg>`;

// Thick brush-stroke arrow curving right and down
const arrowRightDown = `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="200" viewBox="0 0 250 200">
  <path d="M 15 30 Q 80 10, 150 40 Q 210 65, 220 140"
    stroke="#E03B12" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.85"/>
  <path d="M 15 30 Q 80 15, 148 42 Q 205 63, 216 135"
    stroke="#E03B12" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.35"/>
  <polygon points="205,132 222,162 232,128" fill="#E03B12" opacity="0.85"/>
</svg>`;

// Thick brush-stroke arrow pointing down
const arrowDown = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="180" viewBox="0 0 100 180">
  <path d="M 50 10 Q 40 40, 45 70 Q 50 100, 48 140"
    stroke="#E03B12" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.85"/>
  <path d="M 50 10 Q 42 42, 46 72 Q 51 98, 49 135"
    stroke="#E03B12" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.35"/>
  <polygon points="34,132 50,165 62,132" fill="#E03B12" opacity="0.85"/>
</svg>`;

// Thick brush-stroke arrow curving right and up
const arrowRightUp = `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="200" viewBox="0 0 250 200">
  <path d="M 15 160 Q 70 175, 140 140 Q 200 110, 225 50"
    stroke="#E03B12" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.85"/>
  <path d="M 15 160 Q 70 172, 138 138 Q 198 108, 222 55"
    stroke="#E03B12" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.35"/>
  <polygon points="210,55 230,25 235,62" fill="#E03B12" opacity="0.85"/>
</svg>`;

fs.writeFileSync(path.join(OUT, 'arrow-right-down.svg'), arrowRightDown);
fs.writeFileSync(path.join(OUT, 'arrow-down.svg'), arrowDown);
fs.writeFileSync(path.join(OUT, 'arrow-right.svg'), arrowRight);
fs.writeFileSync(path.join(OUT, 'arrow-right-up.svg'), arrowRightUp);

console.log('Brush-stroke SVG arrows created!');

// Convert to PNG
for (const name of ['arrow-right-down', 'arrow-down', 'arrow-right', 'arrow-right-up']) {
  const svg = path.join(OUT, `${name}.svg`);
  const png = path.join(OUT, `${name}.png`);
  try {
    execSync(`qlmanage -t -s 600 -o /tmp "${svg}" 2>/dev/null && mv "/tmp/${name}.svg.png" "${png}"`);
    console.log(`Converted: ${name}.png`);
  } catch {
    console.log(`Failed: ${name}`);
  }
}
