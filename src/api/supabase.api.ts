import {
  BoardType,
  PostDetailType,
  PostItemType,
  UserInfoType,
} from '@/types/common';
import { type PaginationInfoType } from '@/types/utils';

//dummy datas
import {
  comment1,
  comment2,
  comment3,
  comment4,
  postDetail1,
  postDetail2,
  userInfo1,
  userInfo2,
} from '@/dummy-data/dummy-data';
import { createClient } from '@/supabase/server';

export class SupabaseApi {
  static async getPostList(
    boardId: number,
    paginationInfo?: PaginationInfoType
  ): Promise<PostItemType[]> {
    const supabase = createClient();
    const { data: dbPostList, error } = await supabase
      .from('posts')
      .select(
        `id, title, created_at, visited_count,
        board: boards ( 
          id, name,
          ranks ( 
            name, level, id 
          )
        ),
        user: users (
          id, nickname, 
          ranks ( 
            name, level, id
          )
        )
      `
      )
      .eq('board_id', boardId);

    const apiPostList = dbPostList?.map<PostItemType>(
      ({ id, title, visited_count, created_at, board, user }) => ({
        id,
        title,
        visited_count,
        created_at: new Date(created_at),
        board_name: board?.name!,
        board_rank_level: board?.ranks?.level!,
        user_nickname: user?.nickname!,
        user_rank_name: user?.ranks?.name!,
        user_id: user?.id!,
      })
    );

    return apiPostList!;
  }

  static async getBoardList(): Promise<BoardType[]> {
    const supabase = createClient();
    const { data: dbBoardList, error } = await supabase.from('boards')
      .select(`
        name,
        id,
        ranks (name, level, id)
      `);

    const apiBoardList = dbBoardList?.map<BoardType>(
      ({ id, name, ranks }) => ({
        id: id,
        name: name,
        rank: {
          id: ranks?.id!,
          level: ranks?.level!,
          name: ranks?.name!,
        },
      })
    );

    return apiBoardList!;
  }

  static async getPostDetail(
    postId: string
  ): Promise<PostDetailType | null> {
    const allPostDetails = [postDetail1, postDetail2];

    const postDetailByPostId = allPostDetails.find(
      postDetail => postDetail.id === postId
    );

    if (!postDetailByPostId) {
      return null;
    }

    return postDetailByPostId;
  }

  static async getCommentList(postId: string) {
    const allComments = [comment1, comment2, comment3, comment4];

    const commentList = allComments.filter(
      comment => comment.postId === postId
    );

    return commentList;
  }

  static async getUserList(): Promise<UserInfoType[]> {
    const allUserList = [userInfo1, userInfo2];

    return allUserList;
  }

  static async test() {
    const supabase = createClient();
    const result = await supabase.from('ranks').select();

    return result;
  }
}
