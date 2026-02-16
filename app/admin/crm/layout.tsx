import SubNav from '../components/SubNav';

const crmNavItems = [
  { name: 'Overview', href: '/admin/crm' },
  { name: 'Leads', href: '/admin/crm/leads' },
  { name: 'Opportunities', href: '/admin/crm/opportunities' },
  { name: 'Activities', href: '/admin/crm/activities' },
  { name: 'Contacts', href: '/admin/crm/contacts' },
  { name: 'Customers', href: '/admin/customers' },
];

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNav items={crmNavItems} />
      <div className="admin-content-area">
        {children}
      </div>
    </>
  );
}
