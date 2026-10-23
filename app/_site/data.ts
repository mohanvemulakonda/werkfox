/**
 * Facts the werkfox.com site shows. Apps and industries are copied from werkfox-app
 * src/lib/werkfox-apps.ts and werkfox-industries.ts (origin/main 52c93cb, 23 Oct 2026: Job cards and Maintenance live at 25024cc,
 * Warehouse and Quality at f741ac5, Collections, Job work, Price lists & schemes and Field sales at cb3feaa,
 * Distributors & commissions at 52c93cb).
 * When an app goes live in werkfox-app, flip `live` here too.
 */

export const APP_URL = 'https://app.werkfox.com';
export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;
export const TEAM_EMAIL = 'admin@werkfox.com';
export const DEMO_URL = '/contact?topic=demo';
export const NEED_URL = '/contact?topic=app';

/** App tile colours: token names (--app-<tone>), never a colour value. */
export type Tone =
  | 'orange' | 'blue' | 'sky' | 'violet' | 'teal' | 'amber' | 'pink' | 'green'
  | 'slate' | 'indigo' | 'rose' | 'cyan' | 'stone' | 'brown';

export type AppId =
  | 'sales' | 'inventory' | 'purchase' | 'production' | 'dispatch' | 'quality' | 'maintenance' | 'jobwork'
  | 'attendance' | 'payroll' | 'pricelist' | 'fieldsales' | 'collections' | 'distributors' | 'trips' | 'freight' | 'fleet'
  | 'drivers' | 'fuel' | 'sites' | 'boq' | 'sitematerial' | 'labour' | 'subcontract' | 'equipment'
  | 'proposals' | 'projects' | 'timesheets' | 'retainers' | 'contracts' | 'tickets' | 'schedule'
  | 'techapp' | 'amc' | 'spares' | 'jobcards' | 'warehouse';

export interface SiteApp { name: string; line: string; icon: string; tone: Tone; plan: 'standard' | 'pro'; live: boolean }

const A = (name: string, line: string, icon: string, tone: Tone, plan: 'standard' | 'pro', live: boolean): SiteApp => ({ name, line, icon, tone, plan, live });

export const APPS: Record<AppId, SiteApp> = {
  sales: A('Quotations & orders', 'Leads, follow-ups, quotations and sales orders', 'file-pen', 'sky', 'standard', true),
  inventory: A('Inventory', 'Stock by location, transfers and stock count', 'boxes', 'teal', 'pro', true),
  purchase: A('Purchase', 'Suppliers, orders, goods received and bills', 'shopping-cart', 'amber', 'pro', true),
  production: A('Production', 'Bill of materials, work orders, material used', 'factory', 'violet', 'pro', true),
  dispatch: A('Dispatch', 'Delivery challans, vehicle and driver', 'truck', 'pink', 'pro', true),
  warehouse: A('Warehouse', 'Racks and bins, put-away, picking, batches and serials', 'warehouse', 'indigo', 'pro', true),
  quality: A('Quality', 'Checks on incoming and finished goods', 'badge-check', 'green', 'pro', true),
  maintenance: A('Maintenance', 'Machines and vehicles, service due, breakdowns', 'wrench', 'slate', 'pro', true),
  jobwork: A('Job work', 'Send material to another workshop and get it back, with ITC-04', 'repeat', 'violet', 'pro', true),
  attendance: A('People & attendance', 'Workers and staff, crew attendance and overtime', 'user-check', 'cyan', 'pro', true),
  payroll: A('Payroll', 'Salary, advances, PF and ESI, payslips', 'banknote', 'green', 'pro', true),
  pricelist: A('Price lists & schemes', 'Dealer rates, discounts and offers', 'tag', 'rose', 'pro', true),
  fieldsales: A('Field sales', 'Salesman beats and orders taken at the shop', 'map-pin', 'blue', 'pro', true),
  collections: A('Collections', 'What is owed, reminders and cheques', 'coins', 'green', 'standard', true),
  distributors: A('Distributors & commissions', 'Distributor network, BV, monthly commission and payouts', 'network', 'violet', 'pro', true),
  trips: A('Trips & LR', 'Bookings, lorry receipts and trip sheets', 'truck', 'blue', 'pro', false),
  freight: A('Freight billing', 'Bill per trip, tonne or km, with GST', 'receipt-text', 'orange', 'pro', false),
  fleet: A('Fleet', 'Vehicles, with RC, insurance, permit and FC expiry', 'truck', 'teal', 'pro', false),
  drivers: A('Drivers', 'Licences, trip allowance (bata) and advances', 'id-card', 'indigo', 'pro', false),
  fuel: A('Fuel & tolls', 'Diesel, FASTag, tolls and trip spending', 'fuel', 'brown', 'pro', false),
  sites: A('Sites & projects', 'Every job with its budget and its profit', 'building', 'brown', 'pro', false),
  boq: A('BOQ & RA bills', 'Bill of quantities and running bills', 'clipboard-check', 'blue', 'pro', false),
  sitematerial: A('Site material', 'Material sent to and used at each site', 'boxes', 'teal', 'pro', false),
  labour: A('Labour', 'Crew attendance and wages by site', 'hard-hat', 'orange', 'pro', false),
  subcontract: A('Subcontractors', 'Work orders and bills from subcontractors', 'signature', 'violet', 'pro', false),
  equipment: A('Equipment hire', 'Machines in and out, hire hours billed', 'construction', 'stone', 'pro', false),
  proposals: A('Proposals', 'Leads, proposals and engagement letters', 'file-pen', 'sky', 'standard', false),
  projects: A('Projects & tasks', 'Work broken into tasks and deadlines', 'square-kanban', 'violet', 'pro', false),
  timesheets: A('Timesheets', 'Hours by person, project and client', 'clock', 'cyan', 'pro', false),
  retainers: A('Retainer billing', 'Monthly fees, milestones, billable hours', 'receipt-text', 'orange', 'pro', false),
  contracts: A('Contracts & renewals', 'Agreements, renewal dates and reminders', 'signature', 'pink', 'pro', false),
  tickets: A('Service requests', 'Complaints and jobs from customers', 'headset', 'rose', 'pro', false),
  schedule: A('Scheduling', 'Assign technicians by day and area', 'calendar-days', 'blue', 'pro', false),
  techapp: A('Technician app', 'Visit report, photos and customer signature', 'smartphone', 'indigo', 'pro', false),
  amc: A('AMC', 'Annual contracts, visits due and renewals', 'refresh-cw', 'green', 'pro', false),
  spares: A('Spare parts', 'Parts in the van and in the store', 'boxes', 'teal', 'pro', false),
  // Standard; parts from stock need Inventory, so that part is Pro.
  jobcards: A('Job cards', 'Repairs at your counter: take an item in, estimate, fix and hand it back', 'wrench', 'rose', 'standard', true),
};

export type TradeKey = 'manufacturing' | 'trading' | 'transport' | 'construction' | 'consulting' | 'field-service';

export interface Trade { key: TradeKey; label: string; example: string; icon: string; apps: AppId[]; presets: AppId[]; say: string }

export const TRADES: Trade[] = [
  { key: 'manufacturing', label: 'Manufacturing', example: 'Fabrication, machining, plastics, food, printing', icon: 'factory',
    apps: ['sales', 'production', 'inventory', 'warehouse', 'purchase', 'dispatch', 'quality', 'maintenance', 'jobwork', 'attendance', 'payroll'],
    presets: ['sales', 'production', 'inventory', 'purchase', 'dispatch', 'attendance', 'payroll'],
    say: 'Ready today for factories: quote, make, stock, check quality, send material out for job work, look after your machines, dispatch, bill and pay your people.' },
  { key: 'trading', label: 'Trading & distribution', example: 'Wholesale, dealers, distributors', icon: 'boxes',
    apps: ['sales', 'inventory', 'warehouse', 'purchase', 'dispatch', 'quality', 'pricelist', 'collections', 'fieldsales', 'distributors', 'jobcards', 'attendance', 'payroll'],
    presets: ['sales', 'inventory', 'purchase', 'dispatch', 'pricelist'],
    say: 'Buy, check and stock in bins, sell on dealer price lists and schemes, take orders at the shop with field sales, deliver, bill and chase what is owed, pay distributors or salesmen their commission, and take in repairs at your counter.' },
  { key: 'transport', label: 'Transport & logistics', example: 'Lorries, tankers, movers', icon: 'truck',
    apps: ['trips', 'freight', 'fleet', 'drivers', 'fuel', 'maintenance', 'inventory', 'warehouse', 'sales', 'collections', 'attendance', 'payroll'],
    presets: ['trips', 'freight', 'fleet', 'drivers', 'fuel', 'maintenance', 'payroll'],
    say: 'GST invoicing, quotations, collections, payroll and vehicle maintenance work today. Trips, LR and freight billing are being built.' },
  { key: 'construction', label: 'Construction', example: 'Contractors, sand and building supply', icon: 'building',
    apps: ['sites', 'boq', 'sitematerial', 'sales', 'inventory', 'warehouse', 'purchase', 'dispatch', 'labour', 'subcontract', 'equipment', 'maintenance', 'attendance', 'payroll'],
    presets: ['sites', 'boq', 'sitematerial', 'sales', 'inventory', 'purchase', 'dispatch', 'labour', 'payroll'],
    say: 'Building supply works today: stock, purchase, dispatch, bills and machine maintenance. Sites, BOQ and RA bills are being built.' },
  { key: 'consulting', label: 'Consulting & services', example: 'CAs, agencies, consultants', icon: 'briefcase',
    apps: ['proposals', 'projects', 'timesheets', 'retainers', 'sales', 'contracts', 'attendance', 'payroll'],
    presets: ['proposals', 'projects', 'timesheets', 'retainers', 'sales'],
    say: 'GST invoicing, quotations and payroll work today. Projects, timesheets and retainers are being built.' },
  { key: 'field-service', label: 'Field service & AMC', example: 'Installation, repairs, AMC', icon: 'wrench',
    apps: ['jobcards', 'tickets', 'schedule', 'techapp', 'amc', 'spares', 'warehouse', 'sales', 'contracts', 'attendance', 'payroll'],
    presets: ['jobcards', 'tickets', 'schedule', 'techapp', 'amc', 'spares', 'sales'],
    say: 'Job cards for repairs at your counter, GST invoicing, quotations and payroll work today. Service requests, AMC and the technician app are being built.' },
];

/** What every business gets, whatever apps it switches on. */
export const CORE: [string, string, Tone][] = [
  ['Invoicing', 'receipt-text', 'orange'], ['Customers', 'users', 'blue'], ['Items and rates', 'package', 'teal'], ['Reports', 'chart-no-axes-combined', 'slate'],
];

/** Coming soon, grouped by trade. */
export const SOON_GROUPS: [string, string, AppId[]][] = [
  ['Transport', 'truck', ['trips', 'freight', 'fleet', 'drivers', 'fuel']],
  ['Construction', 'building', ['sites', 'boq', 'sitematerial', 'labour', 'subcontract', 'equipment']],
  ['Consulting', 'briefcase', ['proposals', 'projects', 'timesheets', 'retainers', 'contracts']],
  ['Field service', 'wrench', ['tickets', 'schedule', 'techapp', 'amc', 'spares']],
];

/** Prices (werkfox-app plans, feat/pro-trial 3491b04). Yearly = 10 months. Plus 18% GST. */
export const PLANS = {
  pro: { month: '₹1,999', year: '₹19,990', perMonthYearly: '₹1,666', users: 15, locations: 5 },
  standard: { month: '₹999', year: '₹9,990', perMonthYearly: '₹833', users: 5, locations: 1 },
};
