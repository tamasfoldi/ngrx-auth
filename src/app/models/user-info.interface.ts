export interface UserInfo {

  email_verified: boolean;
  email: string;
  clientID: string;
  updated_at: string;
  name: string;
  picture: string;
  user_id: string;
  nickname: string;
  identities: [
    {
      user_id: string;
      provider: string;
      connection: string;
      isSocial: boolean;
    }
  ];
  created_at: string;
  sub: string;
}
