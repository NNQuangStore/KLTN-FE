import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../../../utils/variables/colors';
import { PATH } from '../../../../utils/paths';
import { link } from 'fs';
import { useLocation, useNavigate } from 'react-router-dom';

const navItem = [
  {
    label: 'Trang chủ',
    link: '/app/home'
  },
  {
    label: 'Báo bài',
    link: '/app/report-session'
  },
  {
    label: 'Điểm số',
    link: '/app/evaluation-sheet'
  },
  {
    label: 'Thời khoá biểu',
    link: '/app/time-table'
  },
  {
    label: 'Xin nghỉ phép',
    link: '/app/leave-of-absence'
  },
  {
    label: 'Giáo viên'
  }
];

const NavLink = () => {

  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.pathname);
  

  return (
    <NavLinkStyled>
        {navItem.map((o, index) => (
          <div onClick={() => {
            navigate(o.link ?? '');
          }} key={index} className={`item ${location.pathname === o.link ? 'item-active' : ''}`}>
            <p>{o.label}</p>
            <div className='underline'></div>
          </div>
        ))}
    </NavLinkStyled>
  );
};

export default NavLink;

const  NavLinkStyled = styled.div`
  display:  flex;
  align-items: center;
  gap: 24px;

  & > p {
    margin: 0px;
  }

  

  .item {
    cursor: pointer;
    font-weight: 600;
    .underline {
      background-color: ${COLOR_PRIMARY};
      height: 2px;
      width: 0px;
      transition: width 0.3s;
      margin-top: 2px;
      
    }

    &:hover {
      color: ${COLOR_PRIMARY};

      .underline {
        width: 100%;
      }
    }
   
    
  }
  .item-active {
      color: ${COLOR_PRIMARY};
      background-color: rgb(255 255 255);
      border-color: white !important;
      .underline {
        width: 100%;
      }
    }

`;