import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../../../utils/variables/colors';

const navItem = [
  {
    label: 'Báo bài'
  },
  {
    label: 'Điểm số'
  },
  {
    label: 'Thời khoá biểu'
  },
  {
    label: 'Giáo viên'
  }
];

const NavLink = () => {
  return (
    <NavLinkStyled>
        {navItem.map((o, index) => (
          <div key={index} className={`item ${index === 0 ? 'item-active' : ''}`}>
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
      .underline {
        width: 100%;
      }
    }

`;