// CRM pages use the main admin layout sidebar
// This layout just passes through children
export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
