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
    return <section>Error Fetching Post Detail</section>;
  }

  return (
    <section className='flex flex-col gap-5'>
      <PostDetail postDetail={postDetail} />
      <CommentPanel postId={postId} />
    </section>
  );
}

export default PostDetailPage;
