import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../../../utils/variables/colors';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Form, Input, Modal, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import uiActions from '../../../../services/UI/actions';
import apisTeacher from '../../../_Admin/Teacher/services/apis';
import apisClass from '../../../ClassPage/services/apis';
import storage from '../../../../utils/sessionStorage';

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
    // label: 'Giáo viên'
  }
];

const NavLink = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataTeacher, setDataTeacher] = useState();

  const [open, setOpen] = useState<boolean>();
  
  const fetchData = async () => {
    try{
      dispatch(uiActions.setLoadingPage(true));

      await apisClass.getListClass({
        year: 2023,
      });

      const resTeacher = await apisTeacher.getListTeacher();
      const user_id = storage.get('user_id');

      if(resTeacher?.data?.data) {
        console.log(resTeacher?.data?.data);
        console.log(user_id);
        
        
        setDataTeacher(resTeacher?.data?.data.find((o: any) => o.Users__c === user_id));
      }

    } catch(e) {
      console.log(e);
      
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(dataTeacher);
  


  return (
    <>
      <NavLinkStyled>
          {navItem.map((o, index) => (
            <div onClick={() => {
              o.label === 'Giáo viên' ? setOpen(true) : navigate(o.link ?? '');
            }} key={index} className={`item ${location.pathname === o.link ? 'item-active' : ''}`}>
              <p>{o.label}</p>
              <div className='underline'></div>
            </div>
          ))}
      </NavLinkStyled>
      <Modal
        // title='Thêm đơn xin nghỉ'
        centered
        footer={false}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <h4>Thông tin giáo viên</h4>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          autoComplete='off'
        >
        
        </Form>
      </Modal>
    </>
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