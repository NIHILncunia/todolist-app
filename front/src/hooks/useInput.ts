import { MutableRefObject, useCallback, useState } from 'react';

export function useInput(ref: MutableRefObject<HTMLInputElement>) {
  const [ value, setValue, ] = useState('');

  const onChange = useCallback(() => {
    setValue(ref.current.value);
  }, []);

  return {
    value,
    onChange,
  };
}
