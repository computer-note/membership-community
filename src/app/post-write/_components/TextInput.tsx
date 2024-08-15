interface Props {
  placeholder: string;
  htmlName: string;
  defaultValue: string | undefined;
}

function TextInput({ placeholder, htmlName, defaultValue }: Props) {
  return (
    <input
      className='w-[100%] h-[50px] rounded-[12px] bg-[#f5f6f8] px-[16px]'
      placeholder={placeholder}
      name={htmlName}
      defaultValue={defaultValue}
    />
  );
}

export default TextInput;
