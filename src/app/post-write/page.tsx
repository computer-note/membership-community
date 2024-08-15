import { SupabaseServerApi } from '@/api/supabase.server.api';
import PostWriteForm from './_components/PostWriteForm';
import { type PostDetailType } from '@/types/common';

interface Props {
  searchParams: {
    board_id?: string;
    post_id?: string;
  };
}

async function PostWritePage({
  searchParams: { board_id, post_id },
}: Props) {
  const user = await SupabaseServerApi.getUser();

  let postDetail: PostDetailType | null = null;
  if (post_id) {
    postDetail = await SupabaseServerApi.getPostDetail(post_id);
  }

  let defaultSelectedBoardId: string | '' = '';
  if (board_id) {
    defaultSelectedBoardId = board_id;
  } else if (postDetail) {
    defaultSelectedBoardId = postDetail.board_name;
  }

  return (
    <PostWriteForm
      postDetail={postDetail}
      defaultSelectedBoardId={defaultSelectedBoardId}
      user_id={user?.id!}
      user_level={user?.rank_level!}
    />
  );
}

export default PostWritePage;
