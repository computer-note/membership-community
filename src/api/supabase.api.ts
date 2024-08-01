import {
  BoardType,
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

  static async getCommentList(postId: string) {
    return null;
  }

  static async getUserList(): Promise<UserInfoType[]> {
    return [];
  }

  static async test() {
    const supabase = createClient();
    const result = await supabase.from('ranks').select();

    return result;
  }
}
