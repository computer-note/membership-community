'use client';

import { useRef, useState } from 'react';

interface Props {
  setProfileImg: React.Dispatch<React.SetStateAction<File | null>>;
  imageSize: string;
  defaultImgUrl: string;
  labelText: string;
}

function ImageUpload({
  setProfileImg,
  imageSize,
  defaultImgUrl,
  labelText,
}: Props) {
  const [previewImgURL, setPreviewImgUrl] =
    useState<string>(defaultImgUrl);
  const [fileInputValue, setFileInputValue] = useState<string>('');
  const fileInputElRef = useRef<HTMLInputElement | null>(null);

  function handleFileInputChange() {
    const fileInputEl = fileInputElRef.current!;
    const imageFile = fileInputEl.files?.item(0);

    if (!imageFile) {
      return;
    }

    if (previewImgURL !== defaultImgUrl) {
      URL.revokeObjectURL(previewImgURL);
    }

    const imageUrl = URL.createObjectURL(imageFile);

    setProfileImg(imageFile);
    setPreviewImgUrl(imageUrl);
    setFileInputValue(fileInputEl.value);
  }

  function handleOpenFilePickerClick(
    e: React.MouseEvent<HTMLElement>
  ) {
    e.preventDefault();

    const fileInputEl = fileInputElRef.current!;
    fileInputEl.showPicker();
  }

  function handleRemoveButtonClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    reset();
  }

  function reset() {
    setProfileImg(null);
    setFileInputValue('');
    setPreviewImgUrl(defaultImgUrl);
  }

  return (
    <div className='flex gap-[12px] w-fit'>
      <input
        type='file'
        accept='image/*'
        onChange={handleFileInputChange}
        value={fileInputValue}
        ref={fileInputElRef}
        className='hidden'
      />

      <div
        className='flex justify-center items-center'
        onClick={handleOpenFilePickerClick}
      >
        <img
          src={previewImgURL}
          style={{
            width: imageSize,
            height: imageSize,
            objectFit: 'contain',
          }}
        />
      </div>

      <div className='flex flex-col gap-[12px]'>
        <span className='text-[#676767]'>{labelText}</span>

        <div className='flex gap-[6px]'>
          <button
            onClick={handleOpenFilePickerClick}
            className='font-[700] w-[43px] h-[28px] border-[1px] rounded-[6px]'
          >
            등록
          </button>

          <button
            onClick={handleRemoveButtonClick}
            className='font-[700] w-[43px] h-[28px] border-[1px] rounded-[6px]'
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
