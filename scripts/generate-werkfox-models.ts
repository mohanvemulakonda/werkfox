import PptxGenJS from 'pptxgenjs';
import path from 'path';

const LOGO = path.resolve('public/logo.png');
const W = 13.33;
const H = 7.5;

function modelA(pptx: PptxGenJS) {
  // MODEL A — "Clean & Centered" — everything vertically centered, red accent line, no URL
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  // Watermark — right side bleed
  slide.addImage({ path: LOGO, x: W - 11 * 0.6, y: (H - 11) / 2, w: 11, h: 11, transparency: 90 });

  // Logo
  const logoSize = 2.4;
  slide.addImage({ path: LOGO, x: (W - logoSize) / 2, y: 1.4, w: logoSize, h: logoSize });

  // Wordmark
  slide.addText([
    { text: 'Werk', options: { fontSize: 48, fontFace: 'Montserrat', bold: true, color: '1A1A1A', charSpacing: 4 } },
    { text: 'Fox', options: { fontSize: 58, fontFace: 'Caveat', bold: true, color: 'E03B12' } },
  ], { x: 0, y: 3.9, w: W, h: 0.9, align: 'center' });

  // Red accent line
  slide.addShape(pptx.ShapeType.rect, { x: (W - 1.2) / 2, y: 4.85, w: 1.2, h: 0.03, fill: { color: 'E03B12' } });

  // Tagline — lighter weight
  slide.addText('Manufacturing ERP for the Modern Factory', {
    x: 0, y: 5.0, w: W, h: 0.5, fontSize: 16, fontFace: 'Montserrat', color: '9CA3AF', align: 'center',
  });

  // Footer — logo + year
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
  slide.addText('2026', { x: 0.4, y: H - 0.6, w: 1.5, h: 0.3, fontSize: 10, fontFace: 'Montserrat', color: 'D1D5DB' });

  // Label
  slide.addText('MODEL A — Clean & Centered', { x: 0, y: 0.1, w: W, h: 0.3, fontSize: 10, fontFace: 'Montserrat', color: 'D1D5DB', align: 'center' });
}

function modelB(pptx: PptxGenJS) {
  // MODEL B — "Left-aligned Bold" — content left, watermark right, strong hierarchy
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  // Watermark — right side, larger
  slide.addImage({ path: LOGO, x: W - 11 * 0.55, y: (H - 12) / 2, w: 12, h: 12, transparency: 92 });

  // Logo top-left
  slide.addImage({ path: LOGO, x: 1.0, y: 1.0, w: 2.0, h: 2.0 });

  // Wordmark — left aligned
  slide.addText([
    { text: 'Werk', options: { fontSize: 54, fontFace: 'Montserrat', bold: true, color: '1A1A1A', charSpacing: 4 } },
    { text: 'Fox', options: { fontSize: 64, fontFace: 'Caveat', bold: true, color: 'E03B12' } },
  ], { x: 1.0, y: 3.2, w: 8, h: 1.0, align: 'left' });

  // Red accent line — left aligned
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 4.3, w: 0.8, h: 0.04, fill: { color: 'E03B12' } });

  // Tagline
  slide.addText('Manufacturing ERP\nfor the Modern Factory', {
    x: 1.0, y: 4.5, w: 6, h: 0.9, fontSize: 20, fontFace: 'Montserrat', color: '6B7280', align: 'left', lineSpacingMultiple: 1.3,
  });

  // URL bottom-left
  slide.addText('www.werkfox.com', {
    x: 1.0, y: H - 0.7, w: 4, h: 0.35, fontSize: 12, fontFace: 'Montserrat', color: 'E03B12', align: 'left',
  });

  // Footer logo bottom-right
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });

  // Label
  slide.addText('MODEL B — Left-aligned Bold', { x: 0, y: 0.1, w: W, h: 0.3, fontSize: 10, fontFace: 'Montserrat', color: 'D1D5DB', align: 'center' });
}

function modelC(pptx: PptxGenJS) {
  // MODEL C — "Minimal Premium" — big logo, minimal text, lots of whitespace
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  // Watermark — subtle, centered behind
  slide.addImage({ path: LOGO, x: (W - 8) / 2, y: (H - 8) / 2, w: 8, h: 8, transparency: 94 });

  // Large centered logo
  const logoSize = 3.2;
  slide.addImage({ path: LOGO, x: (W - logoSize) / 2, y: 1.2, w: logoSize, h: logoSize });

  // Wordmark
  slide.addText([
    { text: 'Werk', options: { fontSize: 52, fontFace: 'Montserrat', bold: true, color: '1A1A1A', charSpacing: 5 } },
    { text: 'Fox', options: { fontSize: 62, fontFace: 'Caveat', bold: true, color: 'E03B12' } },
  ], { x: 0, y: 4.5, w: W, h: 1.0, align: 'center' });

  // Tagline — very subtle
  slide.addText('Manufacturing ERP for the Modern Factory', {
    x: 0, y: 5.5, w: W, h: 0.45, fontSize: 14, fontFace: 'Montserrat', color: 'B0B8C4', align: 'center',
  });

  // Thin top accent bar
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.06, fill: { color: 'E03B12' } });

  // Thin bottom accent bar
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: H - 0.06, w: W, h: 0.06, fill: { color: 'E03B12' } });

  // Footer logo center-bottom
  slide.addImage({ path: LOGO, x: (W - 0.3) / 2, y: H - 0.55, w: 0.3, h: 0.3 });

  // Label
  slide.addText('MODEL C — Minimal Premium', { x: 0, y: 0.15, w: W, h: 0.3, fontSize: 10, fontFace: 'Montserrat', color: 'D1D5DB', align: 'center' });
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'WerkFox';
  pptx.title = 'WerkFox - Slide 1 Models';

  modelA(pptx);
  modelB(pptx);
  modelC(pptx);

  const outPath = 'public/branding/WerkFox-Slide1-Models.pptx';
  await pptx.writeFile({ fileName: outPath });
  console.log(`Done: ${outPath}`);
}

main().catch(console.error);
