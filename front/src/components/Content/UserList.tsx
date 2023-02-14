import React from 'react';
import { useQuery } from 'react-query';
import { css } from 'twin.macro';
import { getUsers } from '@/data/queries';
import { IUser } from '@/types/todos.types';
import { UserListItem } from './UserListItem';

export function UserList() {
  const {
    isLoading, isError, error, data,
  } = useQuery<IUser[], Error>(
    [ 'getUsers', ],
    getUsers,
    {
      staleTime: 20000,
    }
  );

  const userListStyle = css``;

  return (
    <>
      {isLoading && (
        <div>로딩중...</div>
      )}

      {isError && (
        <div>{error.message}</div>
      )}

      {data && data.length === 0 && (
        <div css={userListStyle}>
          <div className='empty-list'>
            <p>유저가 존재하지 않습니다.</p>
          </div>
        </div>
      )}

      {data && data.length !== 0 && (
        <div css={userListStyle}>
          {data.map((item) => (
            <UserListItem key={item.id} user={item} />
          ))}
        </div>
      )}
    </>
  );
}
