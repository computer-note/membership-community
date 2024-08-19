interface Props extends React.PropsWithChildren {
  title: string;
}

function SignupField({ title, children }: Props) {
  return (
    <div className='flex border-b border-[#ebecef]'>
      <div className='font-[700] min-w-[108px]'>{title}</div>
      <div>{children}</div>
    </div>
  );
}

export default SignupField;
