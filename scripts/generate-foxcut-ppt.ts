import PptxGenJS from 'pptxgenjs';

const BRAND = { red: '#E03B12', dark: '#1A1A1A', gray: '#4B5563', lightGray: '#F3F4F6', white: '#FFFFFF', amber: '#F59E0B', green: '#059669' };

function addTitleSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.dark };
  slide.addText('FoxCut', { x: 0.8, y: 1.2, w: 8.4, h: 1.2, fontSize: 60, fontFace: 'Arial', bold: true, color: BRAND.red });
  slide.addText('Panel Cutting Optimizer\nfor Modular Kitchens & Cabinetry', { x: 0.8, y: 2.6, w: 8.4, h: 1.0, fontSize: 22, fontFace: 'Arial', color: BRAND.white, lineSpacingMultiple: 1.3 });
  slide.addText('Minimize Waste  •  Maximize Profit  •  Powered by WerkFox', { x: 0.8, y: 3.9, w: 8.4, h: 0.4, fontSize: 13, fontFace: 'Arial', color: BRAND.gray });
}

function addProblemSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  slide.addText('The Waste Problem', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 28, fontFace: 'Arial', bold: true, color: BRAND.dark });

  slide.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 1.3, w: 4.2, h: 2.8, fill: { color: '#FEF2F2' }, rectRadius: 0.15 });
  slide.addText('Without Optimization', { x: 0.7, y: 1.4, w: 3.8, h: 0.4, fontSize: 16, fontFace: 'Arial', bold: true, color: '#DC2626' });
  slide.addText('• 15-30% material wasted per job\n• Manual layout on paper/whiteboard\n• Inconsistent cutting — rework\n• No tracking of offcuts/remnants\n• Guesswork on material ordering\n• ₹5,000-15,000 wasted per kitchen', { x: 0.7, y: 1.9, w: 3.8, h: 2.0, fontSize: 12, fontFace: 'Arial', color: '#991B1B', lineSpacingMultiple: 1.5 });

  slide.addShape(pptx.ShapeType.roundRect, { x: 5.3, y: 1.3, w: 4.2, h: 2.8, fill: { color: '#F0FDF4' }, rectRadius: 0.15 });
  slide.addText('With FoxCut', { x: 5.5, y: 1.4, w: 3.8, h: 0.4, fontSize: 16, fontFace: 'Arial', bold: true, color: BRAND.green });
  slide.addText('• 3-8% waste — optimized layouts\n• Automatic guillotine-cut patterns\n• Print-ready cutting diagrams\n• Remnant tracking & reuse\n• Exact sheet count for ordering\n• Save ₹3,000-12,000 per kitchen', { x: 5.5, y: 1.9, w: 3.8, h: 2.0, fontSize: 12, fontFace: 'Arial', color: '#166534', lineSpacingMultiple: 1.5 });

  slide.addText('A ₹50 Cr/year kitchen manufacturer wastes ₹75L-1.5Cr in sheet material annually.', { x: 0.8, y: 4.4, w: 8.4, h: 0.4, fontSize: 13, fontFace: 'Arial', bold: true, color: BRAND.red, align: 'center' });
}

function addHowItWorksSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.dark };
  slide.addText('How FoxCut Works', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 28, fontFace: 'Arial', bold: true, color: BRAND.white });

  const steps = [
    { num: '01', title: 'Select Material', desc: 'Choose from library:\nBWR Plywood, HDHMR, MDF,\nPre-lam Particle Board\n+ set sheet size & thickness' },
    { num: '02', title: 'Add Parts', desc: 'Enter dimensions or pick\nkitchen module presets:\nBase units, wall units, drawers\n+ set grain & edge banding' },
    { num: '03', title: 'Optimize', desc: 'One-click optimization.\nGuillotine algorithm tries\n4 strategies, picks best.\nAccounts for kerf & trim.' },
    { num: '04', title: 'Cut & Save', desc: 'Print cutting diagrams\nfor the workshop floor.\nTrack remnants, calculate\ncost, save for history.' },
  ];

  steps.forEach((s, i) => {
    const x = 0.3 + i * 2.4;
    slide.addShape(pptx.ShapeType.roundRect, { x, y: 1.3, w: 2.2, h: 3.2, fill: { color: '2D2D2D' }, rectRadius: 0.15 });
    slide.addText(s.num, { x, y: 1.4, w: 2.2, h: 0.5, fontSize: 28, fontFace: 'Arial', bold: true, color: BRAND.red, align: 'center' });
    slide.addText(s.title, { x, y: 1.95, w: 2.2, h: 0.4, fontSize: 14, fontFace: 'Arial', bold: true, color: BRAND.white, align: 'center' });
    slide.addText(s.desc, { x: x + 0.15, y: 2.5, w: 1.9, h: 1.8, fontSize: 11, fontFace: 'Arial', color: '#9CA3AF', align: 'center', lineSpacingMultiple: 1.4 });
  });
}

function addFeaturesSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  slide.addText('Key Features', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 28, fontFace: 'Arial', bold: true, color: BRAND.dark });

  const features = [
    ['Guillotine Optimization', 'Edge-to-edge cuts only — exactly\nhow panel saws work in real shops'],
    ['Edge Banding', 'Per-edge banding selection with\nauto dimension adjustment'],
    ['Grain Direction', 'Lock horizontal/vertical grain —\npieces won\'t rotate when optimizing'],
    ['Material Library', '9 Indian market materials with\npricing, thicknesses, sheet sizes'],
    ['Kitchen Module Presets', 'One-click: Base 600, Wall 600,\nTall unit, Drawer, Shutters'],
    ['Remnant Tracking', 'Identify usable offcuts for\nfuture jobs — reduce waste further'],
    ['Cost Calculator', 'Sheet cost + edge banding +\nwaste cost per job'],
    ['CSV Import/Export', 'Bulk import parts from Excel.\nExport for shop floor printing.'],
    ['Visual Cut Diagrams', 'Color-coded SVG layouts with\ncut sequences, labels, dimensions'],
  ];

  features.forEach((f, i) => {
    const x = 0.3 + (i % 3) * 3.2;
    const y = 1.2 + Math.floor(i / 3) * 1.4;
    slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 3.0, h: 1.15, fill: { color: BRAND.lightGray }, rectRadius: 0.08 });
    slide.addText(f[0], { x: x + 0.15, y: y + 0.08, w: 2.7, h: 0.35, fontSize: 12, fontFace: 'Arial', bold: true, color: BRAND.dark });
    slide.addText(f[1], { x: x + 0.15, y: y + 0.45, w: 2.7, h: 0.6, fontSize: 10, fontFace: 'Arial', color: BRAND.gray, lineSpacingMultiple: 1.3 });
  });
}

function addMaterialsSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  slide.addText('Supported Materials', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 28, fontFace: 'Arial', bold: true, color: BRAND.dark });

  const tableRows: PptxGenJS.TableRow[] = [
    [
      { text: 'Material', options: { bold: true, color: BRAND.white, fill: { color: BRAND.dark }, fontSize: 11 } },
      { text: 'Standard Size', options: { bold: true, color: BRAND.white, fill: { color: BRAND.dark }, fontSize: 11 } },
      { text: 'Thicknesses', options: { bold: true, color: BRAND.white, fill: { color: BRAND.dark }, fontSize: 11 } },
      { text: 'Price Range', options: { bold: true, color: BRAND.white, fill: { color: BRAND.dark }, fontSize: 11 } },
    ],
    ...[
      ['BWR Plywood', '2440 × 1220 (8×4 ft)', '6, 9, 12, 18, 25mm', '₹80-150/sqft'],
      ['BWP Marine Plywood', '2440 × 1220 (8×4 ft)', '6, 9, 12, 18, 25mm', '₹120-200/sqft'],
      ['HDHMR', '2440 × 1220 (8×4 ft)', '8, 12, 16, 18, 25mm', '₹60-100/sqft'],
      ['MDF', '2440 × 1220 (8×4 ft)', '6, 9, 12, 16, 18, 25mm', '₹30-60/sqft'],
      ['Pre-Laminated MDF', '2440 × 1220 (8×4 ft)', '8, 12, 18mm', '₹50-90/sqft'],
      ['Pre-Lam Particle Board', '2440 × 1220 (8×4 ft)', '8, 12, 16, 18, 25mm', '₹25-50/sqft'],
      ['Acrylic Sheet', '2440 × 1220 (8×4 ft)', '3, 4, 6, 8mm', '₹150-400/sqft'],
      ['Laminate (HPL)', '2440 × 1220 (8×4 ft)', '0.8, 1, 1.5mm', '₹15-40/sqft'],
    ].map(row => row.map(cell => ({ text: cell, options: { fontSize: 10, color: BRAND.dark } }))),
  ];

  slide.addTable(tableRows, { x: 0.5, y: 1.1, w: 9.0, colW: [2.2, 2.2, 2.4, 2.2], border: { color: '#D1D5DB', pt: 0.5 }, rowH: 0.4 });
}

function addROISlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.dark };
  slide.addText('ROI — Pays for Itself in Week 1', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 26, fontFace: 'Arial', bold: true, color: BRAND.white });

  const rows = [
    ['Metric', 'Without FoxCut', 'With FoxCut'],
    ['Material utilization', '70-85%', '92-97%'],
    ['Waste per kitchen', '₹5,000-15,000', '₹800-2,500'],
    ['Time to plan cuts', '30-60 min', '2 min'],
    ['Remnant reuse', 'None (thrown away)', 'Tracked & reused'],
    ['Annual savings (100 kitchens)', '—', '₹4-12 Lakhs'],
  ];

  const tableRows: PptxGenJS.TableRow[] = rows.map((row, i) => row.map(cell => ({
    text: cell,
    options: {
      fontSize: i === 0 ? 12 : 11,
      bold: i === 0,
      color: i === 0 ? BRAND.white : (i === rows.length - 1 ? BRAND.red : '#D1D5DB'),
      fill: { color: i === 0 ? BRAND.red : (i % 2 === 0 ? '2D2D2D' : BRAND.dark) },
      align: 'center' as const,
    },
  })));

  slide.addTable(tableRows, { x: 0.5, y: 1.2, w: 9.0, colW: [3.0, 3.0, 3.0], border: { color: '3D3D3D', pt: 0.5 }, rowH: 0.55 });
}

function addTargetSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  slide.addText('Who Is FoxCut For?', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 28, fontFace: 'Arial', bold: true, color: BRAND.dark });

  const targets = [
    { title: 'Modular Kitchen Manufacturers', desc: 'Small & mid-size kitchen factories doing 10-200 kitchens/month. Currently using MaxCut desktop or manual methods.' },
    { title: 'Cabinet & Furniture Makers', desc: 'Custom furniture shops cutting plywood, MDF, particle board for wardrobes, TV units, office furniture.' },
    { title: 'Interior Design Firms', desc: 'Firms managing multiple projects — need quick material estimates, cutting plans, and cost calculations.' },
    { title: 'Sheet Material Dealers', desc: 'Dealers offering "cut-to-size" services — optimize cuts for customers, reduce waste, increase margins.' },
  ];

  targets.forEach((t, i) => {
    const y = 1.2 + i * 1.05;
    slide.addShape(pptx.ShapeType.roundRect, { x: 0.5, y, w: 9.0, h: 0.85, fill: { color: i % 2 === 0 ? BRAND.lightGray : BRAND.white }, rectRadius: 0.08, line: { color: '#E5E7EB', width: 0.5 } });
    slide.addText(t.title, { x: 0.7, y: y + 0.05, w: 3.5, h: 0.35, fontSize: 13, fontFace: 'Arial', bold: true, color: BRAND.dark });
    slide.addText(t.desc, { x: 0.7, y: y + 0.4, w: 8.6, h: 0.35, fontSize: 11, fontFace: 'Arial', color: BRAND.gray });
  });
}

function addCTASlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.dark };
  slide.addText('Stop Wasting Material.\nStart Optimizing.', { x: 0.8, y: 1.2, w: 8.4, h: 1.4, fontSize: 36, fontFace: 'Arial', bold: true, color: BRAND.white, lineSpacingMultiple: 1.2 });
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 3.0, w: 3.2, h: 0.6, fill: { color: BRAND.red }, rectRadius: 0.08 });
  slide.addText('Try FoxCut Free →', { x: 0.8, y: 3.0, w: 3.2, h: 0.6, fontSize: 16, fontFace: 'Arial', bold: true, color: BRAND.white, align: 'center' });
  slide.addText('www.werkfox.com/foxcut', { x: 0.8, y: 3.8, w: 8.4, h: 0.4, fontSize: 14, fontFace: 'Arial', color: BRAND.gray });
  slide.addText('Part of the WerkFox Manufacturing Platform', { x: 0.8, y: 4.3, w: 8.4, h: 0.4, fontSize: 12, fontFace: 'Arial', color: '#6B7280' });
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'WerkFox';
  pptx.title = 'FoxCut - Panel Cutting Optimizer';

  addTitleSlide(pptx);
  addProblemSlide(pptx);
  addHowItWorksSlide(pptx);
  addFeaturesSlide(pptx);
  addMaterialsSlide(pptx);
  addROISlide(pptx);
  addTargetSlide(pptx);
  addCTASlide(pptx);

  const outPath = 'public/branding/FoxCut-Pitch.pptx';
  await pptx.writeFile({ fileName: outPath });
  console.log(`✅ FoxCut PPT saved to ${outPath}`);
}

main().catch(console.error);
