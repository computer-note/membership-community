export type UserInfoType = {
  id: string; //uuid
  email: string;
  created_at: Date;
  nickname: string;
  profile_img: string;
  last_visited: Date;
  visit_count: number;
  rank: RankType;
  is_banned: boolean;
};

//포스트 요약 정보 (포스트 리스트에서 사용)
export type PostItemType = {
  id: string; //uuid
  title: string;
  created_at: Date;
  visited_count: number;
  board: BoardType;
  userInfo: UserInfoType;
};

export type PostDetailType = {
  id: string; //uuid
  title: string;
  created_at: Date;
  price: number;
  item_img: string;
  visited_count: number;
  content: string;
  userInfo: UserInfoType;
  board: BoardType;
};

export type PostFormType = {
  title: string;
  item_img: string;
  content: string;
  user_id: string;
  board_id: string;
};

export type CommentType = {
  id: string; //uuid
  created_at: Date;
  content: string;
  post_id: string;
  userInfo: UserInfoType;
};

export type CommentFormType = {
  content: string;
  user_id: string;
  post_id: string;
};

export type RankType = {
  id: number; //int2 type
  name: string;
  level: number;
};

export type BoardType = {
  id: number; //int2 type
  name: string;
  rank: RankType;
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
