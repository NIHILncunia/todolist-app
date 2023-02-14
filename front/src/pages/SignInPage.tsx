import React, {
  FormEvent, useCallback, useEffect, useRef
} from 'react';
import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { AppLayout } from '@/layouts';
import { signInUser } from '@/data/queries';
import { useInput } from '@/hooks';
import { SignInUser } from '@/types/todos.types';

export function SignInPage() {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const email = useInput(emailRef);
  const password = useInput(passwordRef);

  const {
    isLoading, isError, error, mutate, isSuccess, data,
  } = useMutation((signInData: SignInUser) => {
    return signInUser(signInData);
  });

  const [ cookies, setCookie, ] = useCookies([ 'id', ]);

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      email: email.value,
      password: password.value,
    });
  }, [ email, password, ]);

  useEffect(() => {
    if (isSuccess) {
      console.log(cookies);
      setCookie('id', data.email);
    }
  }, [ isSuccess, data, ]);

  return (
    <>
      <AppLayout title='로그인' url='/login'>
        <div id='login-page'>
          <h2>로그인</h2>
          <form onSubmit={onSubmitForm}>
            <label htmlFor='email'>
              이메일 : <input
                type='text'
                id='email'
                ref={emailRef}
                {...email}
              />
            </label>
            <label htmlFor='password'>
              비밀번호 : <input
                type='password'
                id='password'
                ref={passwordRef}
                {...password}
              />
            </label>
            <button>로그인</button>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
