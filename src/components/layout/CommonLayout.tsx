import Header from './Header';
import Sidebar from './Sidebar';
import { PropsWithChildren } from 'react';

import AuthContextProvider from '@/providers/AuthContextProvider';
import { SupabaseServerApi } from '@/api/supabase.server.api';

/*
  CommonLayout 구현
  관리자페이지에서는 사이드바를 표시하지 않습니다.
*/
async function CommonLayout({ children }: PropsWithChildren) {
  const user = await SupabaseServerApi.getUser();

  return (
    <AuthContextProvider value={user}>
      <Header />
      <main className='w-[1080px] mx-auto flex gap-[20px]'>
        <Sidebar /> {/* 200px */}
        <section className='w-[860px]'>{children}</section>
      </main>
    </AuthContextProvider>
  );
}

export default CommonLayout;
