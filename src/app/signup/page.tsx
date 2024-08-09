import SignupForm from './_components/SignupForm';

function SignupPage() {
  return (
    <div>
      <div className='mb-[24px]'>
        <h1 className='text-[32px] font-[700] leading-[38px]'>
          카페 가입하기
        </h1>
        <p className='text-[11px] text-[#676767] '>
          카페 가입을 위한 정보를 입력해주세요
        </p>
      </div>

      <SignupForm />
    </div>
  );
}

export default SignupPage;
