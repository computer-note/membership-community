import { SupabaseServerApi } from '@/api/supabase.server.api';
import PostWriteForm from '../_components/PostWriteForm';

interface Props {
  params: { board_id: string };
}

//Todo. 로그인하지 않은 유저가 하드내비게이션으로 해당 페이지에 접근했을 때 리다이렉트하는 로직
async function PostWritePage({ params: { board_id } }: Props) {
  const user = await SupabaseServerApi.getUser();

  if (!user) {
    return <p>로그인한 사용자만 게시글을 작성할 수 있습니다.</p>;
  }

  return <PostWriteForm board_id={+board_id} user_id={user.id} />;
}

export default PostWritePage;
