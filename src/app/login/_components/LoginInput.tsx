'use client';

interface Props {
  className: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

function LoginInput({
  className,
  placeholder,
  setValue,
  value,
}: Props) {
  return (
    <div
      className={`${className} border-[#c5ccd2] has-[:focus]:border-[#09aa5c] has-[:focus]:border-[2px] relative`}
    >
      <input
        onChange={e => setValue(e.target.value)}
        value={value}
        className='peer  w-[100%] hover:cursor-pointer focus:cursor-text focus:outline-none  '
      />
      <label className=' pointer-events-none transition-all duration-300 absolute left-[23px] bottom-[15px] text-[16px] text-[#00000061] peer-focus:left-[15px] peer-focus:bottom-[30px] peer-focus:text-[12px]'>
        {placeholder}
      </label>
    </div>
  );
}

export default LoginInput;
