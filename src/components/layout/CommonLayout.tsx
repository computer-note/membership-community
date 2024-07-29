import { PropsWithChildren } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

/*
  CommonLayout 구현
  관리자페이지에서는 사이드바를 표시하지 않습니다.
*/
function CommonLayout({ children }: PropsWithChildren) {
  return (
    <>
      <body className='flex flex-col gap-5'>
        <Header />
        <div className='flex gap-5'>
          <Sidebar />
          {children}
        </div>
      </body>
    </>
  );
}

export default CommonLayout;
