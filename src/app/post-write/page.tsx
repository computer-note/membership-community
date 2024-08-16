import { SupabaseServerApi } from '@/api/supabase.server.api';
import PostWriteForm from './_components/PostWriteForm';
import { type PostDetailType } from '@/types/common';
import { PostMethodType } from './_components/type';

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
  let defaultSelectedBoardId: string | '' = '';
  let postMethod: PostMethodType = 'create';

  //게시물 수정을 통해 post-write 페이지에 접근한 경우
  if (post_id) {
    postDetail = await SupabaseServerApi.getPostDetail(post_id);
    defaultSelectedBoardId = '' + postDetail?.board_id!;
    postMethod = 'modify';
  }

  //특정 게시판페이지에서 post-write 페이지에 접근한 경우
  if (board_id) {
    defaultSelectedBoardId = board_id;
  }

  return (
    <PostWriteForm
      postDetail={postDetail}
      defaultSelectedBoardId={defaultSelectedBoardId}
      user_id={user?.id!}
      user_level={user?.rank_level!}
      postMethod={postMethod}
    />
  );
}

export default PostWritePage;
