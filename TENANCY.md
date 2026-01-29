# Multi-tenancy (Organizations) — Notes

What changed
- Added `Organization` and `OrganizationMember` Prisma models.
- Added optional `organizationId` fields to core models: `Customer`, `Lead`, `Product`, `Opportunity`, `Invoice`, `QuoteRequest` and added indexes.
- Added a backfill script: `scripts/backfill-organization.mjs` to create a default org and assign existing records.

Recommended next steps
1. Run database schema apply:
   - `pnpm prisma db push` (or your usual migration flow `prisma migrate dev`)
2. Run backfill script to assign existing rows to a default org:
   - `pnpm run db:tenancy-backfill`
3. Update `lib/auth.ts` to return organization membership and `currentOrg` (it now respects a `werkfox_current_org` cookie if present).
4. Added an org-selection page and org-switcher UI in `app/admin` (header) and enforcement of `currentOrg` in `app/admin/layout.tsx`.
   - New API routes: `POST /api/admin/organizations/switch` (sets a cookie) and `POST /api/admin/organizations/create` (create org + membership).
5. Add per-org RBAC checks using `OrganizationMember.role` (Owner/Admin/Member).
6. Add tests and any audit logging for tenant-critical operations.

Notes
- `organizationId` was added as nullable so the migration/backfill can be done safely in-place.
- The backfill script uses `slug: 'default'` for the default org; change as needed.

If you want, I can now update `lib/auth.ts` (add org membership) and scaffold the org-selection UI.