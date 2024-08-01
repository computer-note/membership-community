import {
  BoardType,
  CommentType,
  PostDetailType,
  PostItemType,
  UserInfoType,
} from '@/types/common';
import { type PaginationInfoType } from '@/types/utils';

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

  static async getPostDetail(
    postId: string
  ): Promise<PostDetailType | null> {
    const supabase = createClient();
    const { data: dbPostDetail, error } = await supabase
      .from('posts')
      .select(
        `
        id, title, created_at, price, item_img, visited_count, content,
        user: users (
          nickname, id,
          rank: ranks (
            name
          )
        ),
        board: boards (
          name
        )
      `
      )
      .eq('id', postId)
      .single();

    const {
      content,
      created_at,
      id,
      item_img,
      price,
      title,
      visited_count,
      board,
      user,
    } = dbPostDetail!;

    const appPostDetail: PostDetailType = {
      content,
      created_at: new Date(created_at),
      id,
      item_img,
      price,
      title,
      visited_count,
      board_name: board?.name!,
      user_id: user?.id!,
      user_nickname: user?.nickname!,
      user_rank_name: user?.rank?.name!,
    };

    return appPostDetail;
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
        id, nickname, 
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
      })
    );

    return appCommentList ?? [];
  }

  static async getUserList(): Promise<UserInfoType[]> {
    const supabase = createClient();

    const { data: dbUserInfoList, error } = await supabase.from(
      'users'
    ).select(`
      id, email, created_at, nickname, profile_img, last_visited, visit_count, is_banned,
      rank: ranks (name, level)
    `);

    const appUserInfoList = dbUserInfoList?.map<UserInfoType>(
      ({
        created_at,
        email,
        id,
        is_banned,
        last_visited,
        nickname,
        profile_img,
        visit_count,
        rank,
      }) => ({
        created_at: new Date(created_at),
        last_visited: last_visited ? new Date(last_visited!) : null,
        email,
        id,
        is_banned,
        nickname,
        profile_img,
        visit_count,
        rank_level: rank?.level!,
        rank_name: rank?.name!,
      })
    );

    return appUserInfoList ?? [];
  }

  static async getUser(): Promise<UserInfoType> {
    const supabase = createClient();

    const { data: dbUser, error } = await supabase
      .from('users')
      .select()
      .single();
  }

  static async test() {
    const supabase = createClient();
    const result = await supabase.from('ranks').select();

    return result;
  }
}
