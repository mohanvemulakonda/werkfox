import prisma from '@/lib/prisma';
import ContactsTable from './ContactsTable';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function getContacts(orgId: number) {
  const contacts = await prisma.contacts.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: 'desc' },
  });

  return contacts.map(c => ({
    id: c.id,
    name: [c.firstName, c.lastName].filter(Boolean).join(' ') || 'Unnamed',
    email: c.email || '',
    phone: c.phone || '',
    company: c.company || null,
    message: c.notes || '',
    status: c.contactType || 'NEW',
    source: 'WEBSITE',
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));
}

export default async function ContactsPage() {
  const session = await auth();
  if (!session) redirect('/sign-in');
  if (!session.currentOrg) redirect('/admin/organizations/select');
  const orgId = session.currentOrg.id;

  const contacts = await getContacts(orgId);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacts</h1>
        <p className="text-gray-600">Manage all contact form submissions and leads</p>
      </div>

      <ContactsTable initialContacts={contacts} />
    </div>
  );
}
