import PptxGenJS from 'pptxgenjs';

const BRAND = { red: '#E03B12', dark: '#1A1A1A', gray: '#4B5563', lightGray: '#F3F4F6', white: '#FFFFFF', amber: '#F59E0B', blue: '#2563EB' };

function addTitleSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.dark };
  slide.addText('FoxFrame', { x: 0.8, y: 1.2, w: 8.4, h: 1.2, fontSize: 60, fontFace: 'Arial', bold: true, color: BRAND.amber });
  slide.addText('Window & Door Manufacturing\nOptimization Platform', { x: 0.8, y: 2.6, w: 8.4, h: 1.0, fontSize: 22, fontFace: 'Arial', color: BRAND.white, lineSpacingMultiple: 1.3 });
  slide.addText('Profile Cutting  •  Glass Optimization  •  BOM Generation  •  Powered by WerkFox', { x: 0.8, y: 3.9, w: 8.4, h: 0.4, fontSize: 12, fontFace: 'Arial', color: BRAND.gray });
}

function addMarketSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  slide.addText('The Window Industry Problem', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 28, fontFace: 'Arial', bold: true, color: BRAND.dark });

  slide.addText('Indian window & door market: ₹45,000 Cr+ and growing 12% annually.\n50,000+ fabricators, most using manual methods or expensive desktop software.', { x: 0.8, y: 1.1, w: 8.4, h: 0.7, fontSize: 13, fontFace: 'Arial', color: BRAND.gray, lineSpacingMultiple: 1.4 });

  const problems = [
    { title: 'Expensive Software', desc: 'LogiKal costs ₹5-15L upfront.\nFeneVision is ₹15-75L+.\nSmall fabricators can\'t afford it.' },
    { title: 'Desktop Lock-in', desc: 'Old software runs on 1 PC.\nNo cloud, no mobile access.\nData stuck on that machine.' },
    { title: 'Material Waste', desc: '8-15% aluminum bar waste.\n10-18% glass sheet waste.\n₹2-8L/year lost for mid-size shops.' },
  ];

  problems.forEach((p, i) => {
    const x = 0.4 + i * 3.2;
    slide.addShape(pptx.ShapeType.roundRect, { x, y: 2.2, w: 2.9, h: 2.2, fill: { color: '#FEF2F2' }, rectRadius: 0.12 });
    slide.addText(p.title, { x: x + 0.2, y: 2.35, w: 2.5, h: 0.4, fontSize: 14, fontFace: 'Arial', bold: true, color: '#DC2626' });
    slide.addText(p.desc, { x: x + 0.2, y: 2.8, w: 2.5, h: 1.3, fontSize: 11, fontFace: 'Arial', color: '#991B1B', lineSpacingMultiple: 1.4 });
  });
}

function addSolutionSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.dark };
  slide.addText('FoxFrame — Web-Based Window Manufacturing', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 24, fontFace: 'Arial', bold: true, color: BRAND.amber });
  slide.addText('₹49-199/month vs. ₹5-75L upfront for legacy tools', { x: 0.8, y: 0.95, w: 8.4, h: 0.4, fontSize: 14, fontFace: 'Arial', color: '#9CA3AF' });

  const modules = [
    { title: '1D Profile Optimizer', desc: 'Cut aluminum bars with minimal waste.\nBFDH algorithm, kerf & end-trim aware.\nRemnant tracking & reuse.\n92-97% material utilization.', color: BRAND.amber },
    { title: '2D Glass Optimizer', desc: 'Nest glass panels on jumbo sheets.\nGuillotine-cut constraint (score & snap).\nCoating direction support.\n85-93% utilization.', color: '#3B82F6' },
    { title: 'Window Configurator', desc: 'Define window type, dimensions,\nmullions & transoms.\nAuto-generate complete cut list.\nFixed, casement, sliding, tilt & turn.', color: '#10B981' },
    { title: 'BOM & Costing', desc: 'Full bill of materials:\nprofiles, glass, hardware, gaskets.\nInstant cost per window & per order.\nQuotation generation.', color: '#8B5CF6' },
  ];

  modules.forEach((m, i) => {
    const x = 0.3 + (i % 2) * 4.8;
    const y = 1.6 + Math.floor(i / 2) * 2.0;
    slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 4.4, h: 1.7, fill: { color: '2D2D2D' }, rectRadius: 0.12 });
    slide.addText(m.title, { x: x + 0.2, y: y + 0.1, w: 4.0, h: 0.4, fontSize: 15, fontFace: 'Arial', bold: true, color: m.color });
    slide.addText(m.desc, { x: x + 0.2, y: y + 0.55, w: 4.0, h: 1.0, fontSize: 11, fontFace: 'Arial', color: '#9CA3AF', lineSpacingMultiple: 1.4 });
  });
}

function addProfileCuttingSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  slide.addText('Aluminum Profile Cutting (1D)', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 26, fontFace: 'Arial', bold: true, color: BRAND.dark });

  slide.addText('The Core Problem:', { x: 0.8, y: 1.1, w: 8.4, h: 0.4, fontSize: 14, fontFace: 'Arial', bold: true, color: BRAND.dark });
  slide.addText('50 windows need 400+ profile cuts from standard 6m bars.\nHow to cut them with minimum waste?', { x: 0.8, y: 1.5, w: 8.4, h: 0.5, fontSize: 13, fontFace: 'Arial', color: BRAND.gray, lineSpacingMultiple: 1.3 });

  const points = [
    '✓  Profile database — define codes, widths, weight/meter, price/meter',
    '✓  Standard bar stock — 5000, 5800, 6000, 6500, 7000mm lengths',
    '✓  Saw kerf handling — 3-5mm blade width per cut',
    '✓  End trim — 10-25mm factory edge cleanup',
    '✓  Angle cuts — 90° standard, 45° mitre, custom angles for shaped windows',
    '✓  Remnant tracking — reuse leftover bar pieces from previous jobs',
    '✓  Multi-order batching — combine orders for better optimization',
    '✓  Bar labels — barcode/QR per cut piece for shop floor tracking',
  ];

  points.forEach((p, i) => {
    slide.addText(p, { x: 0.8, y: 2.3 + i * 0.38, w: 8.4, h: 0.35, fontSize: 12, fontFace: 'Arial', color: BRAND.dark });
  });
}

function addGlassCuttingSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  slide.addText('Glass Sheet Optimization (2D)', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 26, fontFace: 'Arial', bold: true, color: BRAND.dark });

  slide.addText('Guillotine Constraint: all cuts must go edge-to-edge (score & snap).', { x: 0.8, y: 1.1, w: 8.4, h: 0.4, fontSize: 13, fontFace: 'Arial', bold: true, color: BRAND.gray });

  const tableRows: PptxGenJS.TableRow[] = [
    [
      { text: 'Stock Sheet Size', options: { bold: true, color: BRAND.white, fill: { color: BRAND.dark }, fontSize: 11 } },
      { text: 'Common Name', options: { bold: true, color: BRAND.white, fill: { color: BRAND.dark }, fontSize: 11 } },
    ],
    ...([
      ['3210 × 2250 mm', 'Standard Jumbo'],
      ['3210 × 2550 mm', 'Extended Jumbo'],
      ['3660 × 2440 mm', 'North American Standard'],
      ['4500 × 2500 mm', 'Oversized'],
      ['6000 × 3210 mm', 'Super Jumbo (Curtain Wall)'],
    ] as string[][]).map(row => row.map(cell => ({ text: cell, options: { fontSize: 11, color: BRAND.dark } }))),
  ];

  slide.addTable(tableRows, { x: 0.5, y: 1.6, w: 5.0, colW: [2.5, 2.5], border: { color: '#D1D5DB', pt: 0.5 }, rowH: 0.38 });

  slide.addText('Glass types supported:', { x: 5.8, y: 1.6, w: 3.8, h: 0.3, fontSize: 12, fontFace: 'Arial', bold: true, color: BRAND.dark });
  slide.addText('• Clear float (4-12mm)\n• Tinted / reflective\n• Low-E coated\n• Laminated\n• Tempered\n• Double/triple glazed IGU', { x: 5.8, y: 2.0, w: 3.8, h: 2.0, fontSize: 11, fontFace: 'Arial', color: BRAND.gray, lineSpacingMultiple: 1.5 });
}

function addFrameTypesSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.dark };
  slide.addText('Supported Window & Door Types', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 26, fontFace: 'Arial', bold: true, color: BRAND.white });

  const types = [
    { name: 'Fixed', profiles: '4 frame + 4 beads', complexity: 'Simple' },
    { name: 'Casement', profiles: '8 main pieces', complexity: 'Medium' },
    { name: 'Tilt & Turn', profiles: '8 pieces + hardware', complexity: 'Medium' },
    { name: 'Sliding', profiles: 'Frame + tracks + panels', complexity: 'Complex' },
    { name: 'Bi-fold', profiles: 'Multiple panels + track', complexity: 'Complex' },
    { name: 'Awning/Hopper', profiles: 'Similar to casement', complexity: 'Medium' },
  ];

  types.forEach((t, i) => {
    const x = 0.3 + (i % 3) * 3.2;
    const y = 1.2 + Math.floor(i / 3) * 1.6;
    slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 2.9, h: 1.3, fill: { color: '2D2D2D' }, rectRadius: 0.1 });
    slide.addText(t.name, { x: x + 0.2, y: y + 0.1, w: 2.5, h: 0.4, fontSize: 16, fontFace: 'Arial', bold: true, color: BRAND.amber });
    slide.addText(t.profiles, { x: x + 0.2, y: y + 0.5, w: 2.5, h: 0.3, fontSize: 11, fontFace: 'Arial', color: '#D1D5DB' });
    slide.addText(t.complexity, { x: x + 0.2, y: y + 0.85, w: 2.5, h: 0.3, fontSize: 10, fontFace: 'Arial', color: '#9CA3AF' });
  });

  slide.addText('+ Mullions & Transoms: vertical and horizontal dividers auto-generate additional cuts', { x: 0.8, y: 4.4, w: 8.4, h: 0.4, fontSize: 12, fontFace: 'Arial', color: '#9CA3AF' });
}

function addCompetitorSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  slide.addText('Why FoxFrame Wins', { x: 0.8, y: 0.3, w: 8.4, h: 0.7, fontSize: 28, fontFace: 'Arial', bold: true, color: BRAND.dark });

  const tableRows: PptxGenJS.TableRow[] = [
    ['Feature', 'LogiKal / SchüCal', 'FeneVision', 'FoxFrame'].map(cell => ({
      text: cell,
      options: { bold: true, color: BRAND.white, fill: { color: BRAND.dark }, fontSize: 11, align: 'center' as const },
    })),
    ...([
      ['Pricing', '₹5-15L upfront', '₹15-75L+', '₹49-199/month'],
      ['Deployment', 'Desktop install', 'On-premise/cloud', 'Cloud — instant access'],
      ['Setup time', '3-6 months', '6-12 months', '10 minutes'],
      ['Mobile access', 'No', 'Limited', 'Full responsive web'],
      ['Multi-user', 'Per-seat license', 'Per-seat license', 'Team included'],
      ['Updates', 'Annual fee', 'Annual fee', 'Always latest'],
      ['Profile systems', 'Schüco only (SchüCal)', 'Any (complex setup)', 'Any (simple config)'],
      ['Target', 'Large fabricators', 'Enterprise', 'SMB fabricators'],
    ] as string[][]).map((row, i) => row.map((cell, j) => ({
      text: cell,
      options: {
        fontSize: 10,
        color: j === 3 ? BRAND.red : BRAND.dark,
        bold: j === 3,
        fill: { color: i % 2 === 0 ? BRAND.lightGray : BRAND.white },
        align: (j === 0 ? 'left' : 'center') as PptxGenJS.HAlign,
      },
    }))),
  ];

  slide.addTable(tableRows, { x: 0.3, y: 1.1, w: 9.4, colW: [2.0, 2.3, 2.3, 2.8], border: { color: '#E5E7EB', pt: 0.5 }, rowH: 0.4 });
}

function addCTASlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.dark };
  slide.addText('Modern Windows Deserve\nModern Software', { x: 0.8, y: 1.2, w: 8.4, h: 1.4, fontSize: 36, fontFace: 'Arial', bold: true, color: BRAND.white, lineSpacingMultiple: 1.2 });
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 3.0, w: 3.5, h: 0.6, fill: { color: BRAND.amber }, rectRadius: 0.08 });
  slide.addText('Start with FoxFrame →', { x: 0.8, y: 3.0, w: 3.5, h: 0.6, fontSize: 16, fontFace: 'Arial', bold: true, color: BRAND.dark, align: 'center' });
  slide.addText('www.werkfox.com/foxframe', { x: 0.8, y: 3.8, w: 8.4, h: 0.4, fontSize: 14, fontFace: 'Arial', color: BRAND.gray });
  slide.addText('Part of the WerkFox Manufacturing Platform\nFoxCut (Kitchens) + FoxFrame (Windows) + ERP + CRM', { x: 0.8, y: 4.3, w: 8.4, h: 0.6, fontSize: 12, fontFace: 'Arial', color: '#6B7280', lineSpacingMultiple: 1.3 });
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'WerkFox';
  pptx.title = 'FoxFrame - Window & Door Manufacturing Platform';

  addTitleSlide(pptx);
  addMarketSlide(pptx);
  addSolutionSlide(pptx);
  addProfileCuttingSlide(pptx);
  addGlassCuttingSlide(pptx);
  addFrameTypesSlide(pptx);
  addCompetitorSlide(pptx);
  addCTASlide(pptx);

  const outPath = 'public/branding/FoxFrame-Pitch.pptx';
  await pptx.writeFile({ fileName: outPath });
  console.log(`✅ FoxFrame PPT saved to ${outPath}`);
}

main().catch(console.error);
