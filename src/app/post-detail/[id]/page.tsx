import { SupabaseServerApi } from '@/api/supabase.server.api';
import PostDetail from '../_components/PostDetail';
import CommentPanel from '../_components/CommentPanel';

interface Props {
  params: { id: string };
}

async function PostDetailPage({ params }: Props) {
  const postId = params.id;
  const postDetail = await SupabaseServerApi.getPostDetail(postId);

  if (!postDetail) {
    return <>Error Fetching Post Detail</>;
  }

  return (
    <div className='flex flex-col border border-[#ebecef] rounded-[6px] p-[29px] mr-[5px]'>
      <PostDetail postDetail={postDetail} />
      <CommentPanel postId={postId} />
    </div>
  );
}

export default PostDetailPage;
