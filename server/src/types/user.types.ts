export interface UserWithOutPassword {
  id: number;
  email: string;
  userName: string;
}

export interface MyUserInfo extends UserWithOutPassword {
  refreshToken: string;
}
