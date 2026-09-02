import { chromium } from 'playwright';
import path from 'path';

const BASE = 'http://localhost:3000';
const OUT = path.resolve('public/branding/screenshots');

const pages = [
  { name: 'dashboard', path: '/admin' },
  { name: 'crm', path: '/admin/crm' },
  { name: 'erp-overview', path: '/admin/erp' },
  { name: 'erp-products', path: '/admin/erp/products' },
  { name: 'erp-inventory', path: '/admin/erp/inventory' },
  { name: 'erp-work-orders', path: '/admin/erp/work-orders' },
  { name: 'foxcut', path: '/admin/foxcut' },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    storageState: undefined,
  });

  // Login first
  const loginPage = await context.newPage();
  await loginPage.goto(`${BASE}/auth/signin`, { waitUntil: 'networkidle' });

  // Check if we need to login
  const currentUrl = loginPage.url();
  if (currentUrl.includes('signin')) {
    // Try to fill login form
    await loginPage.fill('input[type="email"], input[name="email"]', 'mohan@stacknex.io');
    await loginPage.fill('input[type="password"], input[name="password"]', process.env.ADMIN_PASSWORD || 'test123');
    await loginPage.click('button[type="submit"]');
    await loginPage.waitForTimeout(3000);
  }

  for (const p of pages) {
    try {
      const page = await context.newPage();
      await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(2000);

      const filePath = `${OUT}/${p.name}.png`;
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Captured: ${p.name}`);
      await page.close();
    } catch (e) {
      console.log(`Failed: ${p.name} — ${(e as Error).message}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

main().catch(console.error);
