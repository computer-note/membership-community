export type UserInfoType = {
  id: string; //uuid
  email: string;
  created_at: Date;
  nickname: string;
  profile_img: string | null;
  last_visited: Date | null;
  visit_count: number;
  rank_name: string;
  rank_level: number;
  is_banned: boolean;
};

//포스트 요약 정보 (포스트 리스트에서 사용)
export type PostItemType = {
  id: string; //uuid
  title: string;
  created_at: Date;
  visited_count: number;
  board_name: string;
  board_rank_level: number;
  user_nickname: string;
  user_rank_name: string;
  user_id: string;
};

export type PostDetailType = {
  id: string; //uuid
  title: string;
  created_at: Date;
  price: string;
  item_img: string;
  visited_count: number;
  content: string;
  user_nickname: string;
  user_rank_name: string;
  user_id: string;
  board_name: string;
};

export type PostFormType = {
  title: string;
  item_img: string;
  content: string;
  user_id: string;
  board_id: number;
};

export type CommentType = {
  id: string; //uuid
  created_at: Date;
  content: string;
  user_id: string;
  user_nickname: string;
  user_rank_name: string;
};

export type CommentCreateFormType = {
  content: string;
  user_id: string;
  post_id: string;
};

export type CommentModifyFormType = {
  content: string;
  comment_id: string;
};

export type RankType = {
  id: number; //int2 type
  name: string;
  level: number;
};

export type BoardType = {
  id: number; //int2 type
  name: string;
  rank_level: number;
  rank_name: string;
};

export type LoginFormInfo = {
  email: string;
  password: string;
};

export type SignupFormType = {
  email: string;
  password: string;
  nickname: string;
  profile_img: string;
};
