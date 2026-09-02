import PptxGenJS from 'pptxgenjs';
import path from 'path';

const LOGO = path.resolve('public/logo.png');
const STACKNEX_ICON = path.resolve('public/branding/stacknex-icon.png');
const STACKNEX_FULL = path.resolve('public/branding/stacknex-full.png');
const NEXPOS_LOGO = path.resolve('public/branding/nexpos-logo.png');
const TOOLSFINDER_LOGO = path.resolve('public/branding/toolsfinder-logo.png');
const W = 13.33;
const H = 7.5;
const BRAND = { red: 'E03B12', dark: '1A1A1A', gray: '6B7280', lightGray: 'F3F4F6', midGray: '9CA3AF' };

function addSlide1(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  // Watermark — right side, large, bleed
  slide.addImage({ path: LOGO, x: W - 12 * 0.55, y: (H - 12) / 2, w: 12, h: 12, transparency: 92 });

  // Logo top-left
  slide.addImage({ path: LOGO, x: 1.0, y: 1.0, w: 2.0, h: 2.0 });

  // Wordmark — left aligned
  slide.addText([
    { text: 'Werk', options: { fontSize: 54, fontFace: 'Montserrat', bold: true, color: BRAND.dark, charSpacing: 4 } },
    { text: 'Fox', options: { fontSize: 64, fontFace: 'Caveat', bold: true, color: BRAND.red } },
  ], { x: 1.0, y: 3.2, w: 8, h: 1.0, align: 'left' });

  // Red accent line
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 4.3, w: 0.8, h: 0.04, fill: { color: BRAND.red } });

  // Tagline
  slide.addText('Manufacturing ERP\nfor the Modern Factory', {
    x: 1.0, y: 4.5, w: 6, h: 0.9, fontSize: 20, fontFace: 'Montserrat', color: BRAND.gray, align: 'left', lineSpacingMultiple: 1.3,
  });

  // URL bottom-left
  slide.addText('www.werkfox.com', {
    x: 1.0, y: H - 0.7, w: 4, h: 0.35, fontSize: 12, fontFace: 'Montserrat', color: BRAND.red, align: 'left',
  });

  // Footer logo bottom-right
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
}

function addSlide2(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  // StackNex icon + title
  slide.addImage({ path: STACKNEX_ICON, x: 1.0, y: 0.45, w: 1.0, h: 0.6 });
  slide.addText('About StackNex', {
    x: 2.1, y: 0.5, w: 8, h: 0.7, fontSize: 32, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
  });

  // Red accent line under title
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 1.3, w: 0.8, h: 0.04, fill: { color: BRAND.red } });

  // Company description
  slide.addText('StackNex builds cloud-first software products for small and mid-size businesses — from retail to manufacturing. Each product is purpose-built for its industry, designed to replace legacy tools with modern, affordable SaaS.', {
    x: 1.0, y: 1.6, w: 7.5, h: 1.0, fontSize: 14, fontFace: 'Montserrat', color: BRAND.gray, lineSpacingMultiple: 1.5,
  });

  // Product cards
  const products = [
    {
      logo: LOGO,
      nameStyle: [
        { text: 'Werk', options: { fontSize: 22, fontFace: 'Montserrat', bold: true, color: BRAND.dark } },
        { text: 'Fox', options: { fontSize: 26, fontFace: 'Caveat', bold: true, color: BRAND.red } },
      ],
      desc: 'Manufacturing ERP',
      detail: 'End-to-end production management — inventory, BOM, work orders, dispatch, invoicing, CRM. Built for Indian factories.',
      highlight: true,
    },
    {
      logo: NEXPOS_LOGO,
      nameStyle: [
        { text: 'Nex', options: { fontSize: 22, fontFace: 'Montserrat', bold: true, color: BRAND.dark } },
        { text: 'POS', options: { fontSize: 22, fontFace: 'Montserrat', bold: true, color: BRAND.red } },
      ],
      desc: 'Cloud Point of Sale',
      detail: 'Multi-location POS for restaurants, retail & QSR. KDS, inventory, multi-currency, dine-in. Live in 15+ countries.',
      highlight: false,
    },
    {
      logo: TOOLSFINDER_LOGO,
      nameStyle: [
        { text: 'Tools', options: { fontSize: 22, fontFace: 'Montserrat', bold: true, color: BRAND.dark } },
        { text: 'Finder', options: { fontSize: 22, fontFace: 'Montserrat', bold: true, color: BRAND.red } },
      ],
      desc: 'Industrial Tool Marketplace',
      detail: 'Search, compare and source cutting tools, inserts & accessories. Parametric 2D/3D tool visualization.',
      highlight: false,
    },
  ];

  const cardW = 3.5;
  const cardH = 2.8;
  const startX = 1.0;
  const startY = 3.0;
  const gap = 0.35;

  products.forEach((p, i) => {
    const x = startX + i * (cardW + gap);

    // Card background
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: p.highlight ? 'FEF2F2' : BRAND.lightGray },
      rectRadius: 0.1,
      line: p.highlight ? { color: BRAND.red, width: 1.5 } : undefined,
    });

    // Product logo
    slide.addImage({ path: p.logo, x: x + 0.3, y: startY + 0.25, w: 0.45, h: 0.45 });

    // Product name (next to logo)
    slide.addText(p.nameStyle, { x: x + 0.85, y: startY + 0.2, w: 2.4, h: 0.5, align: 'left' });

    // Product type
    slide.addText(p.desc, {
      x: x + 0.3, y: startY + 0.7, w: 3.0, h: 0.35, fontSize: 12, fontFace: 'Montserrat', bold: true, color: BRAND.red,
    });

    // Product detail
    slide.addText(p.detail, {
      x: x + 0.3, y: startY + 1.1, w: 2.9, h: 1.4, fontSize: 11, fontFace: 'Montserrat', color: BRAND.gray, lineSpacingMultiple: 1.4,
    });
  });

  // "This presentation" note
  slide.addText('This presentation focuses on WerkFox — our manufacturing ERP platform.', {
    x: 1.0, y: H - 0.75, w: 8, h: 0.35, fontSize: 11, fontFace: 'Montserrat', italic: true, color: BRAND.midGray,
  });

  // Footer logo bottom-right
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
}

function addSlide3(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  // Title
  slide.addText('The Problem', {
    x: 1.0, y: 0.6, w: 8, h: 0.7, fontSize: 32, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
  });

  // Red accent line
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 1.3, w: 0.8, h: 0.04, fill: { color: BRAND.red } });

  // Subtitle
  slide.addText('Most Indian manufacturers still run on spreadsheets, paper registers, and disconnected software.', {
    x: 1.0, y: 1.5, w: 10, h: 0.5, fontSize: 15, fontFace: 'Montserrat', color: BRAND.gray, lineSpacingMultiple: 1.4,
  });

  // Pain point cards — 2 rows x 3 columns
  const problems = [
    {
      title: 'No Production Visibility',
      desc: 'Factory owners have no real-time view of what\'s on the floor — which orders are running, which are stuck, what\'s delayed.',
    },
    {
      title: 'Excel-based Inventory',
      desc: 'Stock tracked in spreadsheets. No live count, no reorder alerts, no link between raw materials and finished goods.',
    },
    {
      title: 'Manual Quoting & Invoicing',
      desc: 'Quotes created in Word/Excel, no version history, no conversion tracking. Invoices disconnected from orders.',
    },
    {
      title: 'No Material Planning',
      desc: 'BOM exists on paper. No auto-calculation of material needs per order. Over-ordering or shortages are common.',
    },
    {
      title: 'Vendor Chaos',
      desc: 'No centralized vendor database. Purchase orders via WhatsApp. No GRN tracking. Payment disputes are frequent.',
    },
    {
      title: 'Zero Customer Tracking',
      desc: 'No CRM. Customer history lives in someone\'s head. Follow-ups missed. Repeat business left on the table.',
    },
  ];

  const cardW = 3.5;
  const cardH = 1.8;
  const startX = 1.0;
  const gap = 0.35;

  problems.forEach((p, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cardW + gap);
    const y = 2.2 + row * (cardH + 0.3);

    // Card bg
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH,
      fill: { color: 'FEF2F2' },
      rectRadius: 0.1,
    });

    // Red dot bullet
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.25, y: y + 0.25, w: 0.12, h: 0.12,
      fill: { color: BRAND.red },
    });

    // Title
    slide.addText(p.title, {
      x: x + 0.45, y: y + 0.15, w: 2.85, h: 0.35,
      fontSize: 13, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
    });

    // Description
    slide.addText(p.desc, {
      x: x + 0.25, y: y + 0.55, w: 3.0, h: 1.1,
      fontSize: 11, fontFace: 'Montserrat', color: BRAND.gray, lineSpacingMultiple: 1.4,
    });
  });

  // Bottom stat line
  slide.addText('63% of Indian SME manufacturers still use manual methods for production planning.', {
    x: 1.0, y: H - 0.75, w: 10, h: 0.35, fontSize: 12, fontFace: 'Montserrat', bold: true, italic: true, color: BRAND.red,
  });

  // Footer logo
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
}

function addSlide4(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  // Title
  slide.addText([
    { text: 'The Solution — ', options: { fontSize: 32, fontFace: 'Montserrat', bold: true, color: BRAND.dark } },
    { text: 'Werk', options: { fontSize: 32, fontFace: 'Montserrat', bold: true, color: BRAND.dark } },
    { text: 'Fox', options: { fontSize: 38, fontFace: 'Caveat', bold: true, color: BRAND.red } },
  ], { x: 1.0, y: 0.6, w: 10, h: 0.7 });

  // Red accent line
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 1.3, w: 0.8, h: 0.04, fill: { color: BRAND.red } });

  // Subtitle
  slide.addText('One platform that replaces spreadsheets, WhatsApp coordination, and disconnected tools.', {
    x: 1.0, y: 1.5, w: 10, h: 0.5, fontSize: 15, fontFace: 'Montserrat', color: BRAND.gray,
  });

  // Solution cards — 2 rows x 3 columns, matching the problem slide
  const solutions = [
    {
      problem: 'No Production Visibility',
      solution: 'Live Production Dashboard',
      desc: 'Real-time work order tracking. See what\'s running, what\'s pending, what\'s delayed — from anywhere.',
    },
    {
      problem: 'Excel-based Inventory',
      solution: 'Smart Inventory Management',
      desc: 'Live stock levels across warehouses. Auto reorder alerts. Raw material to finished goods traceability.',
    },
    {
      problem: 'Manual Quoting & Invoicing',
      solution: 'Quotes → Orders → Invoices',
      desc: 'Create quotes, convert to sales orders, generate invoices — one flow. Version history, PDF export, payment tracking.',
    },
    {
      problem: 'No Material Planning',
      solution: 'BOM & Material Requests',
      desc: 'Define multi-level BOMs. Auto-calculate material needs per work order. Generate purchase requests in one click.',
    },
    {
      problem: 'Vendor Chaos',
      solution: 'Vendor & Purchase Management',
      desc: 'Centralized vendor database. PO creation, GRN tracking, payment reconciliation. No more WhatsApp orders.',
    },
    {
      problem: 'Zero Customer Tracking',
      solution: 'Built-in CRM',
      desc: 'Customer profiles, interaction history, follow-up reminders, deal pipeline. Never miss a repeat order.',
    },
  ];

  const cardW = 3.5;
  const cardH = 1.8;
  const startX = 1.0;
  const gap = 0.35;

  solutions.forEach((s, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cardW + gap);
    const y = 2.2 + row * (cardH + 0.3);

    // Card bg — green tint
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH,
      fill: { color: 'F0FDF4' },
      rectRadius: 0.1,
    });

    // Green check dot
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.25, y: y + 0.25, w: 0.12, h: 0.12,
      fill: { color: '059669' },
    });

    // Solution title
    slide.addText(s.solution, {
      x: x + 0.45, y: y + 0.15, w: 2.85, h: 0.35,
      fontSize: 13, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
    });

    // Description
    slide.addText(s.desc, {
      x: x + 0.25, y: y + 0.55, w: 3.0, h: 1.1,
      fontSize: 11, fontFace: 'Montserrat', color: BRAND.gray, lineSpacingMultiple: 1.4,
    });
  });

  // Bottom line
  slide.addText('All modules connected. One login. One database. Zero data silos.', {
    x: 1.0, y: H - 0.75, w: 10, h: 0.35, fontSize: 12, fontFace: 'Montserrat', bold: true, italic: true, color: '059669',
  });

  // Footer logo
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
}

function addSlide5(pptx: PptxGenJS, step: number) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.lightGray };

  // Title
  slide.addText('Dashboard — Real-time Business Overview', {
    x: 1.0, y: 0.3, w: 10, h: 0.6, fontSize: 24, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
  });

  // Red accent line
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 0.9, w: 0.8, h: 0.04, fill: { color: BRAND.red } });

  // ── Mock Dashboard UI (narrower to leave room for callouts) ──
  const uiX = 2.2;
  const uiY = 1.2;
  const uiW = 9.0;
  const uiH = 5.4;

  // Browser-like frame
  slide.addShape(pptx.ShapeType.roundRect, {
    x: uiX, y: uiY, w: uiW, h: uiH,
    fill: { color: 'FFFFFF' }, rectRadius: 0.12,
    shadow: { type: 'outer', blur: 8, offset: 2, color: '00000020' },
  });

  // Top nav bar
  slide.addShape(pptx.ShapeType.rect, {
    x: uiX, y: uiY, w: uiW, h: 0.45,
    fill: { color: BRAND.dark }, rectRadius: 0.12,
  });

  // Nav items
  slide.addImage({ path: LOGO, x: uiX + 0.2, y: uiY + 0.07, w: 0.3, h: 0.3 });
  slide.addText([
    { text: 'Werk', options: { fontSize: 11, fontFace: 'Montserrat', bold: true, color: 'FFFFFF' } },
    { text: 'Fox', options: { fontSize: 13, fontFace: 'Caveat', bold: true, color: BRAND.red } },
  ], { x: uiX + 0.55, y: uiY + 0.08, w: 1.2, h: 0.3 });

  const tabs = ['CRM', 'ERP'];
  tabs.forEach((t, i) => {
    slide.addText(t, {
      x: uiX + 2.0 + i * 0.9, y: uiY + 0.08, w: 0.8, h: 0.3,
      fontSize: 9, fontFace: 'Montserrat', color: 'AAAAAA', align: 'center',
    });
  });

  // Sub nav bar
  slide.addShape(pptx.ShapeType.rect, {
    x: uiX, y: uiY + 0.45, w: uiW, h: 0.35,
    fill: { color: 'F9FAFB' },
  });
  slide.addText('Dashboard', {
    x: uiX + 0.3, y: uiY + 0.48, w: 1.5, h: 0.28,
    fontSize: 9, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
  });

  // ── 4 KPI Cards ──
  const cardY = uiY + 1.0;
  const kpis = [
    { label: 'Pipeline Value', value: '₹24.5L', sub: '12 open opportunities', color: '3B82F6' },
    { label: 'Revenue', value: '₹8.2L', sub: '38 invoices total', color: '10B981' },
    { label: 'Active Leads', value: '47', sub: '23 customers', color: BRAND.red },
    { label: 'Pending Actions', value: '6', sub: '3 invoices · 3 POs', color: 'F59E0B' },
  ];

  const kpiW = 1.95;
  const kpiGap = 0.2;
  const kpiStartX = uiX + 0.3;

  kpis.forEach((k, i) => {
    const x = kpiStartX + i * (kpiW + kpiGap);
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: cardY, w: kpiW, h: 0.9,
      fill: { color: 'FFFFFF' }, rectRadius: 0.06,
      line: { color: 'E5E7EB', width: 0.5 },
    });
    // Color dot
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.15, y: cardY + 0.15, w: 0.18, h: 0.18,
      fill: { color: k.color },
    });
    slide.addText(k.label, {
      x: x + 0.4, y: cardY + 0.08, w: 2.0, h: 0.25,
      fontSize: 8, fontFace: 'Montserrat', color: BRAND.gray,
    });
    slide.addText(k.value, {
      x: x + 0.4, y: cardY + 0.32, w: 2.0, h: 0.3,
      fontSize: 16, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
    });
    slide.addText(k.sub, {
      x: x + 0.4, y: cardY + 0.62, w: 2.0, h: 0.2,
      fontSize: 7, fontFace: 'Montserrat', color: BRAND.midGray,
    });
  });

  // ── Sales Chart area ──
  const chartY = cardY + 1.1;
  const chartW = 5.2;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: kpiStartX, y: chartY, w: chartW, h: 2.8,
    fill: { color: 'FFFFFF' }, rectRadius: 0.06,
    line: { color: 'E5E7EB', width: 0.5 },
  });
  slide.addText('Monthly Revenue', {
    x: kpiStartX + 0.2, y: chartY + 0.1, w: 3, h: 0.3,
    fontSize: 10, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
  });
  // Fake bar chart bars
  const barColors = ['E8D5D0', 'E8D5D0', 'EDCEC6', 'F0B8A8', 'E8926E', BRAND.red, 'F0B8A8'];
  const barHeights = [0.6, 0.8, 1.0, 1.4, 1.8, 2.1, 1.2];
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  barColors.forEach((c, i) => {
    const bx = kpiStartX + 0.4 + i * 0.65;
    const bh = barHeights[i];
    const by = chartY + 2.5 - bh;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: bx, y: by, w: 0.4, h: bh,
      fill: { color: c }, rectRadius: 0.04,
    });
    slide.addText(months[i], {
      x: bx - 0.05, y: chartY + 2.5, w: 0.5, h: 0.2,
      fontSize: 6, fontFace: 'Montserrat', color: BRAND.midGray, align: 'center',
    });
  });

  // ── Recent Leads table ──
  const tableX = kpiStartX + chartW + 0.2;
  const tableW = uiW - chartW - 0.7;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: tableX, y: chartY, w: tableW, h: 2.8,
    fill: { color: 'FFFFFF' }, rectRadius: 0.06,
    line: { color: 'E5E7EB', width: 0.5 },
  });
  slide.addText('Recent Leads', {
    x: tableX + 0.15, y: chartY + 0.1, w: 2, h: 0.3,
    fontSize: 10, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
  });
  const leads = [
    { name: 'Rajesh Industries', stage: 'QUALIFIED', color: '10B981' },
    { name: 'Kumar Kitchens', stage: 'CONTACTED', color: '3B82F6' },
    { name: 'Sri Furniture', stage: 'NEW', color: BRAND.midGray },
    { name: 'Metro Interiors', stage: 'QUALIFIED', color: '10B981' },
    { name: 'Deccan Cabinets', stage: 'CONTACTED', color: '3B82F6' },
  ];
  leads.forEach((l, i) => {
    const ly = chartY + 0.5 + i * 0.42;
    slide.addText(l.name, {
      x: tableX + 0.15, y: ly, w: 1.8, h: 0.3,
      fontSize: 7, fontFace: 'Montserrat', color: BRAND.dark,
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: tableX + tableW - 1.15, y: ly + 0.05, w: 0.9, h: 0.2,
      fill: { color: l.color }, rectRadius: 0.04,
    });
    slide.addText(l.stage, {
      x: tableX + tableW - 1.15, y: ly + 0.05, w: 0.9, h: 0.2,
      fontSize: 5, fontFace: 'Montserrat', bold: true, color: 'FFFFFF', align: 'center',
    });
  });

  // ── Callout labels revealed progressively ──
  const callouts = [
    { text: 'Live KPIs — Pipeline,\nRevenue, Leads, Actions', x: 0.1, y: cardY + 0.05, w: 1.9, h: 0.55 },
    { text: 'Monthly revenue\ntrend chart', x: 0.1, y: chartY + 0.8, w: 1.9, h: 0.5 },
    { text: 'Recent CRM leads\nwith stage badges', x: 0.1, y: chartY + 1.9, w: 1.9, h: 0.5 },
    { text: 'Module tabs —\nCRM · ERP', x: uiX + 1.5, y: uiY - 0.5, w: 2.5, h: 0.45 },
  ];

  callouts.forEach((c, i) => {
    if (i < step) {
      slide.addText(c.text, {
        x: c.x, y: c.y, w: c.w, h: c.h,
        fontSize: 13, fontFace: 'Caveat', bold: true, color: BRAND.red,
        align: i === 3 ? 'center' : 'right',
      });
    }
  });

  // Footer logo
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
}

function addSlide6CRM(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  // Title
  slide.addText('CRM — Customer Relationship Management', {
    x: 1.0, y: 0.6, w: 10, h: 0.7, fontSize: 28, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
  });
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 1.3, w: 0.8, h: 0.04, fill: { color: BRAND.red } });

  slide.addText('Track every lead from first contact to closed deal. Built for manufacturing sales cycles.', {
    x: 1.0, y: 1.5, w: 10, h: 0.45, fontSize: 14, fontFace: 'Montserrat', color: BRAND.gray,
  });

  const features = [
    {
      title: 'Lead Management',
      desc: 'Capture leads from website, referrals, trade shows. Score and qualify automatically. Never lose a prospect.',
    },
    {
      title: 'Opportunity Pipeline',
      desc: 'Visual pipeline with stages — New, Contacted, Qualified, Proposal, Negotiation, Won/Lost. Drag-and-drop.',
    },
    {
      title: 'Activity Tracking',
      desc: 'Log calls, meetings, site visits. Set follow-up reminders. Full interaction history per customer.',
    },
    {
      title: 'Customer Profiles',
      desc: 'Complete customer database — contact info, purchase history, credit terms, delivery preferences.',
    },
    {
      title: 'Quotes & Proposals',
      desc: 'Generate professional quotes with product catalog, pricing, GST. Convert to sales order in one click.',
    },
    {
      title: 'Reports & Analytics',
      desc: 'Conversion rates, pipeline value, sales forecasting, team performance. Data-driven decisions.',
    },
  ];

  const cardW = 3.5;
  const cardH = 1.65;
  const startX = 1.0;
  const gap = 0.35;

  features.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cardW + gap);
    const y = 2.2 + row * (cardH + 0.3);

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH,
      fill: { color: BRAND.lightGray }, rectRadius: 0.1,
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.25, y: y + 0.22, w: 0.12, h: 0.12,
      fill: { color: BRAND.red },
    });
    slide.addText(f.title, {
      x: x + 0.45, y: y + 0.12, w: 2.85, h: 0.35,
      fontSize: 13, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
    });
    slide.addText(f.desc, {
      x: x + 0.25, y: y + 0.5, w: 3.0, h: 1.0,
      fontSize: 11, fontFace: 'Montserrat', color: BRAND.gray, lineSpacingMultiple: 1.4,
    });
  });

  slide.addText('From lead to invoice — one connected flow. No data re-entry.', {
    x: 1.0, y: H - 0.75, w: 10, h: 0.35, fontSize: 12, fontFace: 'Montserrat', bold: true, italic: true, color: BRAND.red,
  });
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
}

function addSlide7ERP(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  slide.addText('ERP — End-to-End Manufacturing Operations', {
    x: 1.0, y: 0.6, w: 10, h: 0.7, fontSize: 28, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
  });
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 1.3, w: 0.8, h: 0.04, fill: { color: BRAND.red } });

  slide.addText('Every module a factory needs — from raw material to finished goods to dispatch.', {
    x: 1.0, y: 1.5, w: 10, h: 0.45, fontSize: 14, fontFace: 'Montserrat', color: BRAND.gray,
  });

  // ERP modules in flow layout
  const modules = [
    { name: 'Products & BOM', desc: 'Product catalog with multi-level BOM, variants, GST rates, costing.' },
    { name: 'Inventory & Stock', desc: 'Multi-warehouse stock tracking. Reorder alerts. Stock adjustments & transfers.' },
    { name: 'Vendors & Procurement', desc: 'Vendor database. Purchase orders, GRN, quality checks, payment tracking.' },
    { name: 'Production & Work Orders', desc: 'Create work orders from sales orders. Track production stages, yield, wastage.' },
    { name: 'Sales Orders & Invoices', desc: 'SO from quotes. Auto-generate invoices. GST-compliant. Payment reconciliation.' },
    { name: 'Dispatch & Delivery', desc: 'Dispatch planning. Delivery challan. Transporter assignment. Proof of delivery.' },
    { name: 'Material Requests', desc: 'Auto-generate material requests from BOM. Link to purchase orders. Track fulfillment.' },
    { name: 'Payments & Accounts', desc: 'Track receivables & payables. Payment reminders. Basic accounting integration.' },
    { name: 'Reports & Dashboards', desc: 'Revenue, inventory valuation, production efficiency, vendor performance.' },
  ];

  const cardW = 3.5;
  const cardH = 1.25;
  const startX = 1.0;
  const gap = 0.3;

  modules.forEach((m, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cardW + gap);
    const y = 2.15 + row * (cardH + 0.2);

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH,
      fill: { color: BRAND.lightGray }, rectRadius: 0.08,
    });
    slide.addText(m.name, {
      x: x + 0.2, y: y + 0.08, w: 3.1, h: 0.3,
      fontSize: 12, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
    });
    slide.addText(m.desc, {
      x: x + 0.2, y: y + 0.4, w: 3.1, h: 0.75,
      fontSize: 10, fontFace: 'Montserrat', color: BRAND.gray, lineSpacingMultiple: 1.3,
    });
  });

  slide.addText('All modules share one database. Change a product price — it updates everywhere instantly.', {
    x: 1.0, y: H - 0.7, w: 10, h: 0.35, fontSize: 12, fontFace: 'Montserrat', bold: true, italic: true, color: BRAND.red,
  });
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
}

function addSlide8IndustryModules(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  slide.addText('Industry-Specific Modules', {
    x: 1.0, y: 0.6, w: 10, h: 0.7, fontSize: 28, fontFace: 'Montserrat', bold: true, color: BRAND.dark,
  });
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 1.3, w: 0.8, h: 0.04, fill: { color: BRAND.red } });

  slide.addText('WerkFox builds custom modules for specific manufacturing verticals. Plug into the core ERP — no extra setup.', {
    x: 1.0, y: 1.5, w: 10, h: 0.45, fontSize: 14, fontFace: 'Montserrat', color: BRAND.gray,
  });

  const industries = [
    {
      name: 'FoxCut',
      subtitle: 'Modular Kitchens & Cabinetry',
      color: BRAND.red,
      bgColor: 'FEF2F2',
      status: '',
      statusColor: '',
      features: [
        'Guillotine-optimized sheet cutting layouts',
        '9 Indian market materials with pricing',
        'Edge banding per edge + grain direction lock',
        'Kitchen module presets (Base, Wall, Tall, Drawers)',
        'Visual cutting diagrams with cut sequences',
        'Remnant tracking + cost calculator',
      ],
    },
    {
      name: 'FoxFrame',
      subtitle: 'Window & Door Manufacturing',
      color: '3B82F6',
      bgColor: 'EFF6FF',
      status: '',
      statusColor: '',
      features: [
        'Aluminium profile bar cutting optimization',
        'Window/door configuration (sliding, casement, fixed)',
        'Glass panel calculation + spacer bars',
        'Hardware & accessory BOM per unit',
        'Multi-panel layout designer',
        '1D bin packing for profile bars',
      ],
    },
    {
      name: 'FoxLabel',
      subtitle: 'Printing & Packaging',
      color: '8B5CF6',
      bgColor: 'F5F3FF',
      status: '',
      statusColor: '',
      features: [
        'Label & sticker die-cut optimization',
        'Substrate material library (vinyl, paper, polyester)',
        'Print run planning + color separation',
        'Waste tracking per job',
        'Carton/box blank nesting',
        'Job costing with material + machine time',
      ],
    },
  ];

  const cardW = 3.5;
  const cardH = 3.6;
  const startX = 1.0;
  const gap = 0.35;

  industries.forEach((ind, i) => {
    const x = startX + i * (cardW + gap);
    const y = 2.2;

    // Card
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH,
      fill: { color: ind.bgColor }, rectRadius: 0.1,
      line: { color: ind.color, width: 1.5 },
    });

    // Module name
    slide.addText(ind.name, {
      x: x + 0.25, y: y + 0.15, w: 2.2, h: 0.4,
      fontSize: 20, fontFace: 'Montserrat', bold: true, color: ind.color,
    });

    // No status badge

    // Subtitle
    slide.addText(ind.subtitle, {
      x: x + 0.25, y: y + 0.55, w: 3.0, h: 0.3,
      fontSize: 11, fontFace: 'Montserrat', bold: true, color: BRAND.gray,
    });

    // Features list
    ind.features.forEach((feat, fi) => {
      slide.addShape(pptx.ShapeType.ellipse, {
        x: x + 0.3, y: y + 1.0 + fi * 0.4, w: 0.08, h: 0.08,
        fill: { color: ind.color },
      });
      slide.addText(feat, {
        x: x + 0.5, y: y + 0.9 + fi * 0.4, w: 2.8, h: 0.35,
        fontSize: 9, fontFace: 'Montserrat', color: BRAND.dark, lineSpacingMultiple: 1.2,
      });
    });
  });

  slide.addText('Each module integrates with core ERP — shared inventory, vendors, invoicing, and reporting.', {
    x: 1.0, y: H - 0.7, w: 10, h: 0.35, fontSize: 12, fontFace: 'Montserrat', bold: true, italic: true, color: BRAND.red,
  });
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
}

function addClosingSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  // Large watermark — right side bleed (same as slide 1)
  slide.addImage({ path: LOGO, x: W - 12 * 0.55, y: (H - 12) / 2, w: 12, h: 12, transparency: 92 });

  // Logo top-left (same as slide 1)
  slide.addImage({ path: LOGO, x: 1.0, y: 1.0, w: 2.0, h: 2.0 });

  // Wordmark
  slide.addText([
    { text: 'Werk', options: { fontSize: 54, fontFace: 'Montserrat', bold: true, color: BRAND.dark, charSpacing: 4 } },
    { text: 'Fox', options: { fontSize: 64, fontFace: 'Caveat', bold: true, color: BRAND.red } },
  ], { x: 1.0, y: 3.2, w: 8, h: 1.0, align: 'left' });

  // Red accent line
  slide.addShape(pptx.ShapeType.rect, { x: 1.0, y: 4.3, w: 0.8, h: 0.04, fill: { color: BRAND.red } });

  // CTA text
  slide.addText('Let\'s build your factory\'s future.', {
    x: 1.0, y: 4.5, w: 6, h: 0.6, fontSize: 22, fontFace: 'Montserrat', color: BRAND.gray, align: 'left',
  });

  // Contact info
  slide.addText('www.werkfox.com', {
    x: 1.0, y: 5.3, w: 5, h: 0.35, fontSize: 14, fontFace: 'Montserrat', bold: true, color: BRAND.red,
  });
  slide.addText('info@werkfox.com', {
    x: 1.0, y: 5.65, w: 5, h: 0.35, fontSize: 13, fontFace: 'Montserrat', color: BRAND.gray,
  });

  // StackNex icon + text in footer
  slide.addImage({ path: STACKNEX_ICON, x: 1.0, y: H - 0.7, w: 0.55, h: 0.35 });
  slide.addText('A StackNex Product', {
    x: 1.6, y: H - 0.68, w: 3, h: 0.35, fontSize: 11, fontFace: 'Montserrat', color: BRAND.midGray,
  });

  // Footer logo bottom-right
  slide.addImage({ path: LOGO, x: W - 0.75, y: H - 0.65, w: 0.35, h: 0.35 });
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'WerkFox';
  pptx.title = 'WerkFox - Manufacturing ERP Platform';

  addSlide1(pptx);
  addSlide2(pptx);
  addSlide3(pptx);
  addSlide4(pptx);
  addSlide5(pptx, 4); // Dashboard with all callouts
  addSlide6CRM(pptx);
  addSlide7ERP(pptx);
  addSlide8IndustryModules(pptx);
  addClosingSlide(pptx);

  const outPath = 'public/branding/WerkFox-Platform-Pitch.pptx';
  await pptx.writeFile({ fileName: outPath });
  console.log(`Done: ${outPath}`);
}

main().catch(console.error);
