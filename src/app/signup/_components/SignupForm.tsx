'use client';

import SignupField from './SignupField';
import ImageUpload from '@/components/ImageUpload';
import InputWithValidation from '@/components/InputWithValidation';
import TermItem from './TermItem';

import { useState } from 'react';

function SignupForm() {
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [nicknameWithValidity, setNicknameWithValidity] = useState<
    ValueWithValidityType<string>
  >({
    value: '',
    isValid: true,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElem = e.target as HTMLFormElement;
    const formData = new FormData(formElem);
    const signupTermItems = [
      formData.get('signup-term-1'),
      formData.get('signup-term-2'),
      formData.get('signup-term-3'),
    ];

    if (!nicknameWithValidity.isValid) {
      alert('닉네임이 유효하지 않습니다.');
      return;
    }

    if (signupTermItems.some(value => value === null)) {
      alert('약관에 모두 동의해주세요.');
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[20px] border border-[#ebecef] rounded-[6px] py-[8px] px-[32px] text-[13px] mr-[12px]'>
        <SignupField title='카페설명'>
          <div>중고나라 카페 모든 상품은 공식 사이트에도 있어요</div>
        </SignupField>

        <SignupField title='가입안내'>
          <div>
            중고거래 1등 플랫폼 중고나라입니다. 아래 질문을 확인 후
            가입을 완료해 주세요. 중고나라는 공식 APP도 있습니다.
            다양한 혜택을 누려보세요!!
          </div>
        </SignupField>

        <SignupField title='프로필 이미지'>
          <ImageUpload
            setProfileImg={setProfileImg}
            defaultImgUrl={'default_profile.png'}
            imageSize={'88px'}
            labelText={'프로필은 카페별로 설정할 수 있습니다.'}
          />
        </SignupField>

        <SignupField title='별명'>
          <InputWithValidation
            inputValueWithValidity={nicknameWithValidity}
            setInputValueWithValidity={setNicknameWithValidity}
            regex={/^[0-9a-zA-Zㄱ-ㅣ가-힣]{3,}$/g}
            placeholderText='별명'
            validMessage='사용할 수 있는 별명입니다'
            invalidMessage='세 글자 이상의 한글, 영어, 숫자만 사용 가능합니다'
            maxLength={20}
            style={{ width: '340px' }}
          />
        </SignupField>
        <SignupField title='가입질문'>
          <div className='flex flex-col gap-[13px]'>
            <TermItem
              termContent='중고나라는 회원 간 거래에 개입하지 않으며, 이에 대한
              어떠한 보증이나 책임도 부담하지 않습니다. 또한 운영 정책
              숙지 부탁드리겠습니다.'
              agreeButtonLabel='네, 중고나라 카페 메뉴 공지사항 → 이용정책 → 중고나라
                통합 운영 정책 게시글을 확인하겠습니다.'
              htmlName='signup-term-1'
            />

            <TermItem
              termContent='중고나라에서는 이용 관련 정보 제공과 다양한 혜택, 이벤트
              관련 정보를 메일, 쪽지, 채팅 등을 통해 안내드릴 수
              있습니다.'
              agreeButtonLabel='네, 확인했습니다.'
              htmlName='signup-term-2'
            />

            <TermItem
              termContent='게시글은 중고나라 앱/사이트에 자동 노출되며, 신고 및
              모니터링될 경우 이용정책 및 게시글 작성 동의에 따라
              사기통합조회 DB로 수집/활용됩니다.'
              agreeButtonLabel='네, 동의합니다.'
              htmlName='signup-term-3'
            />
          </div>
        </SignupField>

        <div className='text-[#676767] text-[12px]'>
          질문 답변 시 회원님의 소중한 개인정보가 유출되지 않도록
          주의해주시기 바랍니다.
        </div>
      </div>

      <button className='mx-auto block my-[18px] text-[#009F47] font-[700] text-[13px] div-[12px] bg-[#03c75a1f] rounded-[6px] h-[36px] px-[12px]'>
        동의 후 가입하기
      </button>
    </form>
  );
}

export default SignupForm;
