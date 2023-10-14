import { styled } from 'styled-components';
import RowCenter from '../../atom/Row/RowCenter';
import { useCollapseSidebar } from '../../../services/hooks/useCollapseSidebar';
import { COLOR_PRIMARY } from '../../../utils/variables/colors';
import { Avatar } from 'antd';
import logo from '../../../asset/img/logo.png';

const Logo = () => {

  const [collapsed] = useCollapseSidebar();

  return (
    <LogoStyled style={{ fontSize: collapsed ? '24px' : '26px'}}>
      <img width={70} height={50} src={logo}/>
    </LogoStyled>
  );
};

export default Logo;

const LogoStyled = styled(RowCenter)`
  height: 64px;
  z-index: 40;
  background-color: white;
  font-weight: bold;
  position: sticky;
  top: 0;
  left: 0;
  cursor: pointer;
  color: ${COLOR_PRIMARY};
`;

