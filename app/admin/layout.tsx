import type { Metadata } from 'next';
import './admin.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: '관리자 통계', robots: { index: false, follow: false } };
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell">{children}</div>;
}
