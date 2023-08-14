import { styled } from 'styled-components';
import RowCenter from '../../atom/Row/RowCenter';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col } from 'antd';

const AvatarSidebar = ({collapsed} : {collapsed: boolean}) => {

  return collapsed ? 
    (<AvatarCollapsedStyled>
      <Avatar
        size={'large'}
        icon={<UserOutlined />}
      />
    </AvatarCollapsedStyled>) :
    (<AvatarStyled>
      <Col>
        <Avatar
          size={100}
          icon={<UserOutlined />}
        />
        <h3>Nguyễn Nhật Quang</h3>
        <p>admin</p>
      </Col>
    </AvatarStyled>);
};

export default AvatarSidebar;

const AvatarCollapsedStyled = styled(RowCenter)`
  padding: 24px 0px;
`;

const AvatarStyled = styled(RowCenter)`
  min-height: 100px;
  padding: 24px;  
  .ant-col {
    text-align: center;
  }
`;