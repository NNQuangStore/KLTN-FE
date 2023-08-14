import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { styled } from 'styled-components';
import StudentIcon from '../../../asset/svg/StudentIcon';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../utils/paths';


interface IMenuItem {
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: IMenuItem[],
  link?: string;
}

const MenuSidebar = ({collapsed} : {collapsed: boolean}) => {
  const navigate = useNavigate();
  const PATH_PRIVATE = PATH._PRIVATE;

  const getItem = (label: IMenuItem['label'], key: IMenuItem['key'], icon?: IMenuItem['icon'], children?: IMenuItem[]) => {
    return {
      key,
      icon,
      children,
      label,
    } as IMenuItem;
  };
  
  const getSubItem = (label: IMenuItem['label'], key: IMenuItem['key'], link?: IMenuItem['link']) => {
    return {
      label,
      key,
      onClick: () => {
        link && navigate(link);
      }
    };
  };

  const items: IMenuItem[] = [
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Học sinh','student' ,<StudentIcon/> ,[
      getSubItem('Nhập điểm', 'nhap_diem', PATH_PRIVATE._STUDENT._SCOREBOARD)
    ])
  ];
  
  return (
    <MenuStyled
      mode="inline"
      style={{ borderRight: 0 }}
      inlineCollapsed={collapsed}
      theme='dark'
      items={items}
    />
  );
};

export default MenuSidebar;

const MenuStyled = styled(Menu)`
  
`;




