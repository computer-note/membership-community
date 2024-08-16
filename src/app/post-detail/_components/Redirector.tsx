'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Redirector() {
  const router = useRouter();

  useEffect(() => {
    alert('존재하지 않는 게시글입니다.');
    router.push('/');
  }, []);

  return <></>;
}

export default Redirector;
