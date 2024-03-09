import { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target='_blank' href='https://www.antgroup.com'>
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target='_blank' href='https://www.aliyun.com'>
        2nd menu item
      </a>
    ),
  },
];

const spaceClass = 'hover:bg-gray-100 px-4 py-3 rounded-full';

const NavBar = () => {
  return (
    <div className='border navbar absolute z-[1] flex justify-center rounded-full bg-white shadow-2xl p-2 px-3'>
      <div className='flex gap-10  font-semibold cursor-pointer'>
        <Dropdown
          arrow
          placement='bottomCenter'
          className='sm:text-xl'
          menu={{ items }}
        >
          <Space className={`${spaceClass}`}>Laptops</Space>
        </Dropdown>
        <Dropdown
          arrow
          placement='bottomCenter'
          className='sm:text-xl'
          menu={{ items }}
        >
          <Space className={`${spaceClass}`}>Desktops</Space>
        </Dropdown>
        <Dropdown
          arrow
          placement='bottomCenter'
          className='sm:text-xl'
          menu={{ items }}
        >
          <Space className={`${spaceClass}`}>Mobiles</Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavBar;
