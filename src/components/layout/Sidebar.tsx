import Link from 'next/link';
import BoardList from '../BoardList';
import InfoPanel from '../InfoPanel';
import AccountDelete from './AccountDelete';

function Sidebar() {
  return (
    <section className='flex flex-col bg-red-300'>
      <InfoPanel />
      <BoardList />
      <AccountDelete />
    </section>
  );
}

export default Sidebar;
