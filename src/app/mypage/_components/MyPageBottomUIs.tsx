'use client';

import Link from 'next/link';

function MyPageBottomUIs() {
  function handleDeleteButtonClick() {
    const checkboxElems = getCheckboxElements();
    const postIdsToDelete = checkboxElems
      .filter(checkboxElem => checkboxElem.checked)
      .map(checkboxElem => checkboxElem.dataset.postId!);

    if (postIdsToDelete.length) {
      return;
    }
  }

  function handleSelectAllCheckBoxChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const checkboxElems = getCheckboxElements();
    const changedValue = e.target.checked;

    checkboxElems.forEach(
      checkbox => (checkbox.checked = changedValue)
    );
  }

  function getCheckboxElements() {
    return Array.from(
      document.querySelectorAll<HTMLInputElement>(
        "input[type='checkbox'][data-post-id]"
      )
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
          className='w-[54px] h-[34px] rounded-[6px] bg-[#eff0f2] '
        >
          <span className='font-[700] '>삭제</span>
        </button>

        <Link
          href={'/post-write'}
          className='w-[66px] h-[34px] rounded-[6px] bg-[#eff0f2]  inline-block ml-[12px] align-bottom content-center text-center'
        >
          <span className='font-[700]'>글쓰기</span>
        </Link>
      </div>
    </section>
  );
}

export default MyPageBottomUIs;
