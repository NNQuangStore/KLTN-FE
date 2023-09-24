import { styled } from 'styled-components';
import RowH from '../../atom/Row/RowH';
import { useCollapseSidebar } from '../../../services/hooks/useCollapseSidebar';
import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { HEIGHT_HEADER } from '../../../utils/variables/unit';
import { Avatar, Badge, Popover } from 'antd';
import Logo from '../../molecule/Logo';
import { COLOR_WHITE } from '../../../utils/variables/colors';
import { getBreakpointSidebar } from '../Sidebar';
import Notification from './Notification';
import storage from '../../../utils/sessionStorage';


const iconStyled: React.CSSProperties = {
  fontSize: '24px',
  cursor: 'pointer'
};



const Header = ({showHamburger = true}: {showHamburger?: boolean}) => {

  const [collapsed, setCollapsed] = useCollapseSidebar(false);
  const className = storage.get('class_name');

  // console.log(useMediaQuery(theme.breakpoints.up('sm')));

  const toggleCollapsed = () => {
    setCollapsed( !collapsed );
  };

  return (
    <> 
      <RowStyled justify={'space-between'}>
        {showHamburger ? <div className='hamburger'>
          <div className='icon' onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined style={{...iconStyled}} /> : <MenuFoldOutlined style={{...iconStyled}} />}
          </div>
        </div> : <div></div>}
        {! getBreakpointSidebar() ? <Logo/> : <></>}

        <div className='tool'>
          <span>Lớp {className}</span>
          <Notification/>
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

  .tool {
    display: flex;
    gap: 24px;
    align-items: center;
    & > * {
  
      cursor: pointer;
    }
  }
`;