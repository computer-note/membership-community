'use client';

import { Dispatch, SetStateAction } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  setEditorContent: Dispatch<SetStateAction<string>>;
  defaultValue: string;
}

function Editor({ setEditorContent, defaultValue }: Props) {
  const modules = {
    toolbar: {
      container: [
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
      ],
    },
  };

  function handleOnChange(value: string) {
    setEditorContent(value);
  }

  return (
    <ReactQuill
      defaultValue={defaultValue}
      modules={modules}
      onChange={handleOnChange}
    />
  );
}

export default Editor;
