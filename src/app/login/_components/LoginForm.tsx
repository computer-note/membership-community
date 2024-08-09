'use client';

import { useState } from 'react';
import LoginInput from './LoginInput';

function LoginForm() {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  return (
    <form className='w-[480px] h-[270px] rounded-[12px] pt-[84px] px-[18px] pb-[18px] mx-auto my-[24px] box-content'>
      <div
        id='login-inputs-div'
        className='w-[430px] h-[120px] mx-auto'
      >
        <LoginInput
          className='h-[50%] border rounded-tl-[8px] rounded-tr-[8px] pt-[27px] pr-[34px] pb-[8px] pl-[15px] '
          placeholder='이메일'
          setValue={setId}
          value={id}
        />

        <LoginInput
          className='h-[50%] border-x border-b rounded-bl-[8px] rounded-br-[8px] border-[#c5ccd2] pt-[27px] pr-[34px] pb-[8px] pl-[15px] '
          placeholder='비밀번호'
          setValue={setPw}
          value={pw}
        />
      </div>
      <button className='mx-auto block w-[430px] h-[50px] mt-[52px] py-[13px] bg-[#09aa5c] rounded-[8px] '>
        <span className='text-[#fff] font-[700] leading-[24px] text-[17px]'>
          로그인
        </span>
      </button>
    </form>
  );
}

export default LoginForm;
