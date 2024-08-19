'use client';

import { useState } from 'react';

interface Props {
  setInputValueWithValidity: React.Dispatch<
    React.SetStateAction<ValueWithValidityType<string>>
  >;
  inputValueWithValidity: ValueWithValidityType<string>;
  maxLength: number;
  placeholderText: string;
  validMessage: string;
  invalidMessage: string;
  regex: RegExp;
  style: React.CSSProperties;
}

function InputWithValidation({
  setInputValueWithValidity,
  inputValueWithValidity,
  maxLength,
  placeholderText,
  validMessage,
  invalidMessage,
  regex,
  style,
}: Props) {
  const [currentLength, setCurrentLength] = useState<number>(0);
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    setInputValueWithValidity({
      value: inputValue,
      isValid: regex.test(inputValue),
    });
    setCurrentLength(inputValue.length);
  }

  return (
    <div className='flex flex-col gap-[6px]'>
      <input
        className='bg-[#f5f6f8] h-[36px] px-[12px]'
        style={style}
        onChange={handleInputChange}
        placeholder={placeholderText}
        value={inputValueWithValidity.value}
        maxLength={maxLength}
      />

      <div className='flex gap-[24px] justify-between'>
        {inputValueWithValidity.isValid ? (
          <div className='text-[#009F47] text-[12px]'>
            {validMessage}
          </div>
        ) : (
          <div className='text-[#9F0047] text-[12px]'>
            {invalidMessage}
          </div>
        )}
        <div className='text-[#676767] text-[12px]'>
          <span
            className={
              currentLength >= maxLength ? 'text-[#9F0047]' : ''
            }
          >
            {currentLength}
          </span>
          <span>/{maxLength}자</span>
        </div>
      </div>
    </div>
  );
}

export default InputWithValidation;
