import { styled } from 'styled-components';
import RowH from '../../atom/Row/RowH';
import { useCollapseSidebar } from '../../../services/hooks/useCollapseSidebar';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { HEIGHT_HEADER } from '../../../utils/variables/unit';
import { Avatar } from 'antd';
import Logo from '../../molecule/Logo';
import { COLOR_WHITE } from '../../../utils/variables/colors';
import { getBreakpointSidebar } from '../Sidebar';


const iconStyled: React.CSSProperties = {
  fontSize: '24px',
  cursor: 'pointer'
};

const Header = () => {

  const [collapsed, setCollapsed] = useCollapseSidebar(false);

  const toggleCollapsed = () => {
    setCollapsed( !collapsed );
  };

  return (
    <> 
      <RowStyled justify={'space-between'}>
        <div className='hamburger'>
          <div className='icon' onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined style={{...iconStyled}} /> : <MenuFoldOutlined style={{...iconStyled}} />}
          </div>
        </div>
        {! getBreakpointSidebar() ? <Logo/> : <></>}

        <div>
          <Avatar
            icon={<UserOutlined />}

          />
        </div>
      </RowStyled>
    </>
  );
};

export default Header;

const RowStyled = styled(RowH)`
  position: sticky;
  top: 0;
  height: ${HEIGHT_HEADER};
  width: 100%;
  background-color: ${COLOR_WHITE};
  z-index: 20;
  padding: 0px 20px;
  box-shadow: 5px 5px 5px lightgray;
  z-index: 500;
`;