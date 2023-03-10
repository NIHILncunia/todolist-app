import React, {
  ChangeEvent,
  FormEvent, useCallback, useRef, useState
} from 'react';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/layouts';
import { useInput } from '@/hooks';
import { IMyUser, NewUser } from '@/types/todos.types';
import { createUser, getMyUser } from '@/data/queries';
import { IError } from '@/types/error.types';

export function SignUpPage() {
  const [ password, setPassword, ] = useState('');
  const [ passwordCheck, setPasswordCheck, ] = useState('');
  const [ passwordCheckError, setPasswordCheckError, ] = useState(false);

  const emailRef = useRef<HTMLInputElement>();
  const userNameRef = useRef<HTMLInputElement>();

  const email = useInput(emailRef);
  const userName = useInput(userNameRef);

  const navi = useNavigate();

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordCheckError(e.target.value !== passwordCheck);
  }, [ passwordCheck, ]);

  const onChangePasswordCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    setPasswordCheckError(e.target.value !== password);
  }, [ password, ]);

  const user = useQuery<IMyUser, AxiosError<IError>>(
    [ 'getMyUser', ],
    getMyUser,
    {
      staleTime: 20000,
    }
  );

  console.log(user);

  const {
    isLoading, isError, error, mutate, isSuccess, data,
  } = useMutation<string, AxiosError<IError>, NewUser>((userData: NewUser) => createUser(userData));

  const onSubmitButton = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      setPasswordCheckError((prev) => !prev);

      return;
    }

    mutate({
      email: email.value,
      userName: userName.value,
      password,
    });
  }, [ email, userName, password, passwordCheck, ]);

  if (isSuccess) {
    setTimeout(() => (
      navi('/signin')
    ), 5000);
  }

  return (
    <>
      <AppLayout title='????????????' url='/signup'>
        <div id='signup-page'>
          <h2>????????????</h2>
          <form onSubmit={onSubmitButton}>
            <label htmlFor='email'>
              ????????? : <input
                type='email'
                id='email'
                ref={emailRef}
                {...email}
              />
            </label>
            {!email.value && <p>???????????? ??????????????????.</p>}
            <label htmlFor='userName'>
              ????????? : <input
                type='text'
                id='userName'
                ref={userNameRef}
                {...userName}
              />
            </label>
            {!userName.value && <p>???????????? ??????????????????.</p>}
            <label htmlFor='password'>
              ???????????? : <input
                type='password'
                id='password'
                value={password}
                onChange={onChangePassword}
              />
            </label>
            <label htmlFor='password-check'>
              ???????????? ?????? : <input
                type='password'
                id='password-check'
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
            </label>
            {passwordCheckError && <p>??????????????? ???????????? ????????????.</p>}
            <button>??????</button>
          </form>

          <div>
            {isLoading && (
              <p>?????????...</p>
            )}

            {isError && (
              <p>??????: {error.response.data.message}</p>
            )}

            {isSuccess && (
              <p>??????????????? ?????????????????????. 5??? ??? ????????? ???????????? ???????????????.</p>
            )}
          </div>
        </div>
      </AppLayout>
    </>
  );
}
