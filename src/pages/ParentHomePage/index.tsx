import { Card } from 'antd';
import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../utils/variables/colors';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import storage from '../../utils/sessionStorage';

const ParentHomePage = () => {
  const classId = storage.get('class_id');
  const socket = io('https://slldt-server-867d33706c66.herokuapp.com');
  useEffect(() => {
    console.log('jhgjdags: ' + classId);
    if(classId && classId !== ''){
      socket.emit('addParent', {classId: classId});
    }
  },[]);

  useEffect(() => {
    socket.on('notify-new-lesson', (data) => {
      console.log(data);
    });
  },[socket]);

  const navTop = [
    {
     label: 'Báo bài',
     link: '/app/report-session'
    },{
      label: 'Lịch Học',
      link: '/'
     },{
      label: 'Bảng điểm',
      link: '/'
     }];
  const navBottom = [{
    label: 'Xin nghỉ phép',
    link: '/'
   },{
    label: 'Giáo viên chủ nhiệm',
    link: '/'
   }];

  const navigate = useNavigate();

  return (
    <ParentHomePageStyled>
      <div className='cards'>
        {navTop.map((s, index) => (
          <Card className='card-item' key={index} onClick={() => navigate(s.link)}>
            <p>{s.label}</p> 
          </Card>
        ))}
      </div>
      <div className='cards'>
        {navBottom.map((s, index) => (
          <Card className='card-item' key={index}>
            <p>{s.label}</p>
          </Card>
        ))}
      </div>
    </ParentHomePageStyled>
  );
};

export default ParentHomePage;

const ParentHomePageStyled = styled.div`
  height: 100%;
  gap: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .cards {
    display: flex;
    justify-content: center;
    gap: 100px;

    .card-item {
      background-color: ${COLOR_PRIMARY};
      /* white-space: nowrap; */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 160px;
      width: 255px;
      cursor: pointer;
      p {
        font-size: 32px;
        font-weight: 600;
        color: white;
        text-align: center;
      }
    }
  }
`;