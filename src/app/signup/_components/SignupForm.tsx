'use client';

import Image from 'next/image';

function SignupForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className=''>
      <div className='flex flex-col border border-[#ebecef] rounded-[6px] py-[8px] px-[32px]  text-[13px] mr-[12px]'>
        <div className='flex border-b border-[#ebecef] py-[20px]'>
          <div className='font-[700] w-[108px]'>카페설명</div>
          <div>중고나라 카페 모든 상품은 공식 사이트에도 있어요</div>
        </div>

        <div className='flex   border-b border-[#ebecef] py-[20px]'>
          <div className='font-[700] min-w-[108px] '>가입안내</div>
          <div className='flex flex-wrap'>
            중고거래 1등 플랫폼 중고나라입니다. 아래 질문을 확인 후
            가입을 완료해 주세요. 중고나라는 공식 APP도 있습니다.
            다양한 혜택을 누려보세요!!
          </div>
        </div>

        <div className='flex border-b border-[#ebecef] py-[20px]'>
          <div className='font-[700] w-[108px]'>프로필 이미지</div>
          <div className='flex gap-[16px]'>
            <div>
              <Image
                src='/default_profile.png'
                height={88}
                width={88}
                alt='프로필'
              />
              <input
                type='file'
                accept='image/*'
                className='hidden'
              />
            </div>
            <div className='flex flex-col gap-[12px]'>
              <div className='text-[#676767]'>
                프로필은 카페별로 설정할 수 있습니다.
              </div>
              <div className='flex gap-[6px]'>
                <button className='font-[700] w-[43px] h-[28px] border-[1px] rounded-[6px]'>
                  등록
                </button>
                <button className='font-[700] w-[43px] h-[28px] border-[1px] rounded-[6px]'>
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex border-b border-[#ebecef] py-[20px]'>
          <div className='font-[700] w-[108px]'>별명</div>
          <div className='flex flex-col gap-[6px]'>
            <input
              className='bg-[#f5f6f8] w-[306px] h-[36px] px-[12px]'
              placeholder='별명'
            />
            <div className='flex justify-between'>
              <div className='text-[#009F47] text-[12px]'>
                사용할 수 있는 별명입니다
              </div>
              <div className='text-[#676767] text-[12px]'>
                5/20bytes
              </div>
            </div>
          </div>
        </div>

        <div className='flex py-[20px]'>
          <div className='font-[700] min-w-[108px]'>가입질문</div>
          <div className='flex flex-col gap-[13px]'>
            <div>
              중고나라는 회원 간 거래에 개입하지 않으며, 이에 대한
              어떠한 보증이나 책임도 부담하지 않습니다. 또한 운영 정책
              숙지 부탁드리겠습니다.
            </div>
            <div className='flex gap-[6px]'>
              <input type='radio' id='signup-agreement-1' />
              <label htmlFor='signup-agreement-3'>
                네, 중고나라 카페 메뉴 공지사항 → 이용정책 → 중고나라
                통합 운영 정책 게시글을 확인하겠습니다.
              </label>
            </div>
            <div>
              중고나라에서는 이용 관련 정보 제공과 다양한 혜택, 이벤트
              관련 정보를 메일, 쪽지, 채팅 등을 통해 안내드릴 수
              있습니다.
            </div>
            <div className='flex gap-[6px]'>
              <input type='radio' id='signup-agreement-2' />
              <label htmlFor='signup-agreement-3'>
                네, 확인했습니다.
              </label>
            </div>
            <div>
              게시글은 중고나라 앱/사이트에 자동 노출되며, 신고 및
              모니터링될 경우 이용정책 및 게시글 작성 동의에 따라
              사기통합조회 DB로 수집/활용됩니다.
            </div>
            <div className='flex gap-[6px]'>
              <input type='radio' id='signup-agreement-3' />
              <label htmlFor='signup-agreement-3'>
                네, 동의합니다
              </label>
            </div>
            <div className='text-[#676767] text-[12px]'>
              질문 답변 시 회원님의 소중한 개인정보가 유출되지 않도록
              주의해주시기 바랍니다.
            </div>
          </div>
        </div>
      </div>

      <button className='mx-auto block my-[18px] text-[#009F47] font-[700] text-[13px] div-[12px] bg-[#03c75a1f] rounded-[6px] h-[36px] px-[12px]'>
        동의 후 가입하기
      </button>
    </form>
  );
}

export default SignupForm;
