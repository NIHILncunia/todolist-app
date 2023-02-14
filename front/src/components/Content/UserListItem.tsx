import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ITodo, IUser } from '@/types/todos.types';
import { getUserTodos } from '@/data/queries';

interface IUserListItemProps {
  user: IUser;
}

export function UserListItem({ user, }: IUserListItemProps) {
  const {
    isLoading, isError, error, data,
  } = useQuery<ITodo[], Error>(
    [ 'getUserTodos', user.id, ],
    () => getUserTodos(user.id),
    {
      staleTime: 20000,
    }
  );

  return (
    <>
      {isLoading && (
        <div>불러오는 중...</div>
      )}

      {isError && (
        <div>{error.message}</div>
      )}

      {data && (
        <div key={user.id}>
          <p>
            <Link to={`/users/${user.id}`}>{user.userName}</Link>
            <span>(메모 : {data.length})</span>
          </p>
        </div>
      )}
    </>
  );
}
