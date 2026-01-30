import ContactsTable from './ContactsTable';

// Demo contacts data
const demoContacts = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@techcorp.com',
    phone: '+91 98765 43210',
    company: 'TechCorp Ltd',
    message: 'Interested in your industrial products. Please share the catalog.',
    status: 'NEW',
    source: 'WEBSITE',
    createdAt: '2026-01-25T10:30:00.000Z',
    updatedAt: '2026-01-25T10:30:00.000Z',
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya@manufacturing.in',
    phone: '+91 87654 32109',
    company: 'Priya Manufacturing',
    message: 'Need a quote for bulk order of labels.',
    status: 'CONTACTED',
    source: 'REFERRAL',
    createdAt: '2026-01-22T14:15:00.000Z',
    updatedAt: '2026-01-23T09:00:00.000Z',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit.k@gmail.com',
    phone: '+91 76543 21098',
    company: null,
    message: 'Looking for barcode printers for my retail shop.',
    status: 'QUALIFIED',
    source: 'GOOGLE',
    createdAt: '2026-01-20T08:45:00.000Z',
    updatedAt: '2026-01-21T11:20:00.000Z',
  },
  {
    id: 4,
    name: 'Sunita Verma',
    email: 'sunita@sharmasteel.in',
    phone: '+91 65432 10987',
    company: 'Sharma Steel Works',
    message: 'Partnership inquiry for packaging solutions.',
    status: 'CONVERTED',
    source: 'LINKEDIN',
    createdAt: '2026-01-15T16:00:00.000Z',
    updatedAt: '2026-01-18T10:30:00.000Z',
  },
];

export default function ContactsPage() {
  const contacts = demoContacts;

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
