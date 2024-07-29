import { SupabaseApi } from '@/api/supabase.api';
import PostDetail from '../_components/PostDetail';
import PostList from '../_components/PostList';
import CommentPanel from '../_components/CommentPanel';

interface Props {
  params: { id: string };
}

async function PostDetailPage({ params }: Props) {
  const postId = params.id;
  const postDetail = await SupabaseApi.getPostDetail(params.id);

  if (!postDetail) {
    return <main>Error Fetching Post Detail</main>;
  }

  return (
    <main className='flex flex-col gap-5'>
      <PostDetail postDetail={postDetail} />
      <CommentPanel postId={postId} />
      <PostList />
    </main>
  );
}

export default PostDetailPage;
