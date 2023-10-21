import { Avatar, List, Popover } from 'antd';
import Notification from '../../../../component/template/Header/Notification';
import { useNavigate } from 'react-router-dom';
import { useCollapseSidebar } from '../../../../services/hooks/useCollapseSidebar';
import storage from '../../../../utils/sessionStorage';
import { useState } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';

const NavTool = () => {

  const [collapsed, setCollapsed] = useCollapseSidebar(false);
  const className = storage.get('class_name');
  const [open, setOpen] = useState<boolean>(false);

  // console.log(useMediaQuery(theme.breakpoints.up('sm')));

  const toggleCollapsed = () => {
    setCollapsed( !collapsed );
  };

  const userActions = [
    {
      title: 'logout'
    }
  ];

  const navigate = useNavigate();

  return (
    <div className='tool'>
    {/* <p>Lớp {className}</p> */}
    <Notification/>
    <Popover
      content={
        <List
          itemLayout='horizontal'
          dataSource={userActions}
          renderItem={(item, index) => (
      
          <ListItemStyled onClick={() => {storage.set('token', ''); navigate('/auth/sign-in');
            }}>
              <LogoutOutlined />
              {item.title}
            </ListItemStyled>
          )}
        />
      }
      placement='bottom'
      trigger="click"
      
      open={open}
      arrow={false}
      onOpenChange={(newValue) => setOpen(newValue)}
      ></Popover>
    <Avatar
      onClick={() => setOpen(true)}
      icon={<UserOutlined />}
    />
  </div>
  );
};

export default NavTool;

const ListItemStyled = styled(List.Item)`
  cursor: pointer;
  width: 100px;

  &:hover {
    background-color: #cccccc40;
  }

`;