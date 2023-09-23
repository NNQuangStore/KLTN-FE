import { styled } from 'styled-components';
import RowCenter from '../../atom/Row/RowCenter';
import { useCollapseSidebar } from '../../../services/hooks/useCollapseSidebar';
import { COLOR_PRIMARY } from '../../../utils/variables/colors';

const Logo = () => {

  const [collapsed] = useCollapseSidebar();

  return (
    <LogoStyled style={{ fontSize: collapsed ? '24px' : '26px'}}>
      Logo
    </LogoStyled>
  );
};

export default Logo;

const LogoStyled = styled(RowCenter)`
  height: 64px;
  z-index: 40;
  border-bottom: 1px solid lightgray;
  background-color: white;
  font-weight: bold;
  position: sticky;
  top: 0;
  left: 0;
  color: ${COLOR_PRIMARY};
`;

