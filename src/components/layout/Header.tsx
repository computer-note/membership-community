import Link from 'next/link';

function Header() {
  return (
    <header className='bg-green-300'>
      <span>Header</span>
      <Link href={'/admin'}>Admin 페이지로</Link>
    </header>
  );
}

export default Header;
