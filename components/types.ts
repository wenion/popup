export type UserInfo = {
  name: string;
  email: string;
  image: string;
};

export type UserContext = {
  expires: string | null;
  user: UserInfo | null;
};