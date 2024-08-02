import Link from 'next/link';

interface Props {
  id: string;
}

function WriteButton({ id }: Props) {
  return <Link href={`/post-write/${id}`}>글쓰기</Link>;
}

export default WriteButton;
