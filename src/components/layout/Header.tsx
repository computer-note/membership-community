import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className='bg-green-300 w-[1080px]  mx-auto '>
      <div className='w-[1080px]'>
        <Image
          src={'/headerbanner_web_X2.png'}
          width={1080}
          height={130}
          alt={'banner'}
        />
      </div>
      <Link href={'/admin'}>Admin 페이지로</Link>
    </header>
  );
}

export default Header;
