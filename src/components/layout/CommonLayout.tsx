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
      <main className='flex gap-5'>
        <Sidebar />
        {children}
      </main>
    </AuthContextProvider>
  );
}

export default CommonLayout;
