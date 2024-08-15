import { createClient } from '@/supabase/client';
import {
  BoardType,
  CommentCreateFormType,
  CommentModifyFormType,
  CommentType,
  PostFormType,
  PostItemType,
  UserInfoType,
} from '@/types/common';
import { PaginationInfoType } from '@/types/utils';

export class SupabaseBrowserApi {
  static async getUser(): Promise<UserInfoType> {
    const supabase = createClient();

    const { data: dbUser, error } = await supabase
      .from('users')
      .select(
        `
      created_at, email, id, is_banned, last_visited, nickname, profile_img, visit_count,
      rank: ranks(level, name)
      `
      )
      .limit(1)
      .single();

    const {
      created_at,
      email,
      id,
      is_banned,
      last_visited,
      nickname,
      profile_img,
      rank,
      visit_count,
    } = dbUser!;

    const appUser: UserInfoType = {
      created_at: new Date(created_at),
      last_visited: last_visited ? new Date(last_visited) : null,
      email,
      id,
      is_banned,
      nickname,
      profile_img,
      visit_count,
      rank_level: rank?.level!,
      rank_name: rank?.name!,
    };

    return appUser ?? null;
  }

  static async createComment({
    content,
    post_id,
    user_id,
  }: CommentCreateFormType) {
    const supabase = createClient();

    await supabase
      .from('comments')
      .insert({ post_id, user_id, content });
  }

  static async deleteComment(comment_id: string) {
    const supabase = createClient();

    await supabase.from('comments').delete().eq('id', comment_id);
  }

  static async modifyComment({
    content,
    comment_id,
  }: CommentModifyFormType) {
    const supabase = createClient();

    await supabase
      .from('comments')
      .update({ content })
      .eq('id', comment_id);
  }

  static async createPost({
    board_id,
    content,
    item_img,
    price,
    title,
    user_id,
  }: PostFormType) {
    const supabase = createClient();

    //Todo. 에러처리
    const { error } = await supabase.from('posts').insert({
      content,
      user_id,
      board_id,
      item_img,
      price,
      title,
    });

    console.log('error ↓');
    console.dir(error);
  }

  static async getPostListByUserId(
    userId: string
  ): Promise<PostItemType[]> {
    const supabase = createClient();

    const { data } = await supabase
      .from('posts')
      .select(
        `id, title, created_at, visited_count,
          board: boards (
            name,
            rank: ranks (
              level
            )
          ), 
          user: users (
            id, nickname, 
            rank: ranks (
              name
            )
          )
        `
      )
      .eq('user_id', userId);

    const appPostList = data?.map<PostItemType>(
      ({ created_at, id, title, user, board, visited_count }) => ({
        id,
        title,
        created_at: new Date(created_at),
        visited_count,
        user_id: user?.id!,
        user_nickname: user?.nickname!,
        user_rank_name: user?.rank?.name!,
        board_name: board?.name!,
        board_rank_level: board?.rank?.level!,
      })
    );

    return appPostList!;
  }

  static async getPostListByBoardId(
    boardId: number,
    paginationInfo?: PaginationInfoType
  ): Promise<PostItemType[]> {
    const supabase = createClient();
    const { data: dbPostList, error } = await supabase
      .from('posts')
      .select(
        `
        id, title, created_at, visited_count,
        board: boards ( 
          id, name,
          rank: ranks ( 
            name, level, id 
          )
        ),
        user: users (
          id, nickname, 
          rank: ranks ( 
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
        board_rank_level: board?.rank?.level!,
        user_nickname: user?.nickname!,
        user_rank_name: user?.rank?.name!,
        user_id: user?.id!,
      })
    );

    return apiPostList ?? [];
  }

  static async getCommentList(
    postId: string
  ): Promise<CommentType[]> {
    const supabase = createClient();

    const { data: dbCommentList, error } = await supabase
      .from('comments')
      .select(
        `
      id, created_at, content, 
      user: users (
        id, nickname, profile_img,
        rank: ranks (
          name
        )
      )
    `
      )
      .eq('post_id', postId);

    const appCommentList = dbCommentList?.map<CommentType>(
      ({ content, created_at, id, user }) => ({
        content,
        created_at: new Date(created_at),
        id,
        user_id: user?.id!,
        user_nickname: user?.nickname!,
        user_rank_name: user?.rank?.name!,
        user_profile_img: user?.profile_img!,
      })
    );

    return appCommentList ?? [];
  }

  static async deletePostList(postIdList: string[]) {
    const supabase = createClient();

    await supabase.from('posts').delete().in('id', postIdList);
  }

  static async getBoardList(): Promise<BoardType[]> {
    const supabase = createClient();
    const { data: dbBoardList, error } = await supabase.from('boards')
      .select(`
        name, id,
        rank: ranks (name, level)
      `);

    const apiBoardList = dbBoardList?.map<BoardType>(
      ({ id, name, rank }) => ({
        id,
        name,
        rank_level: rank?.level!,
        rank_name: rank?.name!,
      })
    );

    return apiBoardList ?? [];
  }
}
