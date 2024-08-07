import Link from 'next/link';

interface Props {
  id: string;
}

function WriteButton({ id }: Props) {
  return (
    <div className='float-right w-[74px] h-[36px] border border-[#d3d3d3] flex items-center justify-center hover:underline hover:cursor-pointer'>
      <img src='/write_button.PNG' />
      <Link href={`/post-write/${id}`}>글쓰기</Link>
    </div>
  );
}

export default WriteButton;
