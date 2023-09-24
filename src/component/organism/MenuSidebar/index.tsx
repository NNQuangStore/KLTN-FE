import { DesktopOutlined, UserOutlined, ReadOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
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
  const PATH_PRIVATE = PATH;

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
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('User', 'sub1', <UserOutlined />, [
    //   getItem('Tom', '3'),
    //   getItem('Bill', '4'),
    //   getItem('Alex', '5'),
    // ]),
    // getItem('Báo bài', '2', <ReadOutlined />, 'report-lesion'),
    getItem('Quản lý học sinh','student' ,<StudentIcon/> ,[
      getSubItem('Nhập điểm', 'nhap_diem', PATH_PRIVATE._STUDENT._SCOREBOARD),
      getSubItem('Danh sách', 'danh_sach', PATH_PRIVATE._STUDENT._INDEX),
      getSubItem('Báo bài', 'báo_bai', '/report-lesion'),
      getSubItem('Thời khoá biểu', 'tkb', '/time-table'),
    ]),
    getItem('Báo cáo', '2', <FundProjectionScreenOutlined />),
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



