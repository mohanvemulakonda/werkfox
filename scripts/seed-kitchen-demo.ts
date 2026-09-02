import { PrismaClient, Prisma } from '@prisma/client';
const p = new PrismaClient();
const orgId = 90001;
const ts = Date.now().toString(36);

async function seed() {
  console.log('Seeding demo data...');

  // Customers via raw SQL (Prisma client stale)
  await p.$executeRawUnsafe(`INSERT INTO customers (organizationId, name, email, phone, billingAddress, city, state, createdAt, updatedAt) VALUES
    (${orgId}, 'Rajesh Mehta', 'rajesh.mehta@gmail.com', '+91 99887 76655', '12-A Banjara Hills', 'Hyderabad', 'Telangana', NOW(), NOW()),
    (${orgId}, 'Anjali Sharma', 'anjali.sharma@outlook.com', '+91 88776 65544', '45 Whitefield', 'Bengaluru', 'Karnataka', NOW(), NOW()),
    (${orgId}, 'Vikram Patel', 'vikram.patel@yahoo.com', '+91 77665 54433', '78 SG Highway', 'Ahmedabad', 'Gujarat', NOW(), NOW()),
    (${orgId}, 'Priya Nair', 'priya.nair@gmail.com', '+91 66554 43322', '34 MG Road', 'Kochi', 'Kerala', NOW(), NOW())`);
  console.log('Customers: 4');

  const custs: any[] = await p.$queryRawUnsafe(`SELECT id FROM customers WHERE organizationId = ${orgId} ORDER BY id DESC LIMIT 4`);

  // Invoices
  const inv = `WF-INV-${ts}`;
  await p.$executeRawUnsafe(`INSERT INTO invoices (organizationId, invoiceNumber, customerId, customerName, total, subtotal, taxAmount, status, currency, createdAt, updatedAt) VALUES
    (${orgId}, '${inv}-001', ${custs[3].id}, 'Rajesh Mehta', 285000, 241525, 43475, 'PAID', 'INR', DATE_SUB(NOW(), INTERVAL 45 DAY), NOW()),
    (${orgId}, '${inv}-002', ${custs[2].id}, 'Anjali Sharma', 425000, 360169, 64831, 'PAID', 'INR', DATE_SUB(NOW(), INTERVAL 30 DAY), NOW()),
    (${orgId}, '${inv}-003', ${custs[1].id}, 'Vikram Patel', 680000, 576271, 103729, 'SENT', 'INR', DATE_SUB(NOW(), INTERVAL 15 DAY), NOW()),
    (${orgId}, '${inv}-004', ${custs[0].id}, 'Priya Nair', 195000, 165254, 29746, 'PAID', 'INR', DATE_SUB(NOW(), INTERVAL 10 DAY), NOW()),
    (${orgId}, '${inv}-005', ${custs[3].id}, 'Rajesh Mehta', 340000, 288136, 51864, 'DRAFT', 'INR', DATE_SUB(NOW(), INTERVAL 3 DAY), NOW())`);
  console.log('Invoices: 5');

  // Leads
  await p.$executeRawUnsafe(`INSERT INTO leads (organizationId, name, email, phone, company, stage, status, source, industry, notes, city, state, leadScore, createdAt, updatedAt) VALUES
    (${orgId}, 'Suresh Reddy', 'suresh.reddy@gmail.com', '+91 98001 12345', 'Reddy Constructions', 'QUALIFIED', 'ACTIVE', 'REFERRAL', 'Real Estate', '12 kitchens for apartments. Budget 15-18L each.', 'Hyderabad', 'Telangana', 85, NOW(), NOW()),
    (${orgId}, 'Meena Iyer', 'meena.iyer@outlook.com', '+91 98002 23456', 'Iyer Residence', 'PROPOSAL_SENT', 'ACTIVE', 'WEBSITE', 'Residential', 'L-shape 120sqft Italian finish. Quoted 8.5L.', 'Chennai', 'Tamil Nadu', 72, NOW(), NOW()),
    (${orgId}, 'Arun Joshi', 'arun@joshiinteriors.com', '+91 98003 34567', 'Joshi Interiors', 'CONTACTED', 'ACTIVE', 'TRADE_SHOW', 'Interior Design', 'Channel partner potential. Does 8-10 kitchens/month.', 'Pune', 'Maharashtra', 90, NOW(), NOW()),
    (${orgId}, 'Fatima Khan', 'fatima.khan@gmail.com', '+91 98004 45678', 'Khan Farmhouse', 'NEW', 'ACTIVE', 'SOCIAL_MEDIA', 'Residential', 'Instagram lead. Modular kitchen for farmhouse.', 'Lucknow', 'Uttar Pradesh', 40, NOW(), NOW()),
    (${orgId}, 'Deepak Agarwal', 'deepak@agarwalbuilders.com', '+91 98005 56789', 'Agarwal Builders', 'NEGOTIATION', 'ACTIVE', 'REFERRAL', 'Real Estate', 'Bulk 25 kitchens for township. Negotiating volume discount.', 'Jaipur', 'Rajasthan', 95, NOW(), NOW()),
    (${orgId}, 'Kavitha Rao', 'kavitha.rao@gmail.com', '+91 98006 67890', 'Rao Duplex', 'QUALIFIED', 'ACTIVE', 'WEBSITE', 'Residential', 'Parallel kitchen + island. Premium segment 12-15L.', 'Bengaluru', 'Karnataka', 78, NOW(), NOW())`);
  console.log('Leads: 6');

  const leads: any[] = await p.$queryRawUnsafe(`SELECT id, name FROM leads WHERE organizationId = ${orgId} ORDER BY id DESC LIMIT 6`);

  // Opportunities
  await p.$executeRawUnsafe(`INSERT INTO opportunities (organizationId, name, leadId, value, stage, status, createdAt, updatedAt) VALUES
    (${orgId}, 'Mehta Kitchen - L-Shape Premium', ${leads[5].id}, 850000, 'QUALIFICATION', 'OPEN', NOW(), NOW()),
    (${orgId}, 'Agarwal Township - 25 Units Bulk', ${leads[1].id}, 3750000, 'NEGOTIATION', 'OPEN', NOW(), NOW()),
    (${orgId}, 'Iyer Residence - Italian Kitchen', ${leads[4].id}, 850000, 'PROPOSAL', 'OPEN', NOW(), NOW()),
    (${orgId}, 'Rao Duplex - Parallel + Island', ${leads[0].id}, 1400000, 'QUALIFICATION', 'OPEN', NOW(), NOW())`);
  console.log('Opportunities: 4');

  // Activities
  await p.$executeRawUnsafe(`INSERT INTO activities (organizationId, type, subject, description, leadId, createdAt, updatedAt) VALUES
    (${orgId}, 'CALL', 'Deepak Agarwal - bulk pricing discussion', 'Agreed 10% discount for 25+ units.', ${leads[1].id}, NOW(), NOW()),
    (${orgId}, 'EMAIL', 'Sent quotation to Meena Iyer', 'L-shape Italian finish Rs 8.5L.', ${leads[4].id}, NOW(), NOW()),
    (${orgId}, 'MEETING', 'Site visit - Kavitha Rao duplex', '140sqft parallel + 40sqft island. Premium fittings.', ${leads[0].id}, NOW(), NOW()),
    (${orgId}, 'NOTE', 'Arun Joshi partnership discussion', 'Wants 15% margin as channel partner.', ${leads[3].id}, NOW(), NOW()),
    (${orgId}, 'CALL', 'Follow-up with Suresh Reddy', 'Confirmed 12 kitchens for Phase 1.', ${leads[5].id}, NOW(), NOW())`);
  console.log('Activities: 5');

  // POs (location + vendors already created from previous run)
  const locs: any[] = await p.$queryRawUnsafe(`SELECT id FROM locations WHERE organizationId = ${orgId} LIMIT 1`);
  const vends: any[] = await p.$queryRawUnsafe(`SELECT id, name FROM vendors WHERE organizationId = ${orgId} ORDER BY id LIMIT 5`);

  if (locs.length > 0 && vends.length >= 3) {
    const po = `WF-PO-${ts}`;
    await p.$executeRawUnsafe(`INSERT INTO purchase_orders (organizationId, poNumber, vendorId, locationId, vendorName, subtotal, total, status, currency, createdAt, updatedAt) VALUES
      (${orgId}, '${po}-001', ${vends[0].id}, ${locs[0].id}, '${vends[0].name}', 111864, 132000, 'CONFIRMED', 'INR', NOW(), NOW()),
      (${orgId}, '${po}-002', ${vends[1].id}, ${locs[0].id}, '${vends[1].name}', 41102, 48500, 'SENT', 'INR', NOW(), NOW()),
      (${orgId}, '${po}-003', ${vends[2].id}, ${locs[0].id}, '${vends[2].name}', 64407, 76000, 'PARTIAL_RECEIVED', 'INR', NOW(), NOW())`);
    console.log('POs: 3');
  }

  console.log('\n✅ DEMO DATA READY!');
  console.log('Pipeline: ₹68.5L | Revenue: ₹9.1L');
}

seed().catch(e => console.error(e.message)).finally(() => p.$disconnect());
