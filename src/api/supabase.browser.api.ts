import { createClient } from '@/supabase/client';
import { UserInfoType } from '@/types/common';

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

  static async createComment(content, userId, postId) {
    const supabase = createClient();
  }
}
