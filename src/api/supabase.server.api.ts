import {
  BoardType,
  CommentType,
  PostDetailType,
  PostItemType,
  UserInfoType,
} from '@/types/common';
import { type PaginationInfoType } from '@/types/utils';

import { createClient } from '@/supabase/server';

export class SupabaseServerApi {
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
          nickname, id, profile_img,
          rank: ranks (
            name
          )
        ),
        board: boards (
          name, id
        )
      `
      )
      .eq('id', postId)
      .single();

    if (!dbPostDetail) {
      return null;
    }

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
      board_id: board?.id!,
      user_id: user?.id!,
      user_nickname: user?.nickname!,
      user_rank_name: user?.rank?.name!,
      user_profile_img: user?.profile_img!,
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
        last_visited: last_visited ? new Date(last_visited) : null,
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

  static async getUser(): Promise<UserInfoType | null> {
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

    if (!dbUser) {
      return null;
    }

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

    return appUser;
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
}
