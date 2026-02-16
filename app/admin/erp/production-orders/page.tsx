import { redirect } from 'next/navigation';

export default function ProductionOrdersRedirect() {
  redirect('/admin/erp/production');
}
