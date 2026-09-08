import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="container empty-page">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>이 페이지는 찾을 수 없어요.</h1>
      <p>견적 도우미에서 다시 시작해보세요.</p>
      <Link href="/" className="button button-primary">
        견적 도우미로 돌아가기
      </Link>
    </main>
  );
}
