interface Props {
  placeholder: string;
  name: string;
  defaultValue: string | undefined;
}

function TextInput({ placeholder, name, defaultValue }: Props) {
  return (
    <input
      className='w-[100%] h-[50px] rounded-[12px] bg-[#f5f6f8] px-[16px]'
      placeholder={placeholder}
      name={name}
      defaultValue={defaultValue}
    />
  );
}

export default TextInput;
