export type UserInfo = {
  id: string;
  email: string;
};

export type UserContext = {
  user: UserInfo | null;
};