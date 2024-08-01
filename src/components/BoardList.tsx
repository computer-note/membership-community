import { SupabaseApi } from '@/api/supabase.api';
import Link from 'next/link';

async function BoardList() {
  const boardList = await SupabaseApi.getBoardList();

  return (
    <section className='flex flex-col'>
      {boardList.map(board => (
        <Link
          href={`/board/${board.id}`}
        >{`${board.name} (${board.rank_name}) `}</Link>
      ))}
    </section>
  );
}

export default BoardList;
