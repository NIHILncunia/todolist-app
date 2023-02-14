import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import tw, { css } from 'twin.macro';

export function Nav() {
  const [ cookies, ] = useCookies([ 'id', ]);
  const navStyle = css`
    & > a {
      ${tw``}
    }
  `;

  return (
    <>
      <nav css={navStyle}>
        <Link to='/'>홈</Link>
        {!cookies.id && (
          <>
            <Link to='/signin'>로그인</Link>
            <Link to='/signup'>회원가입</Link>
          </>
        )}
      </nav>
    </>
  );
}
