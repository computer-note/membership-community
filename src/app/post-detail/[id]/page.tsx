import { SupabaseServerApi } from '@/api/supabase.server.api';

import DataValidator from '../_components/DataValidator';
import PostDetail from '../_components/PostDetail';
import CommentPanel from '../_components/CommentPanel';
import BottomButtons from '../_components/BottomButtons';
import Redirector from '../_components/Redirector';

interface Props {
  params: { id: string };
}

async function PostDetailPage({ params }: Props) {
  const postId = params.id;
  const postDetail = await SupabaseServerApi.getPostDetail(postId);

  if (!postDetail) {
    return <Redirector />;
  }

  return (
    <>
      <div className='flex flex-col border border-[#ebecef] rounded-[6px] p-[29px] mr-[5px]'>
        <PostDetail postDetail={postDetail!} />
        <CommentPanel postId={postId} />
      </div>

      <BottomButtons
        className='mt-[13px]'
        postId={postId}
        boardId={postDetail?.board_id!}
      />
    </>
  );
}

export default PostDetailPage;
