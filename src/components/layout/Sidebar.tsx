import BoardList from './BoardList';
import InfoPanel from './InfoPanel';
import AccountDelete from './AccountDelete';

function Sidebar() {
  return (
    <aside className='w-[200px]'>
      <InfoPanel />
      <BoardList />
      <AccountDelete />
    </aside>
  );
}

export default Sidebar;
