import prisma from '@/lib/prisma';
import ContactsTable from './ContactsTable';

async function getContacts() {
  const contacts = await prisma.contacts.findMany({
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
  const contacts = await getContacts();

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
