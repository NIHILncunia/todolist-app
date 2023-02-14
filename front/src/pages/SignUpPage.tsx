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
      <AppLayout title='회원가입' url='/signup'>
        <div id='signup-page'>
          <h2>회원가입</h2>
          <form onSubmit={onSubmitButton}>
            <label htmlFor='email'>
              이메일 : <input
                type='email'
                id='email'
                ref={emailRef}
                {...email}
              />
            </label>
            {!email.value && <p>이메일을 입력해주세요.</p>}
            <label htmlFor='userName'>
              닉네임 : <input
                type='text'
                id='userName'
                ref={userNameRef}
                {...userName}
              />
            </label>
            {!userName.value && <p>닉네임을 입력해주세요.</p>}
            <label htmlFor='password'>
              비밀번호 : <input
                type='password'
                id='password'
                value={password}
                onChange={onChangePassword}
              />
            </label>
            <label htmlFor='password-check'>
              비밀번호 확인 : <input
                type='password'
                id='password-check'
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
            </label>
            {passwordCheckError && <p>비밀번호가 일치하지 않습니다.</p>}
            <button>가입</button>
          </form>

          <div>
            {isLoading && (
              <p>로딩중...</p>
            )}

            {isError && (
              <p>에러: {error.response.data.message}</p>
            )}

            {isSuccess && (
              <p>회원가입이 완료되었습니다. 5초 후 로그인 페이지로 이동합니다.</p>
            )}
          </div>
        </div>
      </AppLayout>
    </>
  );
}
