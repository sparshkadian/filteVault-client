import { Dropdown, Space, MenuProps } from 'antd';

import { items } from '../constants';

const NavBar = () => {
  return (
    <div className='flex gap-5 p-5'>
      <p>TechTrade</p>
      <Dropdown menu={{ items }}>
        <Space className='cursor-pointer'>Laptops</Space>
      </Dropdown>

      {/* <Dropdown menu={{ items }}>
        <Space className='cursor-pointer'>Mobiles</Space>
      </Dropdown> */}
    </div>
  );
};

export default NavBar;
