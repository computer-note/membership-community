interface Props {
  placeholder: string;
  name: string;
}

function TextInput({ placeholder, name }: Props) {
  return (
    <input
      className='w-[100%] h-[50px] rounded-[12px] bg-[#f5f6f8] px-[16px]'
      placeholder={placeholder}
      name={name}
    />
  );
}

export default TextInput;
