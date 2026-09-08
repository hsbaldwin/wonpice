import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: '저장한 견적 요청서',
  robots: { index: false, follow: false },
  alternates: { canonical: '/saved' },
};
export default function SavedPage() {
  redirect('/?view=saved#helper');
}
