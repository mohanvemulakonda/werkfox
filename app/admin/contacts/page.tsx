import prisma from '@/lib/prisma';
import ContactsTable from './ContactsTable';

async function getContacts() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Serialize dates to prevent hydration mismatch
  return contacts.map(contact => ({
    ...contact,
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString()
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
