export interface ITodo {
  id: number;
  todo: string;
  userId: number;
  status: ('ADDED' | 'PROGRESS' | 'DONE');
}

export interface IUser {
  id: number;
  email: string;
  userName: string;
  password: string;
}

export interface NewUser {
  email: string;
  userName: string;
  password: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface IMyUser {
  id: number;
  email: string;
  userName: string;
}
