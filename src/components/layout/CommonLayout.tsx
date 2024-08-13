import Header from './Header';
import Sidebar from './Sidebar';
import { PropsWithChildren } from 'react';

import AuthContextProvider from '@/providers/AuthContextProvider';
import { SupabaseServerApi } from '@/api/supabase.server.api';
import QueryProvider from '@/providers/QueryProvider';

async function CommonLayout({ children }: PropsWithChildren) {
  const user = await SupabaseServerApi.getUser();

  return (
    <AuthContextProvider value={user}>
      <QueryProvider>
        <Header />
        <main className='w-[1080px] mx-auto mt-[40px] flex gap-[20px]'>
          <Sidebar /> {/* 200px */}
          <section className='w-[860px]'>{children}</section>
        </main>
      </QueryProvider>
    </AuthContextProvider>
  );
}

export default CommonLayout;
