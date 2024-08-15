'use client';

import { SupabaseBrowserApi } from '@/api/supabase.browser.api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  postId: string;
  boardId: number;
  className: string;
}

function BottomButtons({ className, postId, boardId }: Props) {
  const router = useRouter();
  async function handlePostDeleteButtonClick() {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      await SupabaseBrowserApi.deletePost(postId);

      alert('삭제되었습니다.');

      router.push(`/board/${boardId}`);
    }
  }

  return (
    <section className={className}>
      <Link
        href={`/post-write?post_id=${postId}`}
        className='w-[52px] h-[36px] mr-[10px] inline-block bg-[#EFF0F2] text-[13px] font-[700] text-center content-center'
      >
        수정
      </Link>

      <button
        onClick={handlePostDeleteButtonClick}
        className='w-[52px] h-[36px] mr-[10px] inline-block bg-[#EFF0F2] text-[13px] font-[700] text-center content-center'
      >
        삭제
      </button>
    </section>
  );
}

export default BottomButtons;
