import axios from 'axios';
import {
  ITodo, IUser, NewUser, SignInUser
} from '@/types/todos.types';

const baseUrl = 'http://localhost:4000';

export const getTodos = async () => {
  const res = await axios.get<ITodo[]>(`${baseUrl}/todos`);

  return res.data;
};

export const getTodo = async (id: string) => {
  const res = await axios.get<ITodo>(`${baseUrl}/todos/${id}`);

  return res.data;
};

export const getUsers = async () => {
  const res = await axios.get<IUser[]>(`${baseUrl}/users`);

  return res.data;
};

export const getUserTodos = async (id: number) => {
  const res = await axios.get<ITodo[]>(`${baseUrl}/users/${id}/todos`);

  return res.data;
};

export const createUser = async (userData: NewUser) => {
  const res = await axios.post<string | null>(`${baseUrl}/auth/signup`, userData);

  return res.data;
};

export const signInUser = async (userData: SignInUser) => {
  const res = await axios.post(`${baseUrl}/auth/signin`, userData);

  return res.data;
};

export const getMyUser = async () => {
  const res = await axios.get(`${baseUrl}/auth/me`, {
    withCredentials: true,
  });

  return res.data;
};
