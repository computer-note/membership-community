'use client';

import Link from 'next/link';

function PostButtons() {
  function handleDeleteButtonClick() {}

  function handleSelectAllCheckBoxChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const checkboxList = document.querySelectorAll<HTMLInputElement>(
      "input[type='checkbox']"
    );
    const changedValue = e.target.checked;

    checkboxList.forEach(
      checkbox => (checkbox.checked = changedValue)
    );
  }

  return (
    <section className='pl-[4px] mt-[10px] h-[34px] text-[12px] '>
      <div className='float-left'>
        <input
          onChange={handleSelectAllCheckBoxChange}
          type='checkbox'
        />
        <span className='ml-[6px]'>전체선택</span>
      </div>

      <div className='float-right'>
        <button
          onClick={handleDeleteButtonClick}
          className='w-[54px] h-[34px] rounded-[6px] bg-[#eff0f2] font-[700] '
        >
          삭제
        </button>
        <Link
          href={'/post-write'}
          className='w-[66px] h-[34px] rounded-[6px] bg-[#eff0f2] font-[700] align-bottom content-center text-center inline-block ml-[12px] '
        >
          글쓰기
        </Link>
      </div>
    </section>
  );
}

export default PostButtons;
